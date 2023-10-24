"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  transformJson: true
};
exports.default = void 0;
Object.defineProperty(exports, "transformJson", {
  enumerable: true,
  get: function () {
    return _transformJson.default;
  }
});
var _createRepRev = _interopRequireDefault(require("./createRepRev.js"));
var _transformJson = _interopRequireDefault(require("./transformJson.js"));
var _createRepRevCollection = require("./createRepRevCollection.js");
Object.keys(_createRepRevCollection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _createRepRevCollection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createRepRevCollection[key];
    }
  });
});
var _createInstanceRepRev = require("./createInstanceRepRev.js");
Object.keys(_createInstanceRepRev).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _createInstanceRepRev[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createInstanceRepRev[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Main
 */
//------------------------------------------------------------------------------
var _default = exports.default = _createRepRev.default;