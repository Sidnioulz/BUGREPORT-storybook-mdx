module.exports = function(api) {
	api.cache(true)

	return {
		presets: ['@babel/preset-env', '@babel/preset-react'],
		plugins: ['@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-class-properties'],
		env: {
			production: {
				plugins: [['react-remove-properties', { properties: ['data-testid'] }]],
			},
		},
	}
}
