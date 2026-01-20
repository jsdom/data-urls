import * as path from "node:path";
import * as fs from "node:fs/promises";

if (process.env.NO_UPDATE) {
  process.exit(0);
}

// Pin to specific version, reflecting the spec version in the readme.
//
// To get the latest commit:
// 1. Go to https://github.com/web-platform-tests/wpt/tree/master/fetch/data-urls
// 2. Press "y" on your keyboard to get a permalink
// 3. Copy the commit hash
const commitHash = "2dc0ad4f330f0b5647d11b00ae7437b668cb8df3";

const urlPrefix = `https://raw.githubusercontent.com/w3c/web-platform-tests/${commitHash}` +
                  `/fetch/data-urls/resources/`;

const files = ["base64.json", "data-urls.json"];

await Promise.all(files.map(async file => {
  const url = urlPrefix + file;
  const targetFile = path.resolve(import.meta.dirname, "..", "test", "web-platform-tests", file);

  const res = await fetch(url);
  await fs.writeFile(targetFile, res.body);
}));
