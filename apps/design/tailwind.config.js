const config = {
  content: [
    './src/**/*.ts',
    './src/**/*.tsx',
    '../../packages/zephyr-react/src/**/*.tsx',
    '../../packages/zephyr-react/src/**/*.ts',
  ],
  presets: [require('@kienleholdings/zephyr-core')],
};

module.exports = config;
