#!/usr/bin/env node

import { writeFile } from "node:fs/promises";

const API_ROOT = "https://api.globalping.io/v1/measurements";
const COUNTRIES = ["US", "CA", "GB", "DE", "FR", "NL", "SG", "JP", "AU", "IN", "BR", "ZA"];

function option(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function percentile(values, fraction) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil(sorted.length * fraction) - 1;
  return sorted[Math.max(0, index)];
}

async function requestJson(url, init) {
  const response = await fetch(url, init);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`Globalping ${response.status}: ${JSON.stringify(payload)}`);
  }
  return payload;
}

async function createMeasurement(target) {
  return requestJson(API_ROOT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      type: "http",
      target,
      locations: COUNTRIES.map((country) => ({ country, limit: 2 })),
      measurementOptions: { request: { method: "GET" } },
    }),
  });
}

async function waitForMeasurement(id) {
  for (let attempt = 0; attempt < 45; attempt += 1) {
    const measurement = await requestJson(`${API_ROOT}/${id}`);
    if (measurement.status === "finished") return measurement;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  throw new Error(`Measurement ${id} did not finish within 90 seconds`);
}

function summarizeMeasurement(measurement) {
  const rows = measurement.results.map(({ probe, result }) => ({
    country: probe.country,
    city: probe.city,
    network: probe.network,
    status: result.status,
    statusCode: result.statusCode ?? null,
    resolvedAddress: result.resolvedAddress ?? null,
    totalMs: result.timings?.total ?? null,
  }));
  const successes = rows.filter((row) => row.status === "finished" && row.statusCode >= 200 && row.statusCode < 400);

  return {
    id: measurement.id,
    createdAt: measurement.createdAt,
    probes: rows.length,
    successes: successes.length,
    failures: rows.length - successes.length,
    rows,
  };
}

function markdownReport(report) {
  const lines = [
    "# Teamstar Global Reachability Report",
    "",
    `- Target: \`${report.target}\``,
    `- Created: ${report.createdAt}`,
    `- Measurements: ${report.rounds.length} rounds / ${report.probes} probes`,
    `- Reachability: ${report.successes}/${report.probes} (${report.reachabilityPercent}%)`,
    `- Successful response median: ${report.medianMs ?? "n/a"} ms`,
    `- Successful response P95: ${report.p95Ms ?? "n/a"} ms`,
    "",
    "| Round | Measurement ID | Success | Failure |",
    "| ---: | --- | ---: | ---: |",
    ...report.rounds.map((round, index) => `| ${index + 1} | \`${round.id}\` | ${round.successes} | ${round.failures} |`),
    "",
    "## Failed Probes",
    "",
  ];

  const failed = report.rounds.flatMap((round, roundIndex) =>
    round.rows
      .filter((row) => !(row.status === "finished" && row.statusCode >= 200 && row.statusCode < 400))
      .map((row) => ({ round: roundIndex + 1, ...row })),
  );

  if (!failed.length) {
    lines.push("None");
  } else {
    lines.push("| Round | Country | City | Network | Status |");
    lines.push("| ---: | --- | --- | --- | --- |");
    for (const row of failed) {
      lines.push(`| ${row.round} | ${row.country} | ${row.city} | ${row.network} | ${row.status} |`);
    }
  }

  return `${lines.join("\n")}\n`;
}

const target = option("--target", "www.teamstarmfg.com");
const roundCount = Number.parseInt(option("--rounds", "5"), 10);
const outputPrefix = option("--output", "global-reachability");

if (!Number.isInteger(roundCount) || roundCount < 1 || roundCount > 10) {
  throw new Error("--rounds must be an integer from 1 to 10");
}

const rounds = [];
for (let index = 0; index < roundCount; index += 1) {
  const created = await createMeasurement(target);
  const completed = await waitForMeasurement(created.id);
  const summary = summarizeMeasurement(completed);
  rounds.push(summary);
  console.log(`Round ${index + 1}/${roundCount}: ${summary.successes}/${summary.probes} (${summary.id})`);
}

const allRows = rounds.flatMap((round) => round.rows);
const successfulTotals = allRows
  .filter((row) => row.status === "finished" && row.statusCode >= 200 && row.statusCode < 400)
  .map((row) => row.totalMs)
  .filter(Number.isFinite);
const successes = successfulTotals.length;
const report = {
  target,
  createdAt: new Date().toISOString(),
  countries: COUNTRIES,
  probes: allRows.length,
  successes,
  failures: allRows.length - successes,
  reachabilityPercent: Number(((successes / allRows.length) * 100).toFixed(1)),
  medianMs: percentile(successfulTotals, 0.5),
  p95Ms: percentile(successfulTotals, 0.95),
  rounds,
};

await writeFile(`${outputPrefix}.json`, `${JSON.stringify(report, null, 2)}\n`);
await writeFile(`${outputPrefix}.md`, markdownReport(report));

console.log(`Reachability: ${report.successes}/${report.probes} (${report.reachabilityPercent}%)`);
console.log(`Median: ${report.medianMs ?? "n/a"} ms; P95: ${report.p95Ms ?? "n/a"} ms`);
console.log(`Reports: ${outputPrefix}.json, ${outputPrefix}.md`);
