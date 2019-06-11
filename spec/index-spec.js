var env = require('../index.js');

describe('env-wrapper', function() {

	beforeEach(function() {
		expect(process.env.TEST_VARIABLE_PRESENT).toBe(undefined)
		expect(process.env.TEST_VARIABLE_NOT_PRESENT).toBe(undefined)
	})

	afterEach(function() {
		delete process.env.TEST_VARIABLE_PRESENT
		delete process.env.TEST_VARIABLE_NOT_PRESENT
	})

	describe('#load', function() {
		it('should load properties from a file', function(done) {
			env.load('./spec/test.env')
				.then(() => {
					expect(process.env.TEST_PROPERTY_ONE).toEqual('1')
					done()
				})
				.catch(err => {
					done(err)
				})
		})
		it('should not throw an error if the file does not exist', function(done) {
			env.load('doesnt-exist.env')
				.then(() => {
					done()
				})
				.catch(err => {
					done(err)
				})
		})
	})

	describe('#require', function() {
		it('should retrieve a known variable', function() {
			process.env.TEST_VARIABLE_PRESENT = 'xyz'
			expect(env.require('TEST_VARIABLE_PRESENT')).toEqual('xyz')
		})
		it('should retrieve a defaulted variable', function() {
			expect(env.require('TEST_VARIABLE_NOT_PRESENT', 'xyz')).toEqual('xyz')
		})
		it('should fail on an unknown variable with no default ', function() {
			expect(() => { env.require('TEST_VARIABLE_NOT_PRESENT') }).toThrow()
		});
	});

	describe('#get', function() {
		it('should get a known variable', function() {
			process.env.TEST_VARIABLE_PRESENT = 'xyz'
			expect(env.get('TEST_VARIABLE_PRESENT')).toEqual('xyz')
		})

		it('should get a defaulted variable', function() {
			env.require('TEST_VARIABLE_PRESENT', 'default-xyz')
			expect(env.get('TEST_VARIABLE_PRESENT')).toEqual('default-xyz')
		})

		it('should get an unknown variable', function() {
			expect(env.get('TEST_VARIABLE_PRESENT')).toBe(undefined)
		})
	})

});
