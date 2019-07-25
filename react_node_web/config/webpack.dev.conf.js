const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: './dist',
        port: 3001,
        hot: true,
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        },
        historyApiFallback: true
    }
})