const {merge} = require('webpack-merge')
const devWebpackConfig = require('./webpack.dev.config')
const path = require('path')

module.exports = merge(devWebpackConfig, {
    target: 'electron-main',
})
