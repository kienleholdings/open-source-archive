# MarkdownLint Config

> Kienle Holdings Markdownlint Config

## Installation

With pnpm (recommended)

```bash
pnpm install markdownlint-cli2 -D
pnpm install @kienleholdings/mdlint -D
```

With yarn

```bash
yarn add markdownlint-cli2 -D
yarn add @kienleholdings/mdlint -D
```

With npm

```bash
npm install markdownlint-cli2 -D
npm install @kienleholdings/mdlint -D
```

## Usage

1. Add the following to your package.json `scripts`:
   `"lint-markdown":"markdownlint-cli2 \"**/*.md\" \"#node_modules\""`
1. Create a file named `.markdownlint.cjs`
1. Add the following to the new file:

```JavaScript
module.exports = require('@kienleholdings/mdlint');
```
