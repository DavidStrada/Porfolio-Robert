import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
// import CopyWebpackPlugin from 'copy-webpack-plugin'

module.exports = {
  entry: ['./src/index.js', './src/scss/main.sass'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/' // comment when using html-webpack-plugin
  },

  devtool: '#eval',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      // { // regular css files
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     loader: 'css-loader?importLoaders=1',
      //   }),
      // },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: (process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract(['css-loader?minimize=true', 'postcss-loader', 'sass-loader']) : ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'])
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: (process.env.NODE_ENV === 'production' ? [ 'file-loader?name=assets/[name].[ext]' ] : [ 'file-loader' ])
      }
      // {
      //   test: /\.woff2?$|\.ttf$|\.eot$/,
      //   loader: 'file-loader',
      //   query: {
      //     publicPath: 'fonts',
      //     outputPath: 'fonts',
      //     name: '[hash].[ext]',
      //   }
      // },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      //   exclude: /node_modules/
      // }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    inline: true,
    stats: 'errors-only'
  }
}

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src/index.html'),
    //   showErrors: true,
    // })
    new DashboardPlugin()
  ])
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourcemap: true,
      compress: {
        warnings: false
      }
    }),

    new ExtractTextPlugin({
      filename: '/css/styles.css',
      allChunks: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    })

    // new CopyWebpackPlugin([
    //   {
    //     from: 'src/*.html', to: '.'
    //   }
    // ])

  ])
}
