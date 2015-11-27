// js/todos.js
var newTodo = $('#newTodo');
var ul = $('ul.todos');
var header = $('header');

var addTodo = function(todo) {
	ul.append("<li>" + todo + "</li>");
};

header.bind('click',function() {
	$.getJSON('/todos',null,function(data){
		for(var index in data)
			addTodo(data[index]);
	});
});
newTodo.bind('keypress',function(e) {
	if(e.charCode !== 13)
		return;
	addTodo(newTodo.val());
	newTodo.val('');	
});

var ericsson = {
	name:'ericsson',
	show:function() {
		console.log(this.name);
	}
};

newTodo.bind('click',$.proxy(ericsson,'show'));