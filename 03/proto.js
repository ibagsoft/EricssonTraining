// proto.js
var o1 = {
	method:function() {}
};
var o2 = {
	myMethod:function() {}
};
console.assert(typeof o2.method !== 'function');
console.assert(typeof o2.myMethod === 'function');

o2.__proto__ = o1;
console.assert(typeof o2.method === 'function');
console.assert(typeof o2.myMethod === 'function');

var o3 = Object.create(o2);
console.assert(typeof o3.method === 'function');
console.assert(typeof o3.myMethod === 'function');