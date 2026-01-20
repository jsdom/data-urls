"use strict";
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const parseDataURL = require("..");
/*
  eslint
  array-bracket-newline: ["error", "consistent"]
  array-element-newline: "off"
*/

describe("Smoke tests via README examples", () => {
  it("should parse no-type as expected", () => {
    const textExample = parseDataURL("data:,Hello%2C%20World!");
    assert.equal(textExample.mimeType.toString(), "text/plain;charset=US-ASCII");
    assert.equal(textExample.body.constructor, Uint8Array);
    assert.deepEqual(textExample.body, new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]));
  });

  it("should round-trip no-type as expected", () => {
    const textExample = parseDataURL("data:,H%E9llo!");
    assert.equal(textExample.mimeType.toString(), "text/plain;charset=US-ASCII");
    assert.equal(textExample.body.constructor, Uint8Array);

    const encodingLabel = textExample.mimeType.parameters.get("charset") ?? "utf-8";
    assert.equal(encodingLabel, "US-ASCII");

    const correctDecoder = new TextDecoder(encodingLabel);
    const bodyCorrectlyDecoded = correctDecoder.decode(textExample.body);
    assert.equal(bodyCorrectlyDecoded, "Héllo!", "correctly decoded");

    const incorrectDecoder = new TextDecoder("utf-8");
    const bodyIncorrectlyDecoded = incorrectDecoder.decode(textExample.body);
    assert.equal(bodyIncorrectlyDecoded, "H�llo!", "incorrectly decoded");
  });

  it("should parse text/html as expected", () => {
    const htmlExample = parseDataURL("data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E");
    assert.equal(htmlExample.mimeType.toString(), "text/html");
    assert.equal(htmlExample.body.constructor, Uint8Array);
    assert.deepEqual(htmlExample.body, new Uint8Array([
      60, 104, 49, 62, 72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33, 60, 47, 104, 49, 62
    ]));
  });

  it("should parse img/png base64 as expected", () => {
    const pngExample = parseDataURL("data:image/png;base64,iVBORw0KGgoAAA" +
                                    "ANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                                    "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU" +
                                    "5ErkJggg==");
    assert.equal(pngExample.mimeType.toString(), "image/png");
    assert.equal(pngExample.body.constructor, Uint8Array);
    assert.deepEqual(pngExample.body, new Uint8Array([
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13,
      73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 5,
      8, 6, 0, 0, 0, 141, 111, 38, 229, 0, 0, 0,
      28, 73, 68, 65, 84, 8, 215, 99, 248, 255, 255, 63,
      195, 127, 6, 32, 5, 195, 32, 18, 132, 208, 49, 241,
      130, 88, 205, 4, 0, 14, 245, 53, 203, 209, 142, 14,
      31, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96,
      130
    ]));
  });
});

describe("Additional coverage", () => {
  it("should return null for non-data: URLs", () => {
    assert.equal(parseDataURL("https://example.com/"), null);
  });
});
