const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const CompressionPlugin = require("compression-webpack-plugin");//gzip
const pathResolve = (dir) => path.join(__dirname, '..', dir)
const config = {
    context: pathResolve(''),
    entry: pathResolve('src/main.js'),//context生效
    output: {
        path: pathResolve('dist'),
        // filename: './js/[name].[hash].js',//生成的js文件名；
        filename: './js/[name].js',//生成的js文件名；
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                include: pathResolve('src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [[
                                '@babel/preset-env', {
                                    useBuiltIns: 'usage', //不能是“entry”
                                    corejs: 3
                                }
                            ], '@vue/babel-preset-jsx'],
                        }

                    }
                ]
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
                            esModule: false,
                            name: 'img/[name]_[hash:8].[ext]'
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
            template: pathResolve('public/index.html'),
            filename: 'index.html',
            favicon: pathResolve('public/favicon.ico'),
        }),

    ],
    resolve: {
        alias: {
            '@': pathResolve('/src'),
            vue$: 'vue/dist/vue.runtime.esm.js',
            '@img': pathResolve('/src/assets/img'),
        },
        mainFiles: ['index.js', 'index.vue'],//解析目录时要使用的文件名
        mainFields: ['main'],
        extensions: ['.js', '.vue', '.json'],//自动解析确定的扩展
        modules: [pathResolve('node_modules')]//指明第三方模块的存放位置
    },
    // externals: {
    //     'vue': 'Vue',
    //     'vue-router': 'VueRouter',
    //     'vuex': 'Vuex',
    //     'axios': 'axios'
    // }
    // target: 'electron-renderer'
}

module.exports = config
