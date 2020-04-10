//const path = require("path");
//const webpack = require("webpack");
//const { VueLoaderPlugin } = require('vue-loader')
//
//module.exports = {
//    mode : 'development',
//    devtool : 'source-map',
//    watch : true,
//    entry : './index.js',
//    output : {
//        path : path.resolve("src/assets/js/"),
//        filename : 'bundle.js'
//    },
//    module: {   
//        rules: [
//            {
//                test: /\.css$/,
//                use: [
//                'style-loader',
//                'css-loader',
//                ],
//            },{
//                test: /\.(png|svg|jpg|gif)$/,
//                use: [
//                'file-loader',
//                ],
//            },{
//                test: /\.vue$/,
//                use: [
//                'vue-loader'
//                ],
//            },
//        ],
//    },
//    
//         
//    plugins: [
//        new webpack.ProvidePlugin({
//            $: "jquery",
//            jQuery: "jquery"
//        }),
//        new VueLoaderPlugin()
//    ]
//};

const path = require("path");
const webpack = require("webpack");
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('vue-html-webpack-plugin');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode : 'development',
    devtool : 'source-map',
    watch : true,
    entry : './src/main.js',
    //output : {
    //    path : path.resolve("./src/dist"),
    //    filename : 'bundle.js'
    //},
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {   
        rules: [
            {
                test: /\.css$/,
                use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                      plugins: (loader) => [
                        // Add the plugin
                        new IconfontWebpackPlugin(loader)
                      ]
                    }
                  }
                ],
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                'file-loader',
                ],
            },{
                test: /\.vue$/,
                use: [
                'vue-loader'
                ],
            },{
                test: /\.html$/,
                use : [
                    'html-loader'
                ]
                
              },{
                test: /\.(eot|svg|ttf|woff|woff2)(\??\#?v=[.0-9]+)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]',
            }
        ],
    },
    
         
    plugins: [
        new HtmlWebpackPlugin({
            template : './src/index.html'
          }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new VueLoaderPlugin()
    ]
};