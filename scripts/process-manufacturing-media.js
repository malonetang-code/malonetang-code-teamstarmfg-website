const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const siteRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(siteRoot, "..");
const sourceRoot = path.join(
  projectRoot,
  "assets/incoming_manufacturing_process_2026-07-25/raw/8组拍摄过程"
);
const outputRoot = path.join(siteRoot, "images/web/process-20260725");

const media = [
  {
    slug: "01-material-verification",
    type: "video",
    source: "1材料确认/VID_20260725_100435_067.mp4",
    start: 1.2,
    duration: 7,
    filter: "crop=1120:630:350:450,scale=1280:720:flags=lanczos,fps=30",
  },
  {
    slug: "02-blank-shaping",
    type: "video",
    source: "2刀坯成型/VID_20260725_092126_008.mp4",
    posterSource: "2刀坯成型/DSC01316.JPG",
    start: 1.5,
    duration: 6,
  },
  {
    slug: "03-heat-treatment",
    type: "video",
    source: "3热处理/VID_20260725_094018_032.mp4",
    posterSource: "3热处理/IMG_20260725_093801_028.jpg",
    start: 1,
    duration: 7,
  },
  {
    slug: "04-machining",
    type: "image",
    source: "4机加工/051A9126.jpg",
    imageFilter: "crop=2660:1496:700:360,scale=1280:720:flags=lanczos",
  },
  {
    slug: "05-precision-grinding",
    type: "video",
    source: "5精密研磨/VID_20260725_095803_061.mp4",
    start: 1.2,
    duration: 7,
  },
  {
    slug: "06-in-process-inspection",
    type: "video",
    source: "6过程检验/VID_20260725_101142_082.mp4",
    start: 1.5,
    duration: 7,
  },
  {
    slug: "07-final-inspection",
    type: "video",
    source: "7终检与记录/VID_20260725_101610_093.mp4",
    start: 1.4,
    duration: 7,
    filter: "crop=1280:720:400:300,scale=1280:720:flags=lanczos,fps=30",
  },
  {
    slug: "08-protective-packaging",
    type: "video",
    source: "8包装与追溯/VID_20260725_103053_125.mp4",
    start: 0.8,
    duration: 7,
  },
];

const supportingMedia = [
  {
    slug: "01-material-contact",
    source: "1材料确认/IMG_20260725_100352_066.jpg",
    imageFilter: "crop=3600:2025:1800:3000,scale=960:540:flags=lanczos",
  },
  {
    slug: "01-material-analyzer",
    source: "1材料确认/IMG_20260725_100550_070.jpg",
    imageFilter: "crop=7040:3960:0:0,scale=960:540:flags=lanczos",
  },
  {
    slug: "02-laser-cutting-area",
    source: "2刀坯成型/051A9192.jpg",
  },
  {
    slug: "03-heat-treatment-loading",
    source: "3热处理/IMG_20260725_093727_027.jpg",
  },
  {
    slug: "04-machining-line",
    source: "4机加工/051A9108.jpg",
  },
  {
    slug: "04-machined-workpiece",
    source: "4机加工/IMG_20260725_093236_022.jpg",
  },
  {
    slug: "05-grinding-equipment",
    source: "5精密研磨/DSC01299.JPG",
  },
  {
    slug: "05-ground-blade-samples",
    source: "5精密研磨/IMG_20260725_095542_054.jpg",
  },
  {
    slug: "06-optical-inspection",
    source: "6过程检验/IMG_20260725_100606_071.jpg",
  },
  {
    slug: "06-surface-inspection",
    source: "6过程检验/IMG_20260725_101319_087.jpg",
  },
  {
    slug: "07-final-gauge-detail",
    source: "7终检与记录/IMG_20260725_101718_096.jpg",
    imageFilter: "crop=3600:2025:0:2200,scale=960:540:flags=lanczos",
  },
  {
    slug: "08-edge-protection",
    source: "8包装与追溯/IMG_20260725_102216_103.jpg",
  },
  {
    slug: "08-box-packaging",
    source: "8包装与追溯/IMG_20260725_102943_122.jpg",
  },
];

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${command} failed:\n${result.stderr || result.stdout}`);
  }
}

function assertSource(source) {
  if (!fs.existsSync(source)) throw new Error(`Missing source media: ${source}`);
}

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

for (const item of media) {
  const source = path.join(sourceRoot, item.source);
  assertSource(source);

  if (item.type === "image") {
    const output = path.join(outputRoot, `${item.slug}.jpg`);
    run("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      source,
      "-vf",
      item.imageFilter ||
        "scale=1280:720:force_original_aspect_ratio=increase:flags=lanczos,crop=1280:720",
      "-frames:v",
      "1",
      "-q:v",
      "3",
      "-map_metadata",
      "-1",
      output,
    ]);
    continue;
  }

  const videoOutput = path.join(outputRoot, `${item.slug}.mp4`);
  const posterOutput = path.join(outputRoot, `${item.slug}.jpg`);
  const filter =
    item.filter ||
    "scale=1280:720:force_original_aspect_ratio=increase:flags=lanczos,crop=1280:720,fps=30";

  run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-ss",
    String(item.start),
    "-i",
    source,
    "-t",
    String(item.duration),
    "-an",
    "-vf",
    filter,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "27",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-map_metadata",
    "-1",
    "-map_chapters",
    "-1",
    videoOutput,
  ]);

  const posterSource = item.posterSource
    ? path.join(sourceRoot, item.posterSource)
    : videoOutput;
  assertSource(posterSource);
  const posterArgs = ["-hide_banner", "-loglevel", "error", "-y"];
  if (!item.posterSource) posterArgs.push("-ss", String(item.duration / 2));
  posterArgs.push(
    "-i",
    posterSource,
    "-vf",
    "scale=1280:720:force_original_aspect_ratio=increase:flags=lanczos,crop=1280:720",
    "-frames:v",
    "1",
    "-q:v",
    "3",
    "-map_metadata",
    "-1",
    posterOutput
  );
  run("ffmpeg", posterArgs);
}

for (const item of supportingMedia) {
  const source = path.join(sourceRoot, item.source);
  const output = path.join(outputRoot, `${item.slug}.jpg`);
  assertSource(source);
  run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    source,
    "-vf",
    item.imageFilter ||
      "scale=960:540:force_original_aspect_ratio=increase:flags=lanczos,crop=960:540",
    "-frames:v",
    "1",
    "-q:v",
    "3",
    "-map_metadata",
    "-1",
    output,
  ]);
}

console.log(
  `Processed ${media.length} manufacturing steps and ${supportingMedia.length} supporting photographs into ${outputRoot}`
);
