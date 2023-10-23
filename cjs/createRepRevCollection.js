"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createRepRev = _interopRequireDefault(require("./createRepRev.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//------------------------------------------------------------------------------
function createRepRevCollection(transformers) {
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
var _default = exports.default = createRepRevCollection;