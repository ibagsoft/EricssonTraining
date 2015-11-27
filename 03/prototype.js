var Person = function(name) {
	this.name = name;
};
Person.prototype = {
	say:function() {
		console.log(this.name);
	},
	show:function() {}
};

var jobs = new Person('jobs');
/*var jobs = {};//var jobs = new Object();
jobs.__proto__ = Person.prototype;//var jobs = new Person
Person.call(jobs,'jobs');//Person('jobs')*/

console.assert(typeof jobs.say === 'function');
console.assert(typeof jobs.show === 'function');