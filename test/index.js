var should = require('chai').should();
var assert = require('chai').assert;
var colors = require('colors');
var apiKey = process.env.MOVIEDB_API_KEY || process.env.npm_config_key;
var api;

/**
 * checks for missing API key
 *
 * the proper way to run the test
 *
 * 		npm test --key='{your api key}'
 *
 * @param  {[type]} !apiKey ||            apiKey.length [description]
 * @return {[type]}         [description]
 */
if (!apiKey || apiKey.length === 0) {
	console.log('You have not provided the API key'.red);
	console.log('	Running tests:'.cyan);
	console.log('	npm test --key="{your api key}"'.cyan);
	throw new Error('Missing API key, please `run npm test --key="{your api key}"`');
}

api = require('../index.js')(apiKey);

describe('moviedb', function() {

	this.timeout(10000);

	// basic movie search
	it('should search for Zoolander', function(done) {
		api.searchMovie({query: 'Zoolander' }).then(function(res){
			res.body.should.be.an('object');
			res.body.should.have.property('results');
			res.body.results.should.be.an('array');
			done();
		});
	});

});
