# Zephyr React

> Formik Components for Zephyr

## Installation

With pnpm (recommended)

```bash
pnpm install autoprefixer postcss tailwindcss -D
pnpm install formik react react-dom @kienleholdings/zephyr-core @kienleholdings/zephyr-react
pnpm install @kienleholdings/zephyr-formik
```

With yarn

```bash
yarn add autoprefixer postcss tailwindcss -D
yarn add formik react react-dom @kienleholdings/zephyr-core @kienleholdings/zephyr-react
yarn add @kienleholdings/zephyr-formik
```

With npm

```bash
npm install autoprefixer postcss tailwindcss -D
npm install formik react react-dom @kienleholdings/zephyr-core @kienleholdings/zephyr-react
npm install @kienleholdings/zephyr-formik
```

## Setup

For complete setup instructions, see the
[`zephyr-core`](https://github.com/kienleholdings/zephyr/tree/main/packages/zephyr-core) usage
instructions. Additional information can be found in the official
[TailwindCSS documentation](https://tailwindcss.com/).

## Usage

Full component usage documentation as well as examples of each component can be found on
[kienle.design](https://www.kienle.design/docs/formik/index.html). Here's a quick example using the
`Button` component:

```tsx
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@kienleholdings/zephyr-formik';
import { Button } from '@kienleholdings/zephyr-react';

const MyComponent: React.VFC = () => (
  <Formik
    initialValues={{ formikText: 'foo' }}
    onSubmit={(values) => {
      alert(JSON.stringify(values));
    }}
    validationSchema={validationSchema}
  >
    <Form>
      <Input htmlType="text" label="Text Input" name="formikText" placeholder="Enter Something" />
      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </Form>
  </Formik>
);
```
