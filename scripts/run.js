import { spawn } from 'node:child_process';

//------------------------------------------------------------------------------
function run(cmd, args, optsArg = {}) {
	const { throwOnExitCode, ...opts } = optsArg;
	return new Promise((resolve, reject) => {
		function handleExit(code) {
			if (code === 0 || !throwOnExitCode) {
				return resolve(code);
			}
			const error = new Error('Exit code');
			error.name = 'ExitCodeError';
			error.code = code;
			reject(error);
		}

		const child = spawn(cmd, args, {
			...opts,
			stdio: 'inherit',
			shell: true,
		});

		child.on('error', (err) => {
			reject(err);
		});

		child.on('close', handleExit);
		child.on('exit', handleExit);
	});
}

export default run;
