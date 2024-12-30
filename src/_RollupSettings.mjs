// @ts-check

import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import cssnano from 'cssnano';
import postcss from 'postcss';
import process from 'process';
import resolve from '@rollup/plugin-node-resolve';
import { readdirSync } from 'fs';
import { extname, join, basename, relative } from 'path';
import { _RollupTarget } from './_RollupTarget.mjs';
import { _RollupTargetDir } from './_RollupTargetDir.mjs';
import { rollup } from 'rollup';
import chokidar from 'chokidar';
import { _QueueFIFO, _QueueObject, _QueueObjectFIFO } from '@html_first/simple_queue';

/**
 * @description
 * call by class instantiation;
 * ```js
 * // /dev/index.mjs
 * // @ts-check
 * import { _RollupSettings, _RollupTarget, _RollupTargetDir } from '@html_first/atla-as_builder';
 * const targets = [...`(_RollupTarget|_RollupTargetDir)[]` /** array of _RollupTarget instances *[blank]/];
 * export default new _RollupSettings(targets, [
 * 	/** 'packages_to_resolves' optional *[blank]/
 * ]).config;
 * ```
 * then save to your script
 * ```json
 * {
 *	...
 *	"scripts":{
 *		...
 *	   "myscript":"node ./dev/index.mjs"
 *		...
 *	}
 *	...
 * }
 * ```
 * which then you can trigger by
 * ```shell
 * npm run myscript
 * ```
 */
/**
 * @typedef {(targets:(_RollupTarget[]|_RollupTargetDir[]),toResolveList?:(string[]|[]))=>void} _RollupSettingsConstructor
 */
/**
 * @typedef {Object} config
 * @property {import('rollup').InputOption} input
 * @property {import('rollup').OutputOptions} output
 * @property {import('rollup').InputPluginOption[]} plugins
 */

export class _RollupSettings {
	/**
	 * @type {_RollupSettings}
	 */
	static __;
	/**
	 * @typedef {import('fs').Dirent} Dirent
	 */
	/**
	 * @type {_RollupSettingsConstructor}
	 */
	constructor(targets, toResolveList = []) {
		if (_RollupSettings.__ instanceof _RollupSettings) {
			console.warn({
				singleton: '`_RollupSettings` is a singleton class',
				returns: 'returning first `_RollupSettings` instance',
			});
			return _RollupSettings.__;
		}
		this.generateConfig(process.cwd(), targets, toResolveList);
		const paths = this.getPaths();
		this.watcher = chokidar.watch(paths);
		console.log({
			message: 'beginning watching paths',
			paths,
		});
		this.watcher.on('add', this.handleConfig).on('change', this.handleConfig);
		this.queueHandler = new _QueueFIFO();
	}
	/**
	 * @private
	 * @type {_QueueFIFO}
	 */
	queueHandler;
	/**
	 * @type {import('chokidar').FSWatcher}
	 */
	watcher;
	/**
	 * @private
	 * @type {_RollupSettings}
	 */
	rollupSettings;
	/**
	 * @private
	 * @param {string} path_
	 * @param {import('fs').Stats} _
	 */
	handleConfig = (path_, _) => {
		this.queueHandler.assign(
			new _QueueObjectFIFO(async () => {
				try {
					const config = _RollupSettings.paths.get(path_);
					if (!('output' in config) || !('plugins' in config)) {
						return;
					}
					const { input, output, plugins } = config;
					const bundle = await rollup({ input, plugins });
					await bundle.write(output);
					console.log({
						message: 'successfully bundle',
						from: input,
						// @ts-ignore
						to: join(output.dir, output.entryFileNames),
					});
				} catch (error) {
					console.error({
						...error,
						__builder: {
							error: 'unable to build',
							path: path_,
						},
					});
				}
			})
		);
	};
	/**
	 * @type {Map<string, config|{input:string}>}
	 */
	static paths = new Map();
	getPaths = () => {
		const paths_ = [];
		_RollupSettings.paths.forEach((el) => {
			paths_.push(el.input);
		});
		return paths_;
	};
	/**
	 * @type {config[]}
	 */
	config = [];
	/**
	 * @private
	 * @param {string} basePath
	 * @param {(_RollupTarget|_RollupTargetDir)[]} targets
	 * @param {string[]|[]} resolveList
	 */
	generateConfig = (basePath, targets, resolveList) => {
		targets.forEach((target) => {
			if (target instanceof _RollupTarget) {
				this.configForRollupTarget(basePath, target, resolveList);
			} else if (target instanceof _RollupTargetDir) {
				this.configForRollupTargetDir(basePath, target, resolveList);
			}
		});
	};
	/**
	 * Recursively reads a directory and returns all files with their full paths.
	 * @param {string} dirPath - The directory to read.
	 * @param {Dirent[]} fileList - An accumulator array for the file paths (default: empty array).
	 * @returns {Dirent[]} - Array of file paths.
	 */
	readFilesNestedSync(dirPath, fileList = []) {
		const entries = readdirSync(dirPath, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.isDirectory()) {
				this.readFilesNestedSync(join(dirPath, entry.name), fileList);
			} else if (entry.isFile()) {
				fileList.push(entry);
			}
		}
		return fileList;
	}
	/**
	 * @private
	 * @param {string} basePath
	 * @param {_RollupTargetDir} target
	 * @param {string[]|[]} resolveList
	 */
	configForRollupTargetDir = (basePath, target, resolveList) => {
		try {
			let { src: folderPath, target: target_ } = target;
			const input_ = join(basePath, folderPath);
			_RollupSettings.paths.set(input_, { input: input_ });
			const entries = this.readFilesNestedSync(folderPath);
			for (let i = 0; i < entries.length; i++) {
				const entry = entries[i];
				if (!entry.isFile() || !['.mjs', '.ts', '.mts'].includes(extname(entry.name))) {
					continue;
				}
				const baseWithoutExtName = basename(entry.name, extname(entry.name));
				this.configForRollupTarget(
					basePath,
					new _RollupTarget(
						baseWithoutExtName,
						join(entry.parentPath, entry.name),
						join(target_, relative(folderPath, entry.parentPath))
					),
					resolveList
				);
			}
		} catch (error) {
			console.error('Error reading folder:', error);
			throw error;
		}
	};
	/**
	 * @private
	 * @param {string} basePath
	 * @param {_RollupTarget} target
	 * @param {string[]|[]} resolveList
	 */
	configForRollupTarget = (basePath, target, resolveList) => {
		const compiled_path = join(basePath, target.exportToRelative);
		const input = join(basePath, target.sourcePath);
		/**
		 * @type {config}
		 */
		const config = {
			input,
			output: {
				dir: compiled_path,
				format: 'es',
				entryFileNames: `${target.targetName}.mjs`,
				plugins: [terser()],
			},
			plugins: [
				resolve({
					resolveOnly: resolveList,
				}),
				scss({
					output: join(compiled_path, `${target.targetName}.css`),
					processor: (css) => {
						return postcss([cssnano])
							.process(css, {
								from: undefined,
								map: { inline: false },
							})
							.then((result) => {
								return result.css.replace(/\/(.*?)\//g, '');
							});
					},
				}),
			],
		};
		_RollupSettings.paths.set(input, config);
		this.config.push(config);
	};
}
