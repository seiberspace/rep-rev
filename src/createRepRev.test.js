import createRepRev from './createRepRev.js';

describe('createRepRev', () => {
	it('creates a RepRev', () => {
		const replace = () => {};
		const revive = () => {};
		const testee = createRepRev(replace, revive);
		expect(testee).toBeTruthy();
	});
});
