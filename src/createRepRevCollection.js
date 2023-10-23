import createRepRev from './createRepRev.js';

//------------------------------------------------------------------------------
function createRepRevCollection(transformers) {
	const transformer = createRepRev(
		(key, value, owner) => {
			for (const transformer of transformers) {
				const newValue = transformer.replace.call(owner, key, value);
				if (newValue !== value) {
					return newValue;
				}
			}
			return value;
		},

		(key, value, owner) => {
			for (const transformer of transformers) {
				const newValue = transformer.revive.call(owner, key, value);
				if (newValue !== value) {
					return newValue;
				}
			}
			return value;
		},
	);

	transformer.transformers = transformers;

	return transformer;
}

export default createRepRevCollection;
