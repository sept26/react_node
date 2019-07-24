const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.cong.js')

module.exports = merge(baseConfig, {
  mode: 'production'
})