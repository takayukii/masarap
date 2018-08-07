import path = require('path');
import * as webpack from 'webpack';

const platform = process.env.PLATFORM || 'web';
const isDev = process.env.NODE_ENV === 'development';
const isTest = platform === 'tests';

const getConfig = require('./buildconfig.js');
const config = getConfig(platform, isDev);

const webpackConfig: webpack.Configuration = {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/web'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        modules: [path.resolve('.'), path.resolve('./node_modules')],

        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: config.bundling.aliases
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
        ]
    }
};

export default webpackConfig;
