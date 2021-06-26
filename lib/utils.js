"use strict";
const { atob } = require("abab");

exports.stripLeadingAndTrailingASCIIWhitespace = string => {
  return string.replace(/^[ \t\n\f\r]+/u, "").replace(/[ \t\n\f\r]+$/u, "");
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
