const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './client.js',
    output: {
        filename: 'public/bundle.js'
    },
    devtool: "source-map",
    resolve: {
        alias: {
            'react': path.resolve(path.join(__dirname, 'node_modules', 'react')),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", __dirname + "/node_modules/babel-preset-react"]
                    }
                }
            }
        ]
    }
};
