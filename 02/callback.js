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