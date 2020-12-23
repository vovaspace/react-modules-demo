const path = require('path');

const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
  build: path.join(__dirname, 'build'),
  src: 'src',
  static: 'static',
  resources: 'resources',
};

const PORT = 3000;

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  entry: `./${PATH.src}/index.tsx`,

  output: {
    path: PATH.build,
    filename: `${PATH.static}/scripts/bundle.[contenthash].js`,
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@core': path.join(__dirname, PATH.src, 'core'),
      '@modules': path.join(__dirname, PATH.src, 'modules'),
    },
  },

  devtool: development ? 'inline-source-map' : false,

  optimization: {
    minimize: !development,
  },

  module: {
    rules: [
      /* SCRIPTS */
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `./${PATH.src}/index.html`,
    }),
    new DefinePlugin({
      IS_DEVELOPMENT: development,
    }),
  ],

  devServer: {
    contentBase: PATH.build,
    compress: true,
    port: PORT,
  },
});