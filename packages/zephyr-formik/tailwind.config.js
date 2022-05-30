const { createConfig } = require('@kienleholdings/zephyr-core');

const config = createConfig(['./src/**/*.ts', './src/**/*.tsx', '../zephyr-react/dist/index.js']);
module.exports = config;
