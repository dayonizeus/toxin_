const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  	entry: {
      index: './src/index.js',
      // landing: './src/pages/landing.js'
  },
  	devServer: {
      // index: 'landing.html',
      stats: 'errors-only',
  		contentBase: './dist'
  	},
  	plugins: [
  		new CleanWebpackPlugin(),
  		new HtmlWebpackPlugin({
  			template: './src/pug/index.pug',
        filename: 'index.html'
  		}),
      // new HtmlWebpackPlugin({
      //   template: './src/pages/landing.pug',
      //   filename: 'landing.html'
      // }),
  		new MiniCssExtractPlugin()
  	],
  	output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  	},
  	module: {
  		rules: [
  			{
  				test: /\.scss$/,
  				use: [
  					//Создает файл со стилями в dist
  					MiniCssExtractPlugin.loader,
  					//Компилирует CSS в JS 
  					'css-loader',
  					//Компилирует SCSS в CSS
  					'sass-loader',
  					//Позволяет использовать конструкцию типа @import './**/*.scss';
  					'import-glob-loader'
  					]
  			},
  			{
  				test: /\.pug$/,
  				loader: {
  					loader: 'pug-loader',
  					options: {
  						pretty: true
  					}
  				}
  			},
  			{
  				test: /\.(woff|woff2|ttf|svg)$/,
  				loader: ['file-loader']
  			},
        {
          test: /\.png$/,
          use: ['file-loader']
        }
  		]
  	}

};