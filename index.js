import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const load = async (fname = '.env') => {
  try {
    const effectiveFilename = join(process.cwd(), fname)
    const data = await readFile(effectiveFilename, 'utf8')

    data.split('\n').forEach(line => {
      if (line.includes('=')) {
        const [key, ...values] = line.split('=')
        process.env[key.trim()] = values.join('=').trim()
      }
    })
  }
  catch (err) {
    if (err.code !== 'ENOENT') {
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
