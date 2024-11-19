module.exports = function (options) {
  console.log('Webpack Config!');
  return {
    ...options,
    mode: 'development',
    devtool: 'source-map',
  };
};
