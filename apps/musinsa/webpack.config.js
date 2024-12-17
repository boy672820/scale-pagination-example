module.exports = function (options) {
  return {
    ...options,
    mode: 'development',
    devtool: 'source-map',
  };
};
