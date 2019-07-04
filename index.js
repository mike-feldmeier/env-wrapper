const fs = require('fs')
const path = require('path')

module.exports = {
  load: (fname = '.env') => {
    try {
      const effectiveFilename = path.join(process.cwd(), fname)
      const data = fs.readFileSync(effectiveFilename, 'utf8')

      data.split('\n').forEach(line => {
        if (line.includes('=')) {
          const [key, value] = line.split('=')
          process.env[key.trim()] = value.trim()
        }
      })
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err
      }
    }
  },

  require: (key, defaultValue) => {
    if (process.env[key] === undefined) {
      if (defaultValue === undefined) {
        throw new Error(`The environment variable "${key}" is not defined, and no default value is available`)
      } else {
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
}
