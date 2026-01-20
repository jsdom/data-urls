"use strict";
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const base64TestCases = require("./web-platform-tests/base64.json");
const dataURLsTestCases = require("./web-platform-tests/data-urls.json");
const parseDataURL = require("..");

describe("base64.json", () => {
  for (const [input, expectedBodyBytes] of base64TestCases) {
    const dataURL = `data:;base64,${input}`;
    test(dataURL, () => {
      const result = parseDataURL(dataURL);

      if (expectedBodyBytes === null) {
        assert.equal(result, null);
      } else {
        assert.equal(result.mimeType.type, "text");
        assert.equal(result.mimeType.subtype, "plain");
        assert.equal(result.mimeType.parameters.size, 1);
        assert.equal(result.mimeType.parameters.get("charset"), "US-ASCII");

        assert.equal(result.body.constructor, Uint8Array);
        assert.deepEqual(result.body, Uint8Array.from(expectedBodyBytes));
      }
    });
  }
});

describe("data-urls.json", () => {
  for (const [dataURL, expectedMIMEType, expectedBodyBytes] of dataURLsTestCases) {
    test(dataURL, () => {
      const result = parseDataURL(dataURL);

      if (expectedMIMEType === null) {
        assert.equal(result, null);
      } else {
        assert.equal(result.mimeType.toString(), expectedMIMEType);

        assert.equal(result.body.constructor, Uint8Array);
        assert.deepEqual(result.body, Uint8Array.from(expectedBodyBytes));
      }
    });
  }
});
