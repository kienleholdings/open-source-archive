const { createConfig } = require('@kienleholdings/zephyr-core');

const config = createConfig(['./src/**/*.ts', './src/**/*.tsx']);

module.exports = config;
