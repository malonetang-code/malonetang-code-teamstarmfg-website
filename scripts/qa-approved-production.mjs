import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "/Users/malone/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const origin = process.env.QA_ORIGIN || "http://127.0.0.1:8092";
const releaseMarker = process.env.TEAMSTAR_RELEASE_MARKER || "20260903-2";
const output = process.env.QA_OUTPUT || "/tmp/teamstar-approved-production-qa";
const failures = [];
const routes = [
  ["/", "因需而制，以准致信。"],
  ["/products/", "产品目录"],
  ["/capabilities/", "制造能力"],
  ["/quality/", "质量体系"],
  ["/company/", "公司概况"],
  ["/rfq/", "告诉我们您需要什么样的刀具"],
  ["/en/", "Engineered for Your Needs. Trusted for Precision."],
  ["/en/products/", "Products"],
  ["/en/capabilities/", "Manufacturing"],
  ["/en/quality/", "Quality"],
  ["/en/company/", "Company"],
  ["/en/rfq/", "Talk to Our Knife Experts"],
];
const viewports = [
  { name: "desktop", width: 1440, height: 960 },
  { name: "mobile", width: 390, height: 844 },
];

const sameOrigin = (url) => {
  try {
    return new URL(url).origin === origin;
  } catch {
    return false;
  }
};

const scrollAndAudit = async (page) => page.evaluate(async () => {
  for (const image of document.images) {
    image.scrollIntoView({ block: "center" });
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  const step = Math.max(320, Math.floor(innerHeight * 0.75));
  for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
    scrollTo(0, top);
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  await new Promise((resolve) => setTimeout(resolve, 900));
  scrollTo(0, 0);
  await new Promise((resolve) => setTimeout(resolve, 150));

  const images = [...document.images];
  return {
    brokenImages: images
      .filter((image) => image.getBoundingClientRect().width > 0 && image.getBoundingClientRect().height > 0)
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
    heading: document.querySelector("h1")?.textContent.trim() || "",
    homeMotionReady: document.documentElement.classList.contains("c1-motion-ready"),
    logoViewport: Boolean(document.querySelector(".c1-logo-viewport")),
    overflow: document.documentElement.scrollWidth - innerWidth,
    release: document.querySelector('meta[name="teamstar-release"]')?.content || "",
    reviewResidue: document.documentElement.innerHTML.includes("/teamstar-review/"),
    robots: document.querySelector('meta[name="robots"]')?.content || "",
  };
});

await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  let current = viewport.name;

  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`${current}: console ${message.text()}`);
  });
  page.on("requestfailed", (request) => {
    const error = request.failure()?.errorText || "unknown";
    if (error !== "net::ERR_ABORTED" && sameOrigin(request.url())) {
      failures.push(`${current}: request failed ${request.url()} ${error}`);
    }
  });
  page.on("response", (response) => {
    if (sameOrigin(response.url()) && response.status() >= 400) {
      failures.push(`${current}: HTTP ${response.status()} ${response.url()}`);
    }
  });

  for (const [route, expectedHeading] of routes) {
    current = `${viewport.name}:${route}`;
    const response = await page.goto(`${origin}${route}?release=${releaseMarker}`, {
      waitUntil: "domcontentloaded",
    });
    if (!response || response.status() !== 200) {
      failures.push(`${current}: page HTTP ${response?.status() ?? "none"}`);
      continue;
    }
    await page.waitForTimeout(920);
    const audit = await scrollAndAudit(page);
    if (audit.heading !== expectedHeading) failures.push(`${current}: expected H1 "${expectedHeading}", found "${audit.heading}"`);
    if (audit.overflow > 1) failures.push(`${current}: horizontal overflow ${audit.overflow}px`);
    if (audit.brokenImages.length) failures.push(`${current}: broken images ${audit.brokenImages.join(", ")}`);
    if (audit.release !== releaseMarker) failures.push(`${current}: release marker ${audit.release || "missing"}`);
    if (!audit.robots.includes("index") || audit.robots.includes("noindex")) failures.push(`${current}: production robots directive invalid`);
    if (audit.reviewResidue) failures.push(`${current}: protected-review path remains`);

    if (route === "/" || route === "/en/") {
      if (!audit.homeMotionReady || !audit.logoViewport) failures.push(`${current}: approved Home motion did not mount`);
    } else {
      const reveal = await page.evaluate(() => ({
        mounted: Boolean(document.querySelector(".page-hero > picture.c1-page-hero-media-wipe")),
        visible: Boolean(document.querySelector(".page-hero > picture.c1-page-hero-media-wipe.is-visible")),
      }));
      if (["/products/", "/capabilities/", "/quality/", "/company/", "/en/products/", "/en/capabilities/", "/en/quality/", "/en/company/"].includes(route) && (!reveal.mounted || !reveal.visible)) {
        failures.push(`${current}: subpage hero reveal missing`);
      }
    }

    if (["/", "/products/", "/capabilities/", "/quality/", "/company/", "/en/"].includes(route)) {
      const slug = route === "/" ? "home-zh" : route.replace(/^\//, "").replaceAll("/", "-");
      await page.screenshot({ fullPage: true, path: path.join(output, `${viewport.name}-${slug}.png`) });
    }
  }
  await context.close();
}

const reducedContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(`${origin}/quality/?release=${releaseMarker}`, { waitUntil: "domcontentloaded" });
await reducedPage.waitForTimeout(250);
const reducedAudit = await reducedPage.evaluate(() => {
  const media = document.querySelector(".page-hero > picture.c1-page-hero-media-wipe");
  return {
    mounted: Boolean(media),
    visible: media?.classList.contains("is-visible") || false,
    transitionDuration: media ? getComputedStyle(media).transitionDuration : "",
  };
});
if (!reducedAudit.mounted || !reducedAudit.visible || reducedAudit.transitionDuration !== "0s") {
  failures.push(`reduced-motion: subpage hero should render immediately (${JSON.stringify(reducedAudit)})`);
}
await reducedContext.close();

const replayContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const replayPage = await replayContext.newPage();
await replayPage.goto(`${origin}/company/?release=${releaseMarker}`, { waitUntil: "domcontentloaded" });
await replayPage.waitForTimeout(900);
const replayAudit = await replayPage.evaluate(async () => {
  const media = document.querySelector(".page-hero > picture.c1-page-hero-media-wipe");
  const before = Number(media?.dataset.c1RevealRuns || "0");
  window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true }));
  await new Promise((resolve) => setTimeout(resolve, 40));
  const during = media ? getComputedStyle(media).clipPath : "";
  await new Promise((resolve) => setTimeout(resolve, 900));
  return {
    after: Number(media?.dataset.c1RevealRuns || "0"),
    before,
    during,
    final: media ? getComputedStyle(media).clipPath : "",
  };
});
if (replayAudit.after !== replayAudit.before + 1 || replayAudit.during === "inset(0px)" || replayAudit.final !== "inset(0px)") {
  failures.push(`cached re-entry: subpage hero did not replay (${JSON.stringify(replayAudit)})`);
}
await replayContext.close();

await browser.close();

if (failures.length) {
  console.error(`Approved-production browser QA failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Approved-production browser QA passed: ${routes.length * viewports.length} bilingual desktop/mobile page checks, reduced motion and cached re-entry.`);
console.log(`Screenshots: ${output}`);
