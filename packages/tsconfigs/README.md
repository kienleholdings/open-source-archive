# TSConfigs

> A Collection of Kienle Holdings TypeScript Configs

## Installation

With pnpm (recommended)

```bash
pnpm install typescript -D
pnpm install @kienleholdings/tsconfigs -D
```

With yarn

```bash
yarn add typescript -D
yarn add @kienleholdings/tsconfigs -D
```

With npm

```bash
npm install typescript -D
npm install @kienleholdings/tsconfigs -D
```

## Usage

1. Create a file named `tsconfig.json`
1. Add the following:

```JSON
{
  "extends": "@kienleholdings/tsconfigs/base.json",
}
```

## Recommended Customization

Going off by the base config is a great start, but won't get you too far. We recommend setting the
following:

- [`compilerOptions.baseUrl`](https://github.com/kienleholdings/typescript#base-url)
- [`compilerOptions.jsx`](https://github.com/kienleholdings/typescript#jsx)
- [`compilerOptions.lib`](https://github.com/kienleholdings/typescript#lib)
- [`compilerOptions.outDir`](https://github.com/kienleholdings/typescript#out-dir)
- [`compilerOptions.rootDir`](https://github.com/kienleholdings/typescript#root-dir)
- [`compilerOptions.sourceRoot`](https://github.com/kienleholdings/typescript#source-root)
- [`compilerOptions.target`](https://github.com/kienleholdings/typescript#target)
- [`compilerOptions.types`](https://github.com/kienleholdings/typescript#types)
- [`exclude`](https://github.com/kienleholdings/typescript#excluded-files)
- [`files`](https://github.com/kienleholdings/typescript#additional-typings)
- [`include`](https://github.com/kienleholdings/typescript#included-files)

A version `0.1.3` change marked `esnext` as a valid option for `compilerOptions.module` but left
`commonjs` as a default for backwards compatibility. If you're running webpack, we recommend setting
that for any case where you don't explicitly need commonjs modules
