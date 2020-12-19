const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    // output: {
    //     filename: 'static/js/[name].[hash].js',
    // },
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
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: 'static/css/[name].[hash].css',
    //     }),
    // ],
})
