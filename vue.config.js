module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  },
};
