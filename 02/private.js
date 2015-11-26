//命名空间
var ericsson = ericsson || {};
ericsson.model = {};
//即时函数
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

console.assert(9 === ericsson.model.sum());