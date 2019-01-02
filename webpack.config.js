const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '')
}


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
  mode: 'none',

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
              name: 'webfonts/[name].[ext]',
              
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
      host: 'localhost',
      proxy: 'http://netinsurance.test',
      // server: { baseDir: ['./'] }
    }),

    new PurgecssPlugin({
      // paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
      paths: glob.sync(["./js/*", "./**/*.php"], {nodir: true}),
      only: ['vendor']
    }),

	]

}

module.exports = config;