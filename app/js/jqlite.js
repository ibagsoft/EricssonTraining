// js/jqlite.js
var $ = function(selector) {
	var el = document.querySelector(selector);
	var o = {
		val:function(content) {
			if(typeof content === 'string')
				el.value = content;
			else
				return el.value;
		},
		bind:function(event,callback) {
			el.addEventListener(event,callback);
		},
		append:function(content) {
			var reg = /^<(\w+)>(.*)<\/\1>/;
			var match = reg.exec(content);
			var li = document.createElement(match[1]);
			li.innerText = match[2];
			el.appendChild(li);
		}
	};
	return o;
};
$.getJSON = function(url,data,success) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			success(JSON.parse(xhr.responseText));
		}
	};
	xhr.open('get',url,true);
	xhr.send(null);
};