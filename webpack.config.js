var webpack = require("webpack");

module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname,
        filename: "public/scripts/index.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        {
          test: /\.css$/,
          loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        }
      ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'})
    ],
    publicPath: '/public/',
    proxy: {
        '/api/*': {
            target: 'http://localhost:4000',
            forward: '/api/comments',
            secure: false
        }
    },
    devtool: "#inline-source-map"
};
