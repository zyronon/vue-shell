const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require("compression-webpack-plugin");//gzip
const {merge} = require('webpack-merge')
const webpack = require('webpack')

const pathResolve = (dir) => path.join(__dirname, '..', dir)
module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    stats: {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
                // include: path.join(__dirname, '../src'),//不能包含，node_modules里面有第三库是vue
                // exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            ignoreOrder: true,
        }),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(''),
            // 'process.env': {NODE_ENV: 'production'}
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    // minChunks: 2,
                    chunks: 'all'
                }
            }
        }
    },
})
