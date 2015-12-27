
var path              = require("path");
var webpack           = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var output            = path.join(__dirname, "../build");

module.exports = {
    context: path.resolve(__dirname, ".."),
    resolve: {
        modulesDirectories: ["node_modules", "components", "flux"],
        extensions: ["", ".js", ".jsx"]
    },
    entry: [
        "./app/main.js"
    ],
    output: {
        path: output,
        filename: "bundle.js",
    },
    progress: true,
    module: {
        loaders: [{
            test: /\.js.*$/,
            loader: "babel?optional[]=runtime&stage=0",
            exclude: /node_modules/
        }, {
            test: /\.(png|svg)$/,
            loaders: ["url-loader?limit=100000&mimetype=image/png"],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!cssnext-loader")
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            dropDebugger: true,
            dropConsole: true,
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../index.html"),
            inject: "body",
            hash: true,
        }),
        new ExtractTextPlugin("bundle.css"),
    ],
    cssnext: {
        import: {
            path: [""]
        },
        features: {
        }
    }
};
