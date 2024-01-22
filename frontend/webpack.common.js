const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|webp)$/,
        type: 'asset',
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      apis: path.resolve(__dirname, 'src/apis/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      mocks: path.resolve(__dirname, 'src/mocks/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      type: path.resolve(__dirname, 'src/type/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-report.json',
    }),
    new webpack.DefinePlugin({
      PRODUCT_ENV: JSON.stringify(process.env.NODE_ENV),
      MOCKING_ENV: JSON.stringify(process.env.MOCKING_ENV),
    }),
  ],
};
