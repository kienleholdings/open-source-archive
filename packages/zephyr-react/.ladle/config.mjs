export default {
  resolve: {
    alias: [
      { find: 'components', replacement: '/src/components' },
      { find: 'types', replacement: '/src/types' },
      { find: 'utils', replacement: '/src/utils' },
    ],
  },
  root: './src',
  serve: {
    open: 'none',
    port: 8000,
  },
};
