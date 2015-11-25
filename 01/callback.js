var foo = function(name,arg) {
	if(typeof arg === 'function')
		arg();
	else
		console.log(arg);
};

foo(null,5);
foo(null,'abc');
foo('keypress',function() {
	console.log('callback');
});