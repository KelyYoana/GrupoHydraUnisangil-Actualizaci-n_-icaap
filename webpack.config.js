//Para que el sistema busque a este archivo debemos pasarle el flag --config en el package.json
// Este archivo hace referencia al build:external del package json
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = {
    mode: 'development',
    // entry: ['babel-polyfill', path.resolve(__dirname, 'src/assets/js/babel.js')],
    entry: {
        bundle: path.resolve(__dirname, 'src/assets/js/bundle.js'),
        main: path.resolve(__dirname, 'src/assets/js/main.js'),
        pouchDB: path.resolve(__dirname, 'src/assets/js/pouchDb.js'),
        task: path.resolve(__dirname, 'src/assets/js/task.js'),
        ica: path.resolve(__dirname, 'src/assets/js/ica.js')
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js',
        publicPath: './dist/'
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                use: {
                    // se usa loader y options cuando se requiere una config especial
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

                //use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
}

module.exports = config;
