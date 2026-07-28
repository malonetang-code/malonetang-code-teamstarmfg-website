const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const sharp = require("sharp");
const processes = require("../src/_data/manufacturingProcesses");

const root = path.resolve(__dirname, "..");
const mediaRoot = path.join(root, "images/web/process-20260725");

function fail(message) {
  throw new Error(message);
}

function probe(file) {
  const result = spawnSync(
    "ffprobe",
    ["-v", "error", "-show_streams", "-show_format", "-of", "json", file],
    { encoding: "utf8" }
  );
  if (result.status !== 0) fail(`ffprobe failed for ${file}: ${result.stderr}`);
  return JSON.parse(result.stdout);
}

async function main() {
  if (processes.length !== 8) fail(`expected 8 process stages, found ${processes.length}`);

  for (const process of processes) {
    for (const language of ["zh", "en"]) {
      if (/[。.!！?？]$/.test(process.title[language])) {
        fail(`process title ends with punctuation: ${process.title[language]}`);
      }
    }

    const image = path.join(root, process.media.replace(/^\//, ""));
    if (!fs.existsSync(image)) fail(`missing process image: ${process.media}`);
    const metadata = await sharp(image).metadata();
    if (metadata.width !== 1280 || metadata.height !== 720) fail(`unexpected image size: ${process.media}`);
    if (metadata.exif) fail(`process image retains EXIF metadata: ${process.media}`);

    if (!process.video) continue;
    const video = path.join(root, process.video.replace(/^\//, ""));
    if (!fs.existsSync(video)) fail(`missing process video: ${process.video}`);
    const metadataVideo = probe(video);
    const videoStream = metadataVideo.streams.find((stream) => stream.codec_type === "video");
    const audioStream = metadataVideo.streams.find((stream) => stream.codec_type === "audio");
    if (!videoStream || videoStream.codec_name !== "h264") fail(`video is not H.264: ${process.video}`);
    if (videoStream.width !== 1280 || videoStream.height !== 720) fail(`unexpected video size: ${process.video}`);
    if (videoStream.pix_fmt !== "yuv420p") fail(`unexpected pixel format: ${process.video}`);
    if (audioStream) fail(`process video contains audio: ${process.video}`);
    if (Number(metadataVideo.format.duration) > 7.2) fail(`process video is too long: ${process.video}`);
  }

  for (const file of ["dist/capabilities/index.html", "dist/en/capabilities/index.html"]) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    if ((html.match(/class="process-evidence-row"/g) || []).length !== 8) {
      fail(`unexpected process-stage count: ${file}`);
    }
    if ((html.match(/data-process-video/g) || []).length !== 6) {
      fail(`unexpected process-video count: ${file}`);
    }
    if (/VID_20260725|IMG_20260725|DSC0|051A/.test(html)) {
      fail(`raw source filename leaked into output: ${file}`);
    }
  }

  console.log("Manufacturing process check passed: eight stages, six silent H.264 videos and metadata-free photographs");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
