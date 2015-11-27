var val = function(content) {
	if(typeof content === 'string')
		this.el.value = content;
	else
		return this.el.value;
};
var bind = function(event,callback) {
	this.el.addEventListener(event,callback);
};
var append = function(content) {
	var reg = /^<(\w+)>(.*)<\/\1>/;
	var match = reg.exec(content);
	var li = document.createElement(match[1]);
	li.innerText = match[2];
	this.el.appendChild(li);
};
var getStyle =function(attr) {
	var style = document.defaultView.getComputedStyle(this.el);
	return style[attr];
};
var slideDown = function(during) {
	var height = parseInt(this.getStyle('height'));
	this.el.style.overflow = 'auto';
	var that = this;
	for(var i = 1;i<=height;i++){
		(function(h) {
			setTimeout(function() {
				that.el.style.height = h + "px";
			},h*during/height);
		})(i);
	}
};
var getJSON = function(url,data,success) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			success(JSON.parse(xhr.responseText));
		}
	};
	xhr.open('get',url,true);
	xhr.send(null);
};
var proxy = function(o,fn) {
	return function() {
		o[fn].call(o);	
	};
};
var $ = function(selector) {
	var el = document.querySelector(selector);
	var o = {
		el:el,
		val:val,
		bind:bind,
		append:append,
		getStyle:getStyle,
		slideDown:slideDown
	};
	return o;
};
$.getJSON = getJSON;
$.proxy = proxy;