const path = require('path');

const FilemanagerWebpackPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'main.[contenthash].js',
		path: path.resolve(__dirname, 'app/'),
		assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
		}),
		new FilemanagerWebpackPlugin({
			events: {
				onStart: {
					delete: ['app'],
				},
			},
		}),
	],
	devServer: {
		static: path.resolve(__dirname, 'app'),
	},
};
