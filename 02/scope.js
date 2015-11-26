//02/scope.js

var foo = function() {
	console.log('break');
	var a = 5,
	b = function() {};
	function c() {
		console.log('break');
		var d = a + 5;
		return d;
	}
	c();
};
foo();