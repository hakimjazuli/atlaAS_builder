/**
 * @description
 * call by class instantiation;
 * ```js
 * // /dev/index.mjs
 * // @ts-check
 * import { _RollupSettings, _RollupTarget, _RollupTargetDir } from '@html_first/atla-as_builder';
 * const targets = [...`(_RollupTarget|_RollupTargetDir)[]` /** array of _RollupTarget instances *[blank]/];
 * new _RollupSettings(targets, [
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
    static __: _RollupSettings;
    /**
     * @type {Map<string, config|{input:string}>}
     */
    static paths: Map<string, config | {
        input: string;
    }>;
    constructor(targets: (_RollupTarget[] | _RollupTargetDir[]), toResolveList?: (string[] | []));
    /**
     * @type {import('chokidar').FSWatcher}
     */
    watcher: import("chokidar").FSWatcher;
    /**
     * @private
     * @type {_QueueFIFO}
     */
    private queueHandler;
    /**
     * @private
     * @type {_RollupSettings}
     */
    private rollupSettings;
    /**
     * @private
     * @param {string} path_
     * @param {import('fs').Stats} _
     */
    private handleConfig;
    getPaths: () => any[];
    /**
     * @type {config[]}
     */
    config: config[];
    /**
     * @private
     * @param {string} basePath
     * @param {(_RollupTarget|_RollupTargetDir)[]} targets
     * @param {string[]|[]} resolveList
     */
    private generateConfig;
    /**
     * Recursively reads a directory and returns all files with their full paths.
     * @param {string} dirPath - The directory to read.
     * @param {Dirent[]} fileList - An accumulator array for the file paths (default: empty array).
     * @returns {Dirent[]} - Array of file paths.
     */
    readFilesNestedSync(dirPath: string, fileList?: import("fs").Dirent[]): import("fs").Dirent[];
    /**
     * @private
     * @param {string} basePath
     * @param {_RollupTargetDir} target
     * @param {string[]|[]} resolveList
     */
    private configForRollupTargetDir;
    /**
     * @private
     * @param {string} basePath
     * @param {_RollupTarget} target
     * @param {string[]|[]} resolveList
     */
    private configForRollupTarget;
}
export type _RollupSettingsConstructor = (targets: (_RollupTarget[] | _RollupTargetDir[]), toResolveList?: (string[] | [])) => void;
export type config = {
    input: import("rollup").InputOption;
    output: import("rollup").OutputOptions;
    plugins: import("rollup").InputPluginOption[];
};
import { _RollupTarget } from './_RollupTarget.mjs';
import { _RollupTargetDir } from './_RollupTargetDir.mjs';
