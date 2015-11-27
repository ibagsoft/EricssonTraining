var foo = function(name) {
	this.name = name;
};
// var foo = new Function('name','this.name = name;');

var o = {
	setName:foo
};

foo.call({
	mySelf:''
},'jobs');

foo.apply(o,['jobs']);