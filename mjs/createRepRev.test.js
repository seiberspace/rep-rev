import createRepRev from './createRepRev.js';

describe('createRepRev creates a RepRev, that', () => {
	const returnValue = {};
	const oldValue = {};
	const owner = {};
	const replace = jest.fn(() => returnValue);
	const revive = jest.fn(() => returnValue);

	it('is a RepRev', () => {
		const testee = createRepRev(null, null);
		expect(testee).toBeObject();
		expect(testee.replace).toBeFunction();
		expect(testee.revive).toBeFunction();
	});

	describe('has a function replace(), that', () => {
		it('calls the supplied replace() with (key, value, owner)', () => {
			const owner = {};
			const testee = createRepRev(replace, null);
			testee.replace.call(owner, 'key', oldValue);
			expect(replace).toHaveBeenCalledWith('key', oldValue, owner);
		});

		it('returns the value from replace()', () => {
			const testee = createRepRev(replace, null);
			const newValue = testee.replace.call(owner, 'key', oldValue);
			expect(newValue).toBe(returnValue);
		});

		it('returns the original value if replace() is null', () => {
			const testee = createRepRev(null, null);
			const newValue = testee.replace.call(owner, 'key', oldValue);
			expect(newValue).toBe(oldValue);
		});
	});

	describe('has a function revive(), that', () => {
		it('calls the supplied revive() with (key, value, owner)', () => {
			const testee = createRepRev(null, revive);
			testee.revive.call(owner, 'key', oldValue);
			expect(revive).toHaveBeenCalledWith('key', oldValue, owner);
		});

		it('returns the value from revive()', () => {
			const testee = createRepRev(null, revive);
			const newValue = testee.revive.call(owner, 'key', oldValue);
			expect(newValue).toBe(returnValue);
		});

		it('returns the original value if revive() is null', () => {
			const testee = createRepRev(null, null);
			const newValue = testee.revive.call(owner, 'key', oldValue);
			expect(newValue).toBe(oldValue);
		});
	});
});
