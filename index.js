const fs = require('fs')
const readline = require('readline')

module.exports = {
	load: (fname = '.env') => {
		return new Promise((resolve, reject) => {
			fs.access(fname, fs.constants.R_OK, err => {
				if(err) {
					resolve()
				}
				else {
					try {
						readline.createInterface({
							input: fs.createReadStream(fname), 
							console: false, 
							crlfDelay: Infinity
						})
						.on('line', line => {
							if(line.includes('=')) {
								const [ key, value ] = line.split('=')
								process.env[key.trim()] = value.trim()
							}
						})
						.on('close', () => {
							resolve()
						})
					}
					catch(err) {
						reject(err)
					}
				}
			})
		})
	},

	require: (key, defaultValue) => {
		if(process.env[key] === undefined) {
			if(defaultValue === undefined) {
				throw new Error(`The environment variable "${key}" is not defined, and no default value is available`)
			}
			else {
				process.env[key] = defaultValue
			}
		}
		
		return process.env[key]
	},

	get: key => {
		return process.env[key]
	},

	set: (key, value) => {
		process.env[key] = value
	}
};
