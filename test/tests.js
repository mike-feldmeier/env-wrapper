var assert = require('chai').assert;
var env = require('../index.js');

describe('env-wrapper', function() {
	beforeEach(function(done) {
		assert.isUndefined(process.env.TEST_VARIABLE_PRESENT);
		assert.isUndefined(process.env.TEST_VARIABLE_NOT_PRESENT);
		done();
	});

	afterEach(function(done) {
		delete process.env.TEST_VARIABLE_PRESENT;
		delete process.env.TEST_VARIABLE_NOT_PRESENT;
		done();
	});

	describe('#get', function() {
		it('should get a known variable', function() {
			process.env.TEST_VARIABLE_PRESENT = 'xyz';
			assert.equal(env.get('TEST_VARIABLE_PRESENT'), 'xyz');
		});

		it('should get a defaulted variable', function() {
			env.require('TEST_VARIABLE_PRESENT', 'default-xyz');
			assert.equal(env.get('TEST_VARIABLE_PRESENT'), 'default-xyz');
		});

		it('should get an unknown variable', function() {
			assert.isUndefined(env.get('TEST_VARIABLE_PRESENT'));
		});
	});

	describe('#require', function() {
		it('should fail on an unknown variable with no default ', function() {
			assert.throws(function() { env.require('TEST_VARIABLE_NOT_PRESENT'); }, 'The environment variable "TEST_VARIABLE_NOT_PRESENT" is not defined, and no default value is available');
		});

		it('should not fail on an unknown variable with a default ', function() {
			assert.doesNotThrow(function() { env.require('TEST_VARIABLE_PRESENT', 'default-xyz'); });
		});
	});

});
