# Zephyr React

> React Component Library for Zephyr

## Installation

With pnpm (recommended)

```bash
pnpm install autoprefixer postcss tailwindcss -D
pnpm install react react-dom @kienleholdings/zephyr-core
pnpm install @kienleholdings/zephyr-react
```

With yarn

```bash
yarn add autoprefixer postcss tailwindcss -D
yarn add formik react react-dom @kienleholdings/zephyr-core
yarn add @kienleholdings/zephyr-react
```

With npm

```bash
npm install autoprefixer postcss tailwindcss -D
npm install formik react react-dom @kienleholdings/zephyr-core
npm install @kienleholdings/zephyr-react
```

## Setup

For complete setup instructions, see the
[`zephyr-core`](https://github.com/kienleholdings/zephyr/tree/main/packages/zephyr-core) usage
instructions. Additional information can be found in the official
[TailwindCSS documentation](https://tailwindcss.com/).

## Usage

Full component usage documentation as well as examples of each component can be found on
[kienle.design](https://www.kienle.design/docs/react/index.html). Here's a quick example using the
`Button` component:

```tsx
import { Button } from '@kienleholdings/zephyr-react';

const MyComponent: React.VFC = () => (
  <Button onClick={() => alert('Hello, world!')} type="primary">
    Test Button
  </Button>
);
```
