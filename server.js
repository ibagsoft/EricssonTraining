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

// localhost:9432/your word