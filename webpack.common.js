const path = require('path');

module.exports = {
	entry: {
		Review: {
			import: path.resolve(__dirname, 'index.js'),
			dependOn: ['Course', 'Users', 'Site']
		}
	}
}
