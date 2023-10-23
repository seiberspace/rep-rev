import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const DIST = 'dist';
export const BUILD = 'build';
export const CJS = 'cjs';
export const MJS = 'mjs';

export const TARGETS = [
	CJS,
	MJS,
];

export async function createDistFolders() {
	const distFolder = join(process.cwd(), DIST);
	const distFolderCjs = join(distFolder, CJS);
	const distFolderMjs = join(distFolder, MJS);

	// create dist-folder
	if (!existsSync(distFolder)) {
		await mkdir(distFolder);
	}
	if (!existsSync(distFolderCjs)) {
		await mkdir(distFolderCjs);
	}
	if (!existsSync(distFolderMjs)) {
		await mkdir(distFolderMjs);
	}

	return {
		distFolder,
		distFolderCjs,
		distFolderMjs,
	};
}
