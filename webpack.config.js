const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|mp3)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext][query]',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'img', to: 'img' }, // Копіює вміст папки img безпосередньо в dist
                { from: 'textures', to: 'textures' }, // Копіює вміст папки textures безпосередньо в dist
                { from: 'audio', to: 'audio' }, // Копіює вміст папки audio безпосередньо в dist
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    stats: {
        warnings: false,
    },
};

module.exports = config;
