import env from '../index.js'

describe('env-wrapper', () => {

  beforeEach(() => {
    expect(process.env.TEST_VARIABLE_PRESENT).toBe(undefined)
    expect(process.env.TEST_VARIABLE_NOT_PRESENT).toBe(undefined)
  })

  afterEach(() => {
    delete process.env.TEST_VARIABLE_PRESENT
    delete process.env.TEST_VARIABLE_NOT_PRESENT
  })

  describe('#load', () => {
    it('should load properties from a file', async () => {
      await env.load('./spec/test.env')
      expect(process.env.TEST_PROPERTY_ONE).toEqual('1')
    })
    it('should not throw an error if the file does not exist', async () => {
      await env.load('doesnt-exist.env')
    })
    it('should parse entries with embedded identifiers', async () => {
      await env.load('./spec/test.env')
      expect(process.env.TEST_PROPERTY_EMBEDDED).toEqual('this=has=embedded=identifiers')
    })
  })

  describe('#require', () => {
    it('should retrieve a known variable', () => {
      process.env.TEST_VARIABLE_PRESENT = 'xyz'
      expect(env.require('TEST_VARIABLE_PRESENT')).toEqual('xyz')
    })
    it('should retrieve a defaulted variable', () => {
      expect(env.require('TEST_VARIABLE_NOT_PRESENT', 'xyz')).toEqual('xyz')
    })
    it('should fail on an unknown variable with no default ', () => {
      expect(() => { env.require('TEST_VARIABLE_NOT_PRESENT') }).toThrow()
    })
  })

  describe('#get', () => {
    it('should get a known variable', () => {
      process.env.TEST_VARIABLE_PRESENT = 'xyz'
      expect(env.get('TEST_VARIABLE_PRESENT')).toEqual('xyz')
    })

    it('should get a defaulted variable', () => {
      env.require('TEST_VARIABLE_PRESENT', 'default-xyz')
      expect(env.get('TEST_VARIABLE_PRESENT')).toEqual('default-xyz')
    })

    it('should get an unknown variable', () => {
      expect(env.get('TEST_VARIABLE_PRESENT')).toBe(undefined)
    })
  })

})
