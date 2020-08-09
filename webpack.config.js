const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const WebpackShellPlugin = require('webpack-shell-plugin');
// if (process.env.NODE_ENV !== 'production') {
//   config.plugins.push(new WebpackShellPlugin({onBuildEnd: ['nodemon build/server.js --watch build']}));
// }

module.exports = {
    entry: path.join(__dirname, "src", "app.js"),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true, // webpack@1.x
                  disable: true, // webpack@2.x and newer
                },
              },
            ],
          }
        ]
    },
    
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    }, 
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        })
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    }
};