# Zephyr Core

> Core TailwindCSS Configuration for Zephyr

## Installation

With pnpm (recommended)

```bash
pnpm install autoprefixer postcss tailwindcss -D
pnpm install @kienleholdings/zephyr-core
```

With yarn

```bash
yarn add autoprefixer postcss tailwindcss -D
yarn add @kienleholdings/zephyr-core
```

With npm

```bash
npm install autoprefixer postcss tailwindcss -D
npm install @kienleholdings/zephyr-core
```

## Setup

In order to set up Zephyr Core with your build system, we recommend checking out the
[official TailwindCSS installation instructions](https://tailwindcss.com/docs/installation).

## Usage

1. Add `require('@kienleholdings/zephyr-core/zephyr-core.css');` to the top of the entry point of
   your application
1. Create a `tailwind.config.js` file in your project
1. Populate it with the following code:

```js
const { createConfig } = require('@kienleholdings/zephyr-core');

const config = createConfig();

module.exports = config;
```

## Customization

Want a different theme than the one provided? Want to override other Tailwind styles? Here's how:

```js
const { createConfig } = require('@kienleholdings/zephyr-core');

const theme = {
  colors: {
    primary: {
      DEFAULT: '#DC602E',
      dark: '#C34715',
      light: '#F67A48',
      type: '#FFF',
    },
    secondary: {
      DEFAULT: '#FFF',
      dark: '#E6E6E6',
      light: '#FFF',
      type: '#444',
    },
  },
  fontFamily: {
    body: ['"Source Sans Pro"', 'sans-serif'],
    display: ['"Oxygen"', 'sans-serif'],
  },
};

const tailwindExtensions = {
  borderRadius: {
    halfRounded: '4px', // Let's add an optional 4px border radius
  },
};

const tailwindOverrides = {
  fontWeight: {
    normal: '800', // We want ALL those fonts dummy thicc
  },
};

// Each of these parameters are optional, you don't need any of them
const config = createConfig(theme, tailwindExtensions, tailwindOverrides);

module.exports = config;
```
