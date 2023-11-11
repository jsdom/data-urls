"use strict";

if (process.env.NO_UPDATE) {
  process.exit(0);
}

const path = require("node:path");
const fs = require("node:fs/promises");

// Pin to specific version, reflecting the spec version in the readme.
//
// To get the latest commit:
// 1. Go to https://github.com/web-platform-tests/wpt/tree/master/fetch/data-urls
// 2. Press "y" on your keyboard to get a permalink
// 3. Copy the commit hash
const commitHash = "d9d78543960a04ea8ad8f1aa3c7536b6a9a87d9a";

const urlPrefix = `https://raw.githubusercontent.com/w3c/web-platform-tests/${commitHash}` +
                  `/fetch/data-urls/resources/`;

const files = ["base64.json", "data-urls.json"];

async function main() {
  await Promise.all(files.map(async file => {
    const url = urlPrefix + file;
    const targetFile = path.resolve(__dirname, "..", "test", "web-platform-tests", file);

    const res = await fetch(url);
    await fs.writeFile(targetFile, res.body);
  }));
}

main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
