"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builtIn = exports.SetRepRev = exports.MapRepRev = exports.DateRepRev = void 0;
Object.defineProperty(exports, "createInstanceRepRev", {
  enumerable: true,
  get: function () {
    return _createInstanceRepRev.default;
  }
});
Object.defineProperty(exports, "createRepRevCollection", {
  enumerable: true,
  get: function () {
    return _createRepRevCollection.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "transformJson", {
  enumerable: true,
  get: function () {
    return _transformJson.default;
  }
});
var _createRepRev = _interopRequireDefault(require("./createRepRev.js"));
var _createRepRevCollection = _interopRequireDefault(require("./createRepRevCollection.js"));
var _createInstanceRepRev = _interopRequireDefault(require("./createInstanceRepRev.js"));
var _transformJson = _interopRequireDefault(require("./transformJson.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Main
 */

// All these use `owner[key]` instead of `value`, since `value` might already
// be transformed (e.g. in case of `Date`).

//------------------------------------------------------------------------------
const DateRepRev = exports.DateRepRev = (0, _createInstanceRepRev.default)('Date', (key, value, owner) => owner[key].toISOString(), (key, value) => new Date(value));

//------------------------------------------------------------------------------
const MapRepRev = exports.MapRepRev = (0, _createInstanceRepRev.default)('Map', (key, value, owner) => [...owner[key].entries()], (key, value) => new Map(value));

//------------------------------------------------------------------------------
const SetRepRev = exports.SetRepRev = (0, _createInstanceRepRev.default)('Set', (key, value, owner) => [...owner[key].values()], (key, value) => new Set(value));

//------------------------------------------------------------------------------
const builtIn = exports.builtIn = [DateRepRev, MapRepRev, SetRepRev];

//------------------------------------------------------------------------------
var _default = exports.default = _createRepRev.default;