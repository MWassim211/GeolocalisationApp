const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode : 'development',
    devtool : 'source-map',
    watch : true,
    entry : './app.js',
    output : {
        path : path.resolve("./public/dist"),
        filename : 'bundle.js'
    },
    module: {   
        rules: [
            {
                test: /\.css$/,
                use: [
                'style-loader',
                'css-loader',
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
            }
        ],
    },
    
         
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new VueLoaderPlugin()
    ]
};