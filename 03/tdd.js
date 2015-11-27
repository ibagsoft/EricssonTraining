var should = require('should');
require('./framework');

describe('should have own framework', function() {
	it('should have method', function() {
		var Person = function(name) {
			this.name = name;
		};
		Person
		.method('say',function() {})
		.method('show',function() {});
		var jobs = new Person('jobs');
		jobs.should.be.ok;
		jobs.should.have.properties('say','show');
	});
});

//npm install -g mocha
//npm install should

// mocha tdd.js