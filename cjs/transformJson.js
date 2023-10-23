"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//------------------------------------------------------------------------------
function transformJsonObject(obj, repl) {
  if (!obj) {
    return null;
  }
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (Object.getOwnPropertyDescriptor(obj, key).get) {
      // skip getters
      continue;
    }
    const newValue = repl.call(obj, key, value);
    if (typeof newValue !== 'undefined') {
      if (typeof newValue === 'object') {
        newObj[key] = transformJsonObject(newValue, repl);
      } else {
        newObj[key] = newValue;
      }
    }
  }
  return newObj;
}

//------------------------------------------------------------------------------
function transformJson(value, repl) {
  const root = {
    '': value
  };
  const newRoot = transformJsonObject(root, repl);
  return newRoot[''];
}
var _default = exports.default = transformJson;