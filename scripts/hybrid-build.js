import { cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname, resolve } from 'node:path';

import chalk from 'chalk';
import {
	CJS,
	MJS,
	BUILD,
	createDistFolders,
} from './tools.js';
import run from './run.js';

const {
	cyan,
	red,
} = chalk;

const HYBRID_FOLDER = resolve(join(dirname(fileURLToPath(import.meta.url)), '..'));
const HYBRID_BUILD_FOLDER = join(HYBRID_FOLDER, BUILD);

async function main() {
	try {
		const tsc = join(HYBRID_FOLDER, 'node_modules', 'typescript', 'bin', 'tsc');
		console.log(cyan('creating dist-folders'));
		const { distFolderCjs, distFolderMjs } = await createDistFolders();

		// clean
		await rm(distFolderCjs, { recursive: true });
		await rm(distFolderMjs, { recursive: true });

		console.log(cyan('compiling'));
		await run(tsc, ['-p', `tsconfig.${CJS}.json`]);
		await run(tsc, ['-p', `tsconfig.${MJS}.json`]);

		console.log(cyan('copying package.json'));
		await cp(join(HYBRID_BUILD_FOLDER, CJS, 'package.json'), join(distFolderCjs, 'package.json'));
		await cp(join(HYBRID_BUILD_FOLDER, MJS, 'package.json'), join(distFolderMjs, 'package.json'));
	} catch (error) {
		console.error(red(error.message));
		if (process.env.NODE_ENV === 'development') {
			console.log(error);
		}
		process.exit(1);
	}
}

main();
