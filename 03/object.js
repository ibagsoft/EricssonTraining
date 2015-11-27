var o = {
	name:'jobs',
	age:62,
	say:function() {
		console.log(this.name + ":" + this.age);
	}
};
for(var attr in o)
	console.log(o[attr]);

o['say']();