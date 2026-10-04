const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const chartEntry = path.resolve(
  __dirname,
  "node_modules/chart.js/dist/chart.js",
);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "chart.js") {
    return { type: "sourceFile", filePath: chartEntry };
  }

  return context.resolveRequest(context, moduleName, platform);
};

if (!config.resolver.assetExts.includes("wav")) {
  config.resolver.assetExts.push("wav");
}

module.exports = config;
