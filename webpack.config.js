const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';
console.log('IS DEV: ', process.env.NODE_ENV);


module.exports = {
    entry: {
        // 'colors-type': './src/pug/pages/ui-kit/colors-type/colors-type.js',
        'form-elements': './src/pug/pages/ui-kit/form-elements/form-elements.js',
        // entry: ['@babel/polyfill', './src/index.js'],
    },

    output: {
        filename: '[name]/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // clean output directory before emit
    },

    devServer: {
        watchFiles: ['src/**/*.pug'], 
        // open: ['colors-type/colors-type.html', 'form-elements/form-elements.html'], //  --open /colors-type/colors-type.html
        open: ['form-elements/form-elements.html'], //  --open /colors-type/colors-type.html
    },

    devtool: isDev ? 'source-map' : false,
  
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/pug/pages/ui-kit/colors-type/colors-type.pug',
        //     filename: 'colors-type/colors-type.html',
        //     chunks: 'colors-type',
        // }),
        new HtmlWebpackPlugin({
            template: './src/pug/pages/ui-kit/form-elements/form-elements.pug',
            filename: 'form-elements/form-elements.html',
            chunks: 'form-elements',
        }),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader']
            },
            // стили
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            // изображения
            {
                test: /\.(png|jpg|svg|gif)$/i,
                type: 'asset/resource',
                exclude: path.resolve(__dirname, 'src/fonts'),
                generator: {
                    filename: 'img/[name].[contenthash][ext]'
                }
            },
            // шрифты
            {
                test: /\.(ttf|woff|svg)$/i,
                type: 'asset/resource',
                include: path.resolve(__dirname, 'src/fonts'),
                generator: {
                    filename: 'font/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.pug$/i,
                // use: ['pug-loader']
                use: {
                        loader: 'pug-loader',
                        options: {
                            basedir: path.resolve(__dirname, 'src/pug'),
                        }
                    }
            },
            // babel
            // {
            //     test: /\.js$/i,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },
        ]
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
};
