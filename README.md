# atlaAS_builder
- designed for `@html_first` packages;
- though it might still be usefull for general usage for bundling;
    ## installation
```shell
npm i @html_first/atla-as_builder
```
## exported-api-and-type-list
- [_RollupSettings](#_rollupsettings)
- [_RollupTarget](#_rolluptarget)
- [_RollupTargetDir](#_rolluptargetdir)
<h2 id="_rollupsettings">_RollupSettings</h2>

call by class instantiation;```js// /dev/index.mjs// @ts-checkimport { _RollupSettings, _RollupTarget, _RollupTargetDir } from '@html_first/atla-as_builder';const targets = [...`(_RollupTarget|_RollupTargetDir)[]` /** array of _RollupTarget instances */];new _RollupSettings(targets, [	/** 'packages_to_resolves' optional */]).config;```then save to your script```json{..."scripts":{	...   "myscript":"node ./dev/index.mjs"	...}...}```which then you can trigger by```shellnpm run myscript```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="_rolluptarget">_RollupTarget</h2>

- typehelper for [_RollupSettings](#_rollupsettings) instantiation;- this class is to `one to one` file bundling;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

<h2 id="_rolluptargetdir">_RollupTargetDir</h2>

- typehelper for [_RollupSettings](#_rollupsettings) instantiation;- this class is to `many to many` files bundling;- the output will be inside `target` `relative` path;- usefull if you already manually `chunking` your output;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>
