const { createConfig } = require('@kienleholdings/zephyr-core');

const config = createConfig([
  './src/**/*.ts',
  './src/**/*.tsx',
  '../zephyr-formik/dist/index.js',
  '../zephyr-react/dist/index.js',
]);
module.exports = config;
