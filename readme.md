# JQueryKata

## 函数的定义

函数有三种定义方式：  

- 匿名函数
```javascript
var foo = function() {};
```
foo只是一个指定函数地址的指针，而该函数没有名称  

- 具名函数
```javascript
function foo () {}
```
具名函数除了有名称之外，还会提态变量的初始化时间。  

- 函数对象
```javascript
var foo = new Function();
```
函数对象的定义方式与匿名函数一致，但是匿名函数作了优化

### jQuery的$实现
```javascript
var $ = function(selector) {
	return document.querySelector(selector);
};
```

## 对象
javascript是一种动态的面向对象语言:
```javascript
var o = new Object();
o.name = 'jobs';
o.age = 62;
o.say = function() {
	console.log('hello');
};

o.say();
console.log(o.name + ":" + o.age);
```
但是，它更推荐字面量`{}`的写法:
```javascript
var o = {
	name:'jobs',
	age:62,
	say:function() {
		console.log('hello')
	}
};
```
### jQuery的对象实现
```javascript
var $ = function(selector) {
	var el = document.querySelector(selector);
	var o = {
		val:function() {
			return el.value;
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
```
## 回调
JavaScript的函数实际上是一种对象，不过是函数对象，所以函数也可以作为参数传给另外一个函数：
```javascript
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
```
### JQuery的bind
```javascript
bind:function(event,callback) {
	el.addEventListener(event,callback);
}
```

## 小结
到目前为止，我们接触到了对象、函数和回调的概念。
实现的jQuery代码如下：
```javascript
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
```

## 再谈回调
回调这种函数语言式的特性，能够将服务的定义延迟到使用的时候。
```javascript
var foo = function(callback) {
	var request = {url:'/todos'};
	var response = {
		write:function(content) {
			console.log(content);
		},
		end:function() {
			console.log('done');
		}
	};
	if(typeof callback === 'function')
		callback(request,response);
}; 

foo(function(req,res) {
	console.log(req.url);
	res.write('404');
	res.end();
});
```
### 回调在Nodejs中的应用
```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(req,res) {
	var path = req.url.slice(1);
	console.log(path);
	fs.exists(path,function(exist) {
		if(exist){
			fs.readFile(path,'utf-8',function(err,content) {
				res.write(content);
				res.end();
			});
		}
		else{
			if(path === 'todos'){
				var todos = ['This is Todo1','This is Todo2','This is Todo3'];
				res.write(JSON.stringify(todos));
				res.end();
			}
			else{
				res.write('404');
				res.end();
			}
		}
	});
}).listen(9432);
```
### 回调在ajax中的应用
```javascript
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
$.getJSON('/todos',null,function(data){
	for(var index in data){
		console.log(data[index]);
	}
});
```

## 小结
目前为止，jQlite的源码如下：
```javascript
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
```

## 作用域
JS的作用域由Global、Local、Closure三部分组成：
```javascript
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
```
### 节省查询的路径
对于经常访问的global变量，最好通过参数传给local:
```javascrpit
var foo = function(document) {
	//a lot of code
	//document.querySelector(selector);
};
foo(document);
```

### 封装
通过即时函数，来模仿private与public:
```javascript
var ericsson = ericsson || {};
ericsson.model = {};

(function(ericsson) {
	//private
	var a = 4,b = 5;
	var method1 = function() {};
	var method2 = function() {
		return a+b;
	};
	//public
	ericsson.model.sum = method2;
})(ericsson);
```
也可以模仿命名空间:
```javascript
var ericsson = ericsson || {};
//即时函数
(function(ericsson) {
	//private
	var a = 4,b = 5;
	var method1 = function() {};
	var method2 = function() {
		return a+b;
	};
	ericsson.model = {
		create:method1,
		save:method2
	}
})(ericsson);

var ericsson = ericsson || {};
//即时函数
(function(ericsson) {
	//private
	var a = 4,b = 5;
	var method1 = function() {};
	var method2 = function() {
		return a+b;
	};
	ericsson.view = {
		paint:method1,
		render:method2
	}
})(ericsson);
```
### settimeout
使用local作用域巧妙的封装了i当时的值：
```javascript
var height = 10;
for(var i = 0;i<height;i++){
	(function(h) {
		setTimeout(function() {
			console.log(h);
		},h*1000);
	})(i);
}
```

### jQuery的slideDown的实现
```javascript
slideDown:function(during) {
	var style = document.defaultView.getComputedStyle(el);
	var height = parseInt(style.height);
	el.style.overflow = 'auto';
	for(var i = 1;i<=height;i++){
		(function(h) {
			setTimeout(function() {
				el.style.height = h + "px";
			},h*during/height);
		})(i);
	}
}
```

## 函数的几种调用方式
### 直接调用
此时的this是window(global)  
```javascript
var foo = function(name) {
	this.name = name;
};
foo('jobs');
```

### 通过对象调用
此时的this是对象，也就是o
```javascript
var foo = function(name) {
	this.name = name;
};

var o = {
	setName:foo
};

o.setName('jobs');
```

#### JS的对象是集合
```javascript
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
```
#### jQuery里getStyle的重用
```javascript
getStyle:function(attr) {
	var style = document.defaultView.getComputedStyle(el);
	return style[attr];
},
slideDown:function(during) {
	var height = parseInt(this.getStyle('height'));
	el.style.overflow = 'auto';
	for(var i = 1;i<=height;i++){
		(function(h) {
			setTimeout(function() {
				el.style.height = h + "px";
			},h*during/height);
		})(i);
	}
}
```
#### 此this非彼this
```javascript
slideDown:function(during) {
	var height = parseInt(this.getStyle('height'));
	this.el.style.overflow = 'auto';
	var that = this;
	for(var i = 1;i<=height;i++){
		(function(h) {
			setTimeout(function() {
				//此处的this指的是window，所以使用that
				that.el.style.height = h + "px";
			},h*during/height);
		})(i);
	}
}
```

### call & apply
```javascript

foo.call({
	mySelf:''
},'jobs');

foo.apply(o,['jobs']);
```
#### jQuery的proxy
```javascript
$.proxy = function(o,fn) {
	return function() {
		o[fn].call(o);	
	};
};
```