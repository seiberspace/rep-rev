/**
 * Returns an object with `replace()` and `revive()` methods, that can be
 * passed to JSON.stringify() resp. JSON.parse().
 * The functions receive the `this`-argument JSON passes to the transformer
 * as the `owner`-parameter.
 * @param  {function} replace `(key, value, owner) => newValue`
 * @param  {function} revive  `(key, value, owner) => newValue`
 * @return {Object}           Object with correctly bindable `replace()` and
 *                            `revive()` methods.
 */
function createRepRev(replace, revive) {
	return {
		replace(key, value) {
			return replace ? replace(key, value, this) : value;
		},
		revive(key, value) {
			return revive ? revive(key, value, this) : value;
		},
	};
}

export default createRepRev;
