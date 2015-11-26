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