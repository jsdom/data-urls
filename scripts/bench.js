"use strict";

const b = require("benny");
const { readFileSync } = require("fs");
const parseDataUrl = require("..");

const EXAMPLE = `data:text/plain;base64,` + readFileSync(`${__dirname}/../yarn.lock`, { encoding: "base64" });

const REGEX = /^data:([^;]+);base64,(.*)/;
function quickNDirty(url) {
  const [, mime, base] = url.match(REGEX);
  return { mime, body: Buffer.from(base, "base64") };
}

const lib = parseDataUrl(EXAMPLE);
const hack = quickNDirty(EXAMPLE);

function assertEquals(l, r) {
  console.assert(l === r, "left", l, "right", r);
}

assertEquals(lib.mimeType.toString(), hack.mime);
assertEquals(lib.body.toString("utf-8"), hack.body.toString("utf-8"));

b.suite(
  "parsing base64",

  b.add("lib", () => parseDataUrl(EXAMPLE)),
  b.add("regexp", () => quickNDirty(EXAMPLE)),
  b.cycle(),
  b.complete()
);
