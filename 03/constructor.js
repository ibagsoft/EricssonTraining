(function() {
	//private
	var say = function() {
		console.log(this.name);
	};
	var show = function() {};
	var init = function(name) {
		this.name = name;
		this.say = say;
		this.show = show;
	};

	//public
	this.init = init;
}).call(this);

var o1 = {};
this.init.call(o1,'jobs');
var o2 = {};
this.init.call(o2,'gates');
o1.say();
o2.say();