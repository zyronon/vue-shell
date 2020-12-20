const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const path = require('path')
const webpack = require('webpack')
const pathResolve = (dir) => path.join(__dirname, '..', dir)

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: 'localhost',
        port: 9003,
        // open: true,
        hot: true
    },
    output: {
        publicPath: 'http://localhost:9003/'
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
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
                //注意这里node_modules里面的第三方库也可能是vue格式的，排除掉了，就会报错
                // include: path.join(__dirname, '../src'),
                // exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(''),
            // 'process.env': {NODE_ENV: '"development"'}
        })
    ]
})
