var util = require("util");
module.exports = {
	require: function(key, defaultValue) {
		if(process.env[key] === undefined) {
			if(defaultValue === undefined) {
				throw new Error(util.format('The environment variable "%s" is not defined, and no default value is available', key));
			}
			else {
				process.env[key] = defaultValue;
			}
		}
		
		return process.env[key];
	},

	get: function(key) {
		return process.env[key];
	},

	set: function(key, value) {
		process.env[key] = value;
	}
};
