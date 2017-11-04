var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                loaders: [ 
                  'style-loader', 
                  'css-loader',
                  'sass-loader', 
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: (() => {
      let prodArr = []
      if (process.argv.indexOf('-p') !== -1) {
        prodArr = [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production'),
            },
          }),
          new webpack.optimize.UglifyJsPlugin({
            output: {
              comments: false,
            },
          }),
        ];
      }
      return ([
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
      ]).concat(prodArr)

    })()
}