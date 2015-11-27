(function() {
	//private
	var init = function(name) {
		this.name = name;
		this.__proto__ = init.prototype;
		// this.__proto__.__proto__ = init.prototype;
		// for(var attr in init.prototype){
		// 	this.__proto__[attr] = init.prototype[attr];
		// }
	};
	init.prototype = {
		say:function() {
			console.log(this.name);
		},
		show:function() {}
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