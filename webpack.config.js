const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'production',
    target: ['web', 'es5'],
    entry: [`${SRC_DIR}/index.js`],
    output: {
        path: BUILD_DIR,
        filename: 'index.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                }
            }),
        ],
        concatenateModules: true,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader'],
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
        fallback: {
            "url": require.resolve("url/"),
        },
    }
};
