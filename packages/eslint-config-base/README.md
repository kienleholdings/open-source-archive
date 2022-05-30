# ESLint Config Base

> Kienle Holdings Base (Non-React) ESLint Config

## Installation

With pnpm (recommended)

```bash
pnpm install typescript eslint prettier @kienleholdings/prettierrc -D
pnpm install @kienleholdings/eslint-config-base -D
```

With yarn

```bash
yarn add typescript eslint prettier @kienleholdings/prettierrc -D
yarn add @kienleholdings/eslint-config-base -D
```

With npm

```bash
npm install typescript eslint prettier @kienleholdings/prettierrc -D
npm install @kienleholdings/eslint-config-base -D
```

## Usage

1. Create a file named `.eslintrc.js`
1. Add the following:

```JavaScript
module.exports = {
  extends: [
    '@kienleholdings/base',
  ],
};
```
