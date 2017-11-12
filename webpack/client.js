/* tslint:disable */
'use strict';

const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const noop = require('noop-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';
const isTest = process.env.NODE_ENV === 'test';
const happyPackThreadPool = HappyPack.ThreadPool({size: require('os').cpus().length - 1});

const config = {
    target: 'web',
    devtool: isDev ? 'source-map' : 'nosources-source-map',
    entry: isDev ?
        ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/client/index.tsx'] :
        ['./src/client/index.tsx'],
    output: {
        filename: 'client.bundle.js',
        publicPath: '/static/',
        path: path.resolve(__dirname, '..', 'dist/static')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['happypack/loader?id=tsx']
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        isDev ? new webpack.HotModuleReplacementPlugin() : noop(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HappyPack({
            id: 'tsx',
            threadPool: happyPackThreadPool,
            loaders: [{
                loader: 'react-hot-loader/webpack'
            }, {
                loader: 'ts-loader',
                options: {
                    happyPackMode: true,
                    configFile: 'src/tsconfig.json'
                }
            }]
        })
    ]
};

module.exports = config;