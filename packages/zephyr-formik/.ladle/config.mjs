export default {
  resolve: {
    alias: [{ find: 'components', replacement: '/src/components' }],
  },
  root: './src',
  serve: {
    open: 'none',
    port: 8001,
  },
};
