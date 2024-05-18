# atlaAS_builder

-   designed for `@html_first` packages;
-   though it might still be usefull for general usage for bundling;

## installation

```shell
npm i @html_first/atla-as_builder
```

```js
// rollup.config.mjs
// @ts-check

import { _RollupSettings, _RollupTarget } from '@html_first/atla-as_builder';

const targets = [...`_RollupTarget[]` /** array of _RollupTarget instances */];

export default new _RollupSettings(targets, [
	/** 'packages_to_resolves' optional */
]).config;
```

then save to your script

```json
{
    ...
    "scripts":{
        ...
        "build":"rollup -c",
        "watch":"rollup -c -w",
        ...
    }
    ...
}
```

which then you can trigger by

```shell
npm run build
```

or

```shell
npm run watch
```
