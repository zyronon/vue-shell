const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    // devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: 'localhost',
        port: 9001,
        // open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    },
                ],
                include: path.join(__dirname, '../src'),
                exclude: /node_modules/,
            },
        ],
    },
})
