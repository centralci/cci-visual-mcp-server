const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = {
  // Electron Entrypoint
  entry: './src/main.ts',
  target: 'electron-main',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
      ],
    }),
  ],
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      include: /src/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader'
      }
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  }
}

module.exports = [
  config
]
