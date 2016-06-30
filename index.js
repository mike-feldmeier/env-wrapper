module.exports = {
	require: function(key, defaultValue) {
		if(process.env[key] === undefined) {
			if(defaultValue === undefined) {
				throw new Error('The environment variable "%s" is not defined, and no default value is available', key);
			}
			else {
				process.env[key] = defaultValue;
			}
		}
	},

	get: function(key) {
		return process.env[key];
	},

	set: function(key, value) {
		process.env[key] = value;
	}
};
