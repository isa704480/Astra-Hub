const fs = require("node:fs");
const path = require("node:path");
const { Resvg } = require("@resvg/resvg-js");

const assetsDir = path.resolve(__dirname, "../assets");
const mark = fs.readFileSync(path.join(assetsDir, "astro-hub-mark.svg"), "utf8");
const monochrome = fs.readFileSync(
  path.join(assetsDir, "astro-hub-mark-mono.svg"),
  "utf8",
);

function render(source, fileName, size, background) {
  const renderer = new Resvg(source, {
    fitTo: { mode: "width", value: size },
    ...(background ? { background } : {}),
  });
  fs.writeFileSync(path.join(assetsDir, fileName), renderer.render().asPng());
}

render(mark, "icon.png", 1024, "#F7F9FC");
render(mark, "android-icon-foreground.png", 1024);
render(monochrome, "android-icon-monochrome.png", 1024);
render(mark, "favicon.png", 64, "#F7F9FC");
render(mark, "splash-icon.png", 512, "#F7F9FC");