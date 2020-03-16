const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode : 'development',
    watch : true,
    entry : './index.js',
    output : {
        path : path.resolve("../server/public"),
        filename : 'main.js'
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
            },
        ],
    },
    
         
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};