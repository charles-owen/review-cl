const path = require('path');

module.exports = {
	entry: {
		Review: {
			import: path.resolve(__dirname, 'index.js'),
			dependOn: ['Course', 'Users', 'Site']
		},
		ReviewConsole: {
			import: path.resolve(__dirname, 'js/Console/index.js'),
			dependOn: ['Console', 'Course', 'Users', 'Site']
		}
	}
}
