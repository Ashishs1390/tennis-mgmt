const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path') 

module.exports = {
    entry: ['babel-polyfill','./src/client/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" }
            },
            {
                test:  /\.html$/,
                use: { loader: "html-loader" }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader',"sass-loader"],
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './resources/imgs',
                            name: '[name].[ext]'
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
        })
    ],
    devServer: {
       historyApiFallback: true,
       port: 3000,
       open: true,
       hot:true,
       proxy:{
           '/api':'http://localhost:8000/'
       },
       
    }
}

