const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWebpackPlugin = require('./plugin/MinaWebpackPlugin')
const HellowPlugin = require('./plugin/HellowPlugin')
const WxRuntimePlugin = require('./plugin/WxRuntimePlugin');


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
  resolve: {
    extensions: ['.ts', '.js']//TODO: 
  },
  module: {
    rules: [
        {
            test:/\.js*/,
            include: [resolve('src'), resolve('test')],
            use: 'babel-loader'
        },
        // ts文件的loader
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader'
        },
        // {
        //   test: /\.tsx?$/, 
        //   exclude: /node_modules/,
        //   use: [
        //     'babel-loader',
        //     {
        //       // loader: 'ts-loader',
        //       loader: 'awesome-typescript-loader',
        //       options: {
        //         // errorsAsWarnings: true,
        //         useCache: true,
        //       }
        //     }
        //   ]
        // },
        {
          test: /\.(sc|c|wx)ss$/,
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
      verbose: true,
      dry: true,
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['dist']
    }),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './',
        ignore: ['**/*.js','**/*.scss','**/*.ts']
      },
    ]),
    new MinaWebpackPlugin({
        scriptExtensions: ['.js', '.ts'],
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



/**
 * TODO: 1打包环境压缩  dev pro
 * 
 * 
 * 2.oos
 *  
 * */