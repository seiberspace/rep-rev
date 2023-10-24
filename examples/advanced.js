import createRepRev, {
	createRepRevCollection,
	createInstanceRepRev,
	builtIn,
} from '../mjs/index.js';

// Some classes to work with:

//------------------------------------------------------------------------------
class User {
	// Having a static `replace()` and `revive()` allows to pass just the class
	// to `createInstanceRepRev()`. Otherwise you have to pass the class name
	// plus a `replace()` and a `revive()`.
	static replace(key, value) {
		// Can't return `this`, that would lead to infinite recursion.
		// The InstanceRepRev checks and throws an error in case.
		return { ...value };
	}

	static revive(key, value) {
		return new User(value.id, value);
	}

	constructor(id, data = {}) {
		this.id = id;
		// Let's be strict about what `data` can contain:
		if (typeof data._pawnsOff !== 'undefined') {
			throw new Error('Data contains private properties.');
		}
		this.firstName = data.firstName || '';
		this.lastName = data.lastName || '';
		this.created = data.created || new Date();
		this.messages = data.messages || new Map();

		// This one is private.
		this._pawnsOff = 0;
	}

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}

//------------------------------------------------------------------------------
class Message {
	static replace(key, value) {
		return { ...value };
	}

	static revive(key, value) {
		return new Message(value.id, value);
	}

	constructor(id, data = {}) {
		this.id = id;
		this.subject = data.subject || '';
		this.body = data.body || '';
		this.created = data.created || new Date();
	}
}

// A RepRev making sure ID is a valid integer, both when stringifying
// and parsing:
function assertIntId(key, value) {
	if (key !== 'id') {
		return value;
	}
	const id = parseInt(value, 10);
	if (!(id > 0)) {
		throw new TypeError('Invalid ID: Only integers > 0 are allowed.');
	}
	return id;
}
const idRepRev = createRepRev(assertIntId, assertIntId);

// A RepRev removing private properties (starting with '_') from
// everything being stringified.
const removePrivates = createRepRev(
	(key, value) => ((key.startsWith('_')) ? undefined : value),
);

const userRepRev = createInstanceRepRev(User);
const messageRepRev = createInstanceRepRev(Message);

// The Master-RepRev is a collection that picks the first RepRev
// that changed (so actually transformed) the value.
const repRev = createRepRevCollection([
	// Since we provide a custom collection include built-ins as well.
	...builtIn,
	userRepRev,
	messageRepRev,
	idRepRev,
	removePrivates,
]);

// Map with some Users:
const userMap = new Map();
userMap.set(1, new User(1, { firstName: 'Marge', lastName: 'Simpson' }));
userMap.set(2, new User(2, { firstName: 'Peter', lastName: 'Parker' }));
userMap.set(3, new User(3, { firstName: 'Ellen', lastName: 'Ripley' }));

// Ripley has a message:
userMap.get(3).messages.set(10, new Message(10, { subject: 'Booh!', body: 'Here is Alien!' }));

async function main() {
	console.log('*** Original:\n', userMap);

	const text = JSON.stringify(userMap, repRev.replace, 2);
	console.log('\n*** Stringified:\n', text);

	const revivedMap = JSON.parse(text, repRev.revive);
	console.log('\n*** Parsed:\n', revivedMap);
}

main();

