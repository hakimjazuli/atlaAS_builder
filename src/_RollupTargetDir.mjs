// @ts-check

/**
 * @description
 * - typehelper for [_RollupSettings](#_rollupsettings) instantiation;
 * - this class is to `many to many` files bundling;
 * - the output will be inside `target` `relative` path;
 * - usefull if you already manually `chunking` your output;
 */
export class _RollupTargetDir {
	/** @type {string} */
	src;
	/** @type {string} */
	target;
	/**
	 * @param {string} src
	 * @param {string} target
	 */
	constructor(src, target) {
		this.src = src;
		this.target = target;
	}
}
