module.exports = {
  presets: [
    '@vue/app',
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
