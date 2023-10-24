import {
	createRepRevCollection,
} from '../mjs/index.js';

const item = {
	id: 1,
	created: new Date('2023-10-23T08:30:00.000Z'),
};

// The default RepRev-collection contains built-ins for
// Map, Set and Date:
const repRev = createRepRevCollection(/* or pass custom transformers here */);

async function main() {
	console.log('*** Original:\n', item);

	const text = JSON.stringify(item, repRev.replace, 2);
	console.log('\n*** Stringified:\n', text);

	const revivedItem = JSON.parse(text, repRev.revive);
	console.log('\n*** Parsed:\n', revivedItem);
}

main();

