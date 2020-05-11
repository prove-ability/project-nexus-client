/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  target: 'serverless',
};
