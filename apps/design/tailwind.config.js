const config = {
  content: [
    './src/**/*.ts',
    './src/**/*.tsx',
    './node_modules/@kienleholdings/zephyr-react/dist/index.js',
  ],
  presets: [require('@kienleholdings/zephyr-core')],
};

module.exports = config;
