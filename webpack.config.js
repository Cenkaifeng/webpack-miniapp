const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWebpackPlugin = require('./build/plugin/MinaWebpackPlugin')
const HellowPlugin = require('./build/plugin/HellowPlugin')
const WxRuntimePlugin = require('./build/plugin/WxRuntimePlugin');


const webpack = require('webpack');
const debuggable = process.env.BUILD_TYPE !== 'release'

module.exports = {
  context: resolve('src'),
  entry: './app.js',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    globalObject: 'wx',//TODO: 后续根据项目环境置换为qq小程序全局对象
  },

  module: {
    rules: [
        {
            test:/\.js*/,
            use: 'babel-loader'
        },
        {
          test: /\.(scss)$/,
          include: /src/,
          use: [
            {
              loader: 'file-loader',
              options: {
                useRelativePath: true,
                name: '[path][name].wxss',
                context: resolve('src'),
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [resolve('src', 'styles'), resolve('src')],
              },
            },
          ],
        },

    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',
      BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || 'debug',
    }),

    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['dist']
    }),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './',
        ignore: ['**/*.js','**/*.scss']
      },
    ]),
    new MinaWebpackPlugin({
        scriptExtensions: ['.js'],
        assetExtensions: ['.scss'],
    }),
    new WxRuntimePlugin(),
    new HellowPlugin()
  ],  
  optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'common',
        minChunks: 2,
        minSize: 0,
      },
      runtimeChunk: {//单独生成runtime.js 缩小体积
          name: 'runtime',
      }
  },
  mode: debuggable ? 'none' : 'production',
  devtool: debuggable ? 'inline-source-map' : 'source-map'
}
