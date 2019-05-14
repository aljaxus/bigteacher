const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const htmlPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'public',
    compress: true,
    host: '0.0.0.0',
    port: 8001,
    open: true,
    overlay: { warnings: true, errors: true }
  },
  plugins: [
    new htmlPlugin({
      template: './src/template.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader'
        ]
      }
    ]
  }
})