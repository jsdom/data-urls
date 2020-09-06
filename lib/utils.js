"use strict";
const { percentDecode } = require("whatwg-url");
const { atob } = require("abab");

exports.stripLeadingAndTrailingASCIIWhitespace = string => {
  return string.replace(/^[ \t\n\f\r]+/, "").replace(/[ \t\n\f\r]+$/, "");
};

exports.stringPercentDecode = input => {
  const uint8Array = percentDecode(Buffer.from(input, "utf-8"));

  return Buffer.from(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength -
    uint8Array.byteOffset);
};

exports.isomorphicDecode = input => {
  return input.toString("binary");
};

exports.forgivingBase64Decode = data => {
  const asString = atob(data);
  if (asString === null) {
    return null;
  }
  return Buffer.from(asString, "binary");
};
