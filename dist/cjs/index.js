"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformJson = exports.createInstanceRepRev = exports.createRepRevCollection = exports.builtIn = exports.SetRepRev = exports.MapRepRev = exports.DateRepRev = void 0;
/**
 * Main
 */
const createRepRev_js_1 = __importDefault(require("./createRepRev.js"));
const createRepRevCollection_js_1 = __importDefault(require("./createRepRevCollection.js"));
exports.createRepRevCollection = createRepRevCollection_js_1.default;
const createInstanceRepRev_js_1 = __importDefault(require("./createInstanceRepRev.js"));
exports.createInstanceRepRev = createInstanceRepRev_js_1.default;
const transformJson_js_1 = __importDefault(require("./transformJson.js"));
exports.transformJson = transformJson_js_1.default;
// All these use `owner[key]` instead of `value`, since `value` might already
// be transformed (e.g. in case of `Date`).
//------------------------------------------------------------------------------
exports.DateRepRev = (0, createInstanceRepRev_js_1.default)('Date', (key, value, owner) => owner[key].toISOString(), (key, value) => new Date(value));
//------------------------------------------------------------------------------
exports.MapRepRev = (0, createInstanceRepRev_js_1.default)('Map', (key, value, owner) => [...owner[key].entries()], (key, value) => new Map(value));
//------------------------------------------------------------------------------
exports.SetRepRev = (0, createInstanceRepRev_js_1.default)('Set', (key, value, owner) => [...owner[key].values()], (key, value) => new Set(value));
//------------------------------------------------------------------------------
exports.builtIn = [
    exports.DateRepRev,
    exports.MapRepRev,
    exports.SetRepRev,
];
exports.default = createRepRev_js_1.default;
