var o = {
	name:'jobs',
	age:62,
	say:function() {
		console.log('hello')
	}
};

o.otherMethod = function() {};
console.log(o.name + ":" + o.age);
o.say();