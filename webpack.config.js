'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: 'app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/scripts'),
        query: { presets: ['es2015'] }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        include: path.resolve(__dirname, 'src/styles')
      },
      {

        test: /\.json$/,
        loader: 'json-loader',
        include: path.resolve(__dirname, 'src/scripts')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss','.json'],
    root: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src/scripts'),
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },
  noParse: ['react', 'react-dom']
};
