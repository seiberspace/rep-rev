/**
 * Main
 */
import createRepRev from './createRepRev.js';
import createRepRevCollection from './createRepRevCollection.js';
import createInstanceRepRev from './createInstanceRepRev.js';
import transformJson from './transformJson.js';

// All these use `owner[key]` instead of `value`, since `value` might already
// be transformed (e.g. in case of `Date`).

//------------------------------------------------------------------------------
export const DateRepRev = createInstanceRepRev(
	'Date',
	(key, value, owner) => owner[key].toISOString(),
	(key, value) => new Date(value),
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

//------------------------------------------------------------------------------
export {
	createRepRevCollection,
	createInstanceRepRev,
	transformJson,
};

export default createRepRev;
