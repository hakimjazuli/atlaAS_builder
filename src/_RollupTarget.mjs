// @ts-check

/**
 * @description
 * - typehelper for [_RollupSettings](#_rollupsettings) instantiation;
 * - this class is to `one to one` file bundling;
 */
export class _RollupTarget {
	/** @type {string} */
	targetName;
	/** @type {string} */
	sourcePath;
	/** @type {string} */
	exportToRelative;
	/**
	 *
	 * @param {string} name
	 * @param {string} sourcePath
	 * @param {string} exportToRelative
	 */
	constructor(name, sourcePath, exportToRelative) {
		this.targetName = name;
		this.sourcePath = sourcePath;
		this.exportToRelative = exportToRelative;
	}
}
