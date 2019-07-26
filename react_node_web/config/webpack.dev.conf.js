const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 3001,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                bypass: function(req) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        return '/index.html'
                    }
                }
            }
        }
    }
})