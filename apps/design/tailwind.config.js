const { createConfig } = require('@kienleholdings/zephyr-core');

const config = createConfig([
  './src/**/*.ts',
  './src/**/*.tsx',
  './node_modules/@kienleholdings/zephyr-react/dist/index.js',
]);
module.exports = config;
