const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  	entry: {
      index: './src/index.js',
  },
  	devServer: {
      // index: 'html/index.html',
      // index: 'html/landing.html',
      // index: 'html/search-room.html',
      // index: 'html/room-details.html',
      // index: 'html/access.html',
      index: 'UI-kit/form-elements.html',
      // index: 'UI-kit/cards.html',
      // index: 'UI-kit/headers-footers.html',
      stats: 'errors-only',
  		contentBase: path.resolve(__dirname, 'dist')
  	},
  	plugins: [
  		new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/pages/landing/landing.pug',
        filename: 'html/landing.html'
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/search-room/search-room.pug',
        filename: 'html/search-room.html'
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/room-details/room-details.pug',
        filename: 'html/room-details.html'
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/access/access.pug',
        filename: 'html/access.html'
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/UI-kit/form-elements.pug',
        filename: 'UI-kit/form-elements.html'
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/UI-kit/cards.pug',
        filename: 'UI-kit/cards.html'
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/UI-kit/headers-footers.pug',
        filename: 'UI-kit/headers-footers.html'
      }),
  		new MiniCssExtractPlugin({
        filename: 'style.css'
      })
  	],
  	output: {
    filename: 'script.js',
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
  				}
  			},
  			{
  				test: /\.(woff|woff2|ttf|svg)$/,
  				loader: [{
            loader: 'file-loader',
            options: {
              outputPath: 'assets'
            }
          }]
  			},
        {
          test: /\.(png)$/,
          loader: [{
            loader: 'file-loader',
            options: {
              outputPath: 'assets'
            }
          }]
        }
  		]
  	}

};