const webpackConfig = require('../webpack.config')
const path = require('path')

module.exports = {
	stories: ['../stories/**/*.stories.(js|mdx)'],
	addons: [
		{
			name: '@storybook/preset-typescript',
			options: {
				tsLoaderOptions: {
					configFile: path.resolve(__dirname, '../tsconfig.json'),
				},
				tsDocgenLoaderOptions: {
					tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
					shouldExtractLiteralValuesFromEnum: true,
				},
				include: [path.resolve(__dirname, '../src')],
			},
		},
		'@storybook/addon-a11y/register',
		'@storybook/addon-actions/register',
		'@storybook/addon-links/register',
		'storybook-addon-styled-component-theme/dist/register',
		'storybook-addon-jsx/register',
		'@storybook/addon-viewport/register',
		'storybook-addon-react-docgen/register',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
	],
	webpackFinal: async config => {
		config.resolve.extensions = Array.from(
			new Set([...config.resolve.extensions, ...webpackConfig.resolve.extensions])
		)
		config.resolve.modules = Array.from(new Set([...config.resolve.modules, ...webpackConfig.resolve.modules]))

		config.module.rules = [
			{
				test: /\.md$/,
				use: ['babel-loader', '@mdx-js/loader'],
			},
			...config.module.rules.filter(rule => rule.test.source !== '\\.md$'),
		]

		return config
	},
}
