const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        proxy: {
            '/': {
                target: 'http://localhost:3002',
                changeOrigin: true,
                pathRewrite: {
                '^/': ''
                }
            }
        },
        port: 3001,
    }
})