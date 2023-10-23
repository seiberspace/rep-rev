"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createRepRev_js_1 = __importDefault(require("./createRepRev.js"));
//------------------------------------------------------------------------------
function createRepRevCollection(transformers) {
    const transformer = (0, createRepRev_js_1.default)((key, value, owner) => {
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
exports.default = createRepRevCollection;
