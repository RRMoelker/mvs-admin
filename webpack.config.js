const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const PROJECT_DIR = __dirname;
const SRC_DIR = path.resolve(PROJECT_DIR, 'src');
const BUILD_DIR = path.resolve(PROJECT_DIR, 'dist');

module.exports = {
    // context: PROJECT_DIR,
    entry: SRC_DIR + "/index.js",
    output: {
        path: BUILD_DIR,
        filename: "bundle.js"
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(SRC_DIR, 'index.html'),
                to: BUILD_DIR
            },
            {
                from: path.resolve(SRC_DIR, 'assets'),
                to: path.resolve(BUILD_DIR, 'assets')
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
    devtool: 'source-map',
    devServer: {
        port: 8080
    }
};
