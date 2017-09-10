const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const PROJECT_DIR = __dirname;
const SRC_DIR = path.resolve(PROJECT_DIR, 'src');
const BUILD_DIR = path.resolve(PROJECT_DIR, 'dist');
const NODE_MODULES = path.resolve(PROJECT_DIR, 'node_modules');

const components = glob.sync(SRC_DIR + '/components/**/*.container.js');

const entries = {};
components.forEach(src => {
    let name = src.replace(new RegExp('^' + SRC_DIR + '/'), '');
    name = name.replace(new RegExp('\.js$'), '');
    entries[name] = src;
});

entries.main = SRC_DIR + '/index.js';

module.exports = {
    entry: entries,
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
        new CopyWebpackPlugin([
            {
                from: path.resolve(SRC_DIR, 'index.html'),
                to: BUILD_DIR
            },
            {
                from: path.resolve(SRC_DIR, 'assets'),
                to: path.resolve(BUILD_DIR, 'assets')
            },
            {
                // Put the component HTML files next to the JS files
                context: SRC_DIR,
                from: { glob: SRC_DIR + '/components/**/*.html' },
                to: BUILD_DIR
            },
            {
                from: path.resolve(NODE_MODULES, '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
                to: BUILD_DIR
            },
            {
                from: path.resolve(NODE_MODULES, '@webcomponents/webcomponentsjs/webcomponents-lite.js'),
                to: BUILD_DIR
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    devtool: 'source-map-eval',
    devServer: {
        port: 8080
    }
};
