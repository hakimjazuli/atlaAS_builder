/**
 * @description
 * - typehelper for [_RollupSettings](#_rollupsettings) instantiation;
 * - this class is to `one to one` file bundling;
 */
export class _RollupTarget {
    /**
     *
     * @param {string} name
     * @param {string} sourcePath
     * @param {string} exportToRelative
     */
    constructor(name: string, sourcePath: string, exportToRelative: string);
    /** @type {string} */
    targetName: string;
    /** @type {string} */
    sourcePath: string;
    /** @type {string} */
    exportToRelative: string;
}
