
var webpack = require("webpack");
var config  = require("./base.config.js");

config.devtool = "cheap-module-eval-source-map";
config.entry.push("webpack/hot/only-dev-server");

config.plugins.unshift(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("development"),
    },
}));

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
