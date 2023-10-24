"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRepRevCollection = createRepRevCollection;
var _createRepRev = _interopRequireDefault(require("./createRepRev.js"));
var _createInstanceRepRev = require("./createInstanceRepRev.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//------------------------------------------------------------------------------
// eslint-disable-next-line import/prefer-default-export
function createRepRevCollection(transformers = [..._createInstanceRepRev.builtIn]) {
  const transformer = (0, _createRepRev.default)((key, value, owner) => {
    for (const transformer of transformers) {
      const newValue = transformer.replace.call(owner, key, value);
      if (newValue !== value) {
        return newValue;
      }
    }
    return value;
  }, (key, value, owner) => {
    for (const transformer of transformers) {
      const newValue = transformer.revive.call(owner, key, value);
      if (newValue !== value) {
        return newValue;
      }
    }
    return value;
  });
  transformer.transformers = transformers;
  return transformer;
}