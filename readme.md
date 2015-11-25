# JQueryKata

## 函数的定义

函数有三种定义方式：  

- 匿名函数
```
var foo = function() {};
```
foo只是一个指定函数地址的指针，而该函数没有名称  

- 具名函数
```
function foo () {}
```
具名函数除了有名称之外，还会提态变量的初始化时间。  

- 函数对象
```
var foo = new Function();
```
函数对象的定义方式与匿名函数一致，但是匿名函数作了优化

### jQuery的$实现
```
var $ = function(selector) {
	return document.querySelector(selector);
};
```

## 对象
javascript是一种动态的面向对象语言:
```
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
```
var o = {
	name:'jobs',
	age:62,
	say:function() {
		console.log('hello')
	}
};
```
### jQuery的对象实现
```
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
```
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
```
bind:function(event,callback) {
	el.addEventListener(event,callback);
}
```

## 小结
到目前为止，我们接触到了对象、函数和回调的概念。
实现的jQuery代码如下：
```
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