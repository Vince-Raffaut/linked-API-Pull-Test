const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',  
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    // path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        // this will apply to both plain .js files
        // AND <script> blocks in vue files
        {
            enforce: 'pre',
            test: /\.(js|vue)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        },
        {
            test: /\.js$/,
            loader: 'babel-loader'
        },
        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        {
            test: /\.css$/,
            use: [
            'vue-style-loader',
            'css-loader'
            ]
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
                'postcss-loader'
            ],
        }
    ],
  },
  plugins: [
    
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html'
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    liveReload: true,
    index: 'index.html',  
    https: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization, X-RestLi-Protocol-Version:2.0.0"
    }
  }
};