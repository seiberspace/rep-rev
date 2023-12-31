"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createRepRev_js_1 = __importDefault(require("./createRepRev.js"));
//----------------------------------------------------------------------------
const CLS_NAME = '$class';
//----------------------------------------------------------------------------
/**
 * Packs a class into an object containing the class name
 * and the instance data for revival.
 * @param  {[type]} className Classname.
 * @param  {[type]} data      Instance data.
 * @return {any}              Packed instance. `unpackInstance()` must be able
 *                            to recreate the instance from that packed data.
 */
function packInstance(className, data) {
    return {
        [CLS_NAME]: className,
        data,
    };
}
/**
 * Unpacks an instance of a class previously packed by `packInstance()`.
 * In case it can't determine the correct data (classname and instance data),
 * it returns an empty object.
 * @param  {[type]} value Packed instance.
 * @return {Object}       Object, either containing a `className` and instance
 *                        data, or empty.
 */
function unpackInstance(value) {
    if (typeof value !== 'object' || !value) {
        return {};
    }
    return {
        className: value[CLS_NAME],
        data: value.data,
    };
}
//------------------------------------------------------------------------------
function createInstanceRepRev(className, replace, revive, options = {}) {
    const { pack = packInstance, unpack = unpackInstance, } = options;
    return (0, createRepRev_js_1.default)((key, value, owner) => {
        const originalValue = owner[key];
        if (typeof originalValue !== 'object') {
            return value;
        }
        const cn = originalValue.constructor.name;
        if (cn === className) {
            const replacedValue = replace(key, value, owner);
            if (originalValue === replacedValue) {
                throw new Error(`You can't return the original value from an object replacer, that would lead to recursion.`);
            }
            return pack(className, replacedValue);
        }
        return value;
    }, (key, value, owner) => {
        const { className: cn, data } = unpack(value);
        if (cn === className) {
            return revive(key, data, owner);
        }
        return value;
    });
}
exports.default = createInstanceRepRev;
