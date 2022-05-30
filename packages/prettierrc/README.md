# Prettier Config

> Kienle Holdings Prettier configuration

## Installation

With pnpm (recommended)

```bash
pnpm install prettier@2.6.2 -D
pnpm install @kienleholdings/prettierrc -D
```

With yarn

```bash
yarn add prettier@2.6.2 -D
yarn add @kienleholdings/prettierrc -D
```

With npm

```bash
npm install prettier@2.6.2 -D
npm install @kienleholdings/prettierrc -D
```

## Usage

1. Add the following to your project's `package.json`: `"prettier": "@kienleholdings/prettierrc",`
1. Done (yup, that's really all there is)

## Advanced Usage

1. Create a `.prettierrc.js`.
1. Add the code: `module.exports = { ...require('@kienleholdings/prettierrc') };`
1. Done. Feel free to make any further modifications in that object.
