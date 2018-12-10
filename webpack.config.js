const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '.build/client'),
    publicPath: 'assets/'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/client/public',
        to: 'public'
      }
    ], { debug: 'info' })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: {
          extensions: ['.js', '.jsx', '.json']
        },
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env', 'react'],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
              'transform-runtime',
              'transform-async-to-generator'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          { loader: 'css-loader', options: { importLoaders: 1 } }, // translates CSS into CommonJS
          'postcss-loader' // post CSS transform
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  devServer: {
    port: 9090
  }
};
