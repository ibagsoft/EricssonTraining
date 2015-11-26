// arguments.js
var foo = function(a,b) {
	console.log('break');
	console.log(arguments);
};

foo(5,'abc',[6,'a',7,'b'],function() {});