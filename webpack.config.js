/** 

	./webpack.config.js

**/

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve('docs'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /(\.css$)/, loaders: ['style-loader', 'css-loader'] }, { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/  }
		]
	},
	plugins: [HtmlWebpackPluginConfig]
}