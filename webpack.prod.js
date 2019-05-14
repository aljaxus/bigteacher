const Clean = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const Minicss = require('mini-css-extract-plugin')
const Optimizecss = require('optimize-css-assets-webpack-plugin')
const Optimizejs = require('terser-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const path = require('path')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new Optimizecss(),
      new Optimizejs()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          Minicss.loader, 
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      filename: 'index.html',
      template: './src/template.html',
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new Minicss({
      filename: '[name].[contentHash].bundle.css'
    }),
    new Clean()
  ]
})