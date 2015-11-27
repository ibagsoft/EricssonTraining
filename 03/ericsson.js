var ericsson = ericsson || {};
var model = ericsson.Model = function() {};
model.prototype = {
	save:function() {},
	fetch:function() {},
	ajax:function() {},
	toJSON:function() {}
}
var view = ericsson.View = function() {};
view.prototype = {
	render:function() {},
	events:function() {}
};
var extend = model.extend = view.extend = function(options) {
	var child = function() {};
	child.prototype.__proto__ = this.prototype;
	for(var attr in options){
		child.prototype[attr] = options[attr];
	}
	return child;
};