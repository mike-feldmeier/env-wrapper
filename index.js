import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const DEFAULT_OPTIONS = { debug: false }

const isComment = (line = '') => line.trim().startsWith('#')

const load = async (fname = '.env', options = {}) => {
  if(typeof fname === 'object') {
    options = fname
    fname = '.env'
  }

  options = Object.assign({}, DEFAULT_OPTIONS, options)

  const effectiveFilename = resolve(process.cwd(), fname)

  try {
    if(options.debug) {
      console.log(`env-wrapper: loading env file...`)
    }

    const data = await readFile(effectiveFilename, 'utf8')

    data.split('\n').forEach(line => {
      if (line.includes('=') && !isComment(line)) {
        const [key, ...values] = line.split('=')
        const privateKey = key.trim().endsWith('*')
        const setKey = privateKey ? key.trim().slice(0, -1) : key.trim()
        const setValue = values.join('=').trim()
        process.env[setKey] = setValue

        if(options.debug) {
          console.log(`env-wrapper: added env variable "${setKey}" as "${privateKey ? '(private)' : setValue}"`)
        }
      }
    })
  }
  catch (err) {
    if(err.code === 'ENOENT') {
      if(options.debug) {
        console.log(`env-wrapper: no environment file found ("${effectiveFilename}")`)
      }
    }
    else {
      throw err
    }
  }
}

const require = (key, defaultValue) => {
  if (process.env[key] === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`The environment variable "${key}" is not defined, and no default value is available`)
    }
    else {
      process.env[key] = defaultValue
    }
  }

  return process.env[key]
}

const get = (key) => process.env[key]

const set = (key, value) => process.env[key] = value

export default { load, require, get, set }
