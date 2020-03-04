const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		library: '',
		libraryTarget: 'commonjs',
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
		'styled-components': 'styled-components',
		'xstyled/styled-components': '@xstyled/styled-components',
		'xstyled/system': '@xstyled/system',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('ts-loader'),
					},
					{
						loader: require.resolve('react-docgen-typescript-loader'),
					},
				],
			},
		],
	},

	plugins: [
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true,
			allowAsyncCycles: false,
			cwd: process.cwd(),
		}),
	],
	mode: process.env.NODE_ENV || 'development',
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},
}
