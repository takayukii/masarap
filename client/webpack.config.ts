import path = require('path');
import * as webpack from 'webpack';

require('dotenv').config(__dirname + '/.env');

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
    },

    plugins: [
        // Replace flags in the code based on the build variables. This is similar to
        // the replaceFlags method in gulpfile.js. If you make a change here, reflect
        // the same change in the other location.
        new webpack.DefinePlugin({
            '__DEV__': isDev,
            '__TEST__': isTest,
            '__WEB__': true,
            '__ANDROID__': false,
            '__IOS__': false,
            '__WINDOWS__': false,
            '__MACOS__': false,
            '__API_ENDPOINT__': JSON.stringify(process.env.API_ENDPOINT)
        })
    ]
};

export default webpackConfig;
