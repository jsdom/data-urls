"use strict";
const base64TestCases = require("./web-platform-tests/base64.json");
const dataURLsTestCases = require("./web-platform-tests/data-urls.json");
const parse = require("../lib/parser.js");

describe("base64.json", () => {
  for (const [input, expectedBodyBytes] of base64TestCases) {
    const dataURL = `data:;base64,${input}`;
    test(dataURL, () => {
      const result = parse(dataURL);

      if (expectedBodyBytes === null) {
        expect(result).toEqual(null);
      } else {
        expect(result.mimeType.type).toEqual("text");
        expect(result.mimeType.subtype).toEqual("plain");
        expect(result.mimeType.parameters.size).toEqual(1);
        expect(result.mimeType.parameters.get("charset")).toEqual("US-ASCII");

        expect(result.body.constructor).toEqual(Buffer);
        expect(result.body).toEqual(Buffer.from(expectedBodyBytes));
      }
    });
  }
});

describe("data-urls.json", () => {
  for (const [dataURL, expectedMIMEType, expectedBodyBytes] of dataURLsTestCases) {
    test(dataURL, () => {
      const result = parse(dataURL);

      if (expectedMIMEType === null) {
        expect(result).toEqual(null);
      } else {
        expect(result.mimeType.toString()).toEqual(expectedMIMEType);

        expect(result.body.constructor).toEqual(Buffer);
        expect(result.body).toEqual(Buffer.from(expectedBodyBytes));
      }
    });
  }
});
