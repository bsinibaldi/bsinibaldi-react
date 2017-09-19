const path = require('path');
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const HthmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'app/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, '/build/'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        paths: [
          './node_modules',
          './src',
          './public',
        ],
      },
    }),
    new HthmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '/public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|functions)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|functions)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './app'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
};
