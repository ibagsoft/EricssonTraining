// sugar.js

Number.prototype.after_seconds = function(callback) {
	setTimeout(callback,1000*this);
};

var i = 5;
i.after_seconds(function() {
	console.log('close.');
});



/*//相当于定义Person类的构造函数
var Person = function(name) {
	this.name = name;
};
console.log(Person.prototype);
console.assert(Person === Person.prototype.constructor);
//相当于声明Person类别的公共方法和属性
Person.prototype = {
	constructor:Person,
	show:function() {},
	say:function() {}
};
var jobs = new Person('jobs');*/
/*var jobs = {};
jobs.__proto__ = Person.prototype;
Person.call(jobs);*/


/*var i = 5;
var str = 'abc';
var o = {name:'jobs'};
var foo = function() {};

console.log(i.__proto__);
console.log(str.__proto__);
console.log(o.__proto__);
console.log(foo.__proto__);
console.log('\n===========================\n');
console.log(i.prototype);
console.log(str.prototype);
console.log(o.prototype);
console.log(foo.prototype);*/