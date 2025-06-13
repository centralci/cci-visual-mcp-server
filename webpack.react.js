const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge').merge;

const devServer = {
  static: path.join(__dirname, 'dist/renderer.js'),
  compress: true,
  port: 9000
}

const config = {
  devtool: 'source-map',
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      }
    ]
  }
};

module.exports = [
  merge(config, {
    entry: {
      preload: path.resolve(__dirname, 'src/preload.ts') },
      target: 'web'
    }
  ),
  merge(config, {
    devServer,
    entry: { 
      main: path.resolve(__dirname, 'src/renderer.tsx') },
      target: 'web'
    }
  ),
]