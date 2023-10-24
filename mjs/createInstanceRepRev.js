import createRepRev from './createRepRev.js';

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
 * it returns falsy.
 * @param  {[type]} value Packed instance.
 * @return {Object}       Object, either containing a `className` and instance
 *                        data, or empty.
 */
function unpackInstance(value) {
	if (typeof value !== 'object' || !value) {
		return null;
	}
	return {
		className: value[CLS_NAME],
		data: value.data,
	};
}

//------------------------------------------------------------------------------
export function createInstanceRepRev(classNameArg, replaceArg, reviveArg, options = {}) {
	const {
		pack = packInstance,
		unpack = unpackInstance,
	} = options;

	// If classNameArg is a class, take name from there. Otherwise
	// it's the name as a string.
	const className = (typeof classNameArg === 'function')
		? classNameArg.name
		: classNameArg;

	// Prefer replaceArg, use classNameArg.replace instead if possible.
	const replace = (typeof replaceArg === 'function')
		? replaceArg
		: (typeof classNameArg === 'function') && classNameArg.replace;

	// Prefer reviveArg, use classNameArg.revive instead if possible.
	const revive = (typeof reviveArg === 'function')
		? reviveArg
		: (typeof classNameArg === 'function') && classNameArg.revive;

	//----------------------------------------------------------------------------
	function replacer(key, value, owner) {
		const originalValue = owner[key];
		if (typeof originalValue !== 'object') {
			return value;
		}
		const cn = originalValue.constructor.name;
		if (cn === className) {
			const replacedValue = replace(key, value, owner);
			if (originalValue === replacedValue) {
				throw new Error(`You can't return the original value from an object replacer, that would lead to recursion.`, {
					cause: { key, value, owner },
				});
			}
			return pack(className, replacedValue);
		}
		return value;
	}

	function reviver(key, value, owner) {
		const unpacked = unpack(value);
		if (!unpacked || (unpacked.className !== className)) {
			return value;
		}
		return revive(key, unpacked.data, owner);
	}

	return createRepRev(replacer, reviver);
}

// All these use `owner[key]` instead of `value` in `replace()`, since `value`
// is already transformed by JSON (e.g. in case of `Date`).

//------------------------------------------------------------------------------
export const DateRepRev = createInstanceRepRev(
	'Date',
	(key, value, owner) => owner[key].toISOString(),
	(key, value, owner) => {
		const d = new Date(value);
		if (Number.isNaN(d.valueOf())) {
			throw new TypeError('Invalid date.', {
				cause: { key, value, owner },
			});
		}
		return d;
	},
);

//------------------------------------------------------------------------------
export const MapRepRev = createInstanceRepRev(
	'Map',
	(key, value, owner) => [...owner[key].entries()],
	(key, value) => new Map(value),
);

//------------------------------------------------------------------------------
export const SetRepRev = createInstanceRepRev(
	'Set',
	(key, value, owner) => [...owner[key].values()],
	(key, value) => new Set(value),
);

//------------------------------------------------------------------------------
export const builtIn = [
	DateRepRev,
	MapRepRev,
	SetRepRev,
];
