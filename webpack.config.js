var path = require('path');

module.exports = {
	mode: 'production',
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'app.js'
	},
	module: {
		// configuration regarding modules
		rules: [
		// rules for modules (configure loaders, parser options, etc.)
			{
				test: /\.js$/, 
				exclude: (/node_modules/),
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'] 
						}
					}
				]
			}
		]
	},
	resolve: {
		// options for resolving module requests
    // (does not apply to resolving to loaders)
		modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
		extensions: ['.js', '.json'],
		alias: {
			Root: path.resolve(__dirname, './src')
		}
	},
	devServer: {
		historyApiFallback: {
			index: 'index.html'
		}
	}
};

//for a proper build into the public directory use `npx webpack`
// node: { fs: 'empty' },