module.exports = {

	assets: {
		'/': './src/index.html',
		'/lib/site.css': './lib/site.css',
		'/lib/jquery/jquery.js': './node_modules/jquery/dist/jquery.js',
		'/lib/bootstrap/css/bootstrap.css': './node_modules/bootstrap/dist/css/bootstrap.css',
		'/lib/bootstrap/css/bootstrap-theme.css': './node_modules/bootstrap/dist/css/bootstrap-theme.css',
		'/lib/bootstrap/fonts/glyphicons-halflings-regular.eot': './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
		'/lib/bootstrap/fonts/glyphicons-halflings-regular.svg': './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
		'/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf': './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
		'/lib/bootstrap/fonts/glyphicons-halflings-regular.woff': './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
		'/lib/bootstrap/fonts/glyphicons-halflings-regular.woff2': './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
		'/lib/bootstrap/js/bootstrap.js': './node_modules/bootstrap/dist/js/bootstrap.js',
		'/lib/react': './node_modules/react/dist/react.js',
		'/lib/react-dom': './node_modules/react-dom/dist/react-dom.js',

		'/lib/components': { 
			browserify: [
				'classnames',
				{
					'./lib/components/Home/Incrementor.js': { run: false, expose: 'components/Home/Incrementor' }
				}
			]
		},

		'/lib/utils': { 
			browserify: [
				{
					'./src/utils/TestUtil.js': { run: false, expose: 'utils/TestUtil' }
				}
			]
		}
	}
}