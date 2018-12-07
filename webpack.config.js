const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


const config = {

  entry: {
    app: './assets/js/app.js',
    vendor: './assets/js/vendor.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "js/")
  },

  devtool: 'source-map',

  module: {
  	rules: [
  		{
  			test: /\.js$/,
  			exclude: /node_modules/,
  			use: {
				  loader: "babel-loader",
				  options: {
				    presets: ['env']
				  }
				}
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img'
        }
      },
  		{
        test: /\.(scss)$/,
			  use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ]
			  
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../webfonts/',
              publicPath: '../webfonts/'
            }
          }
        ]
      }
  	]
  },

  plugins: [
	  new MiniCssExtractPlugin({
      filename: '../css/[name].css'
    }),
    new BrowserSyncPlugin({
      port: 3000,
      proxy: 'http://cortina2021.test'
    }),

	]

}

module.exports = config;