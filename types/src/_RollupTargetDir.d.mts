/**
 * @description
 * - typehelper for [_RollupSettings](#_rollupsettings) instantiation;
 * - this class is to `many to many` files bundling;
 * - the output will be inside `target` `relative` path;
 * - usefull if you already manually `chunking` your output;
 */
export class _RollupTargetDir {
    /**
     * @param {string} src
     * @param {string} target
     */
    constructor(src: string, target: string);
    /** @type {string} */
    src: string;
    /** @type {string} */
    target: string;
}
