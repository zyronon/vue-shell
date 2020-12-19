const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    context: path.resolve(__dirname, '../'),
    mode: 'development',
    entry: './src/main.js',//context生效
    output: {
        filename: './js/[name].[hash].js',//生成的js文件名；//context生效
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                /*将js文件转码成es5*/
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            // {
            //     test: /\.(html)$/,
            //     exclude: path.resolve(__dirname, '../public/index.html'),
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: [':data-src', 'img:src']
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            favicon: './public/favicon.ico',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    }
}

