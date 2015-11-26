var height = 10;
for(var i = 0;i<height;i++){
	(function(h) {
		setTimeout(function() {
			console.log(h);
		},h*1000);
	})(i);
}

/*var start = Date.now();
setTimeout(function() {
	var end = Date.now();
	console.log(end-start);
},3000);*/