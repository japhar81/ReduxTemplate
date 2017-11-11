'use strict';

const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const noop = require('noop-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';
const isTest = process.env.NODE_ENV === 'test';
const happyPackThreadPool = HappyPack.ThreadPool({size: require('os').cpus().length - 1});

const config = {
    target: 'node',
    devtool: isDev ? 'source-map' : 'nosources-source-map',
    entry: isDev ? ['webpack/hot/poll?1000', './src/server/index.ts'] : ['./src/server/index.ts'],
    externals: [nodeExternals({whitelist: [/^webpack\/hot/]})],
    output: {filename: 'server.bundle.js', path: path.resolve(__dirname, '..', 'dist')},
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
        new ForkTsCheckerWebpackPlugin({
            tsconfig: './src/tsconfig.json',
            tslint: './src/tslint.json'
        }),
        isDev ? new WebpackShellPlugin({onBuildEnd: ['node dist/server.bundle.js']}) : noop(),
        isDev ? new webpack.HotModuleReplacementPlugin() : noop(),
        new HappyPack({
            id: 'tsx',
            threadPool: happyPackThreadPool,
            loaders: [{
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    happyPackMode: true,
                    configFile: 'src/tsconfig.json'
                }
            }]
        })
    ]
};

module.exports = config;