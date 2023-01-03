"use strict";

if (process.env.NO_UPDATE) {
  process.exit(0);
}

const path = require("path");
const fs = require("fs");
const fetch = require("minipass-fetch");

process.on("unhandledRejection", err => {
  throw err;
});

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

for (const file of files) {
  const url = urlPrefix + file;
  const targetFile = path.resolve(__dirname, "..", "test", "web-platform-tests", file);
  fetch(url).then(res => {
    res.body.pipe(fs.createWriteStream(targetFile));
  });
}
