;(function(jQuery) {
	jQuery.fn.fly = function(during) {
		var width = screen.width;
		var el = this.el;
		el.style['position'] = 'absolute';
		el.style['left'] = '0px';
		for(var i = 1;i<=width;i++){
			(function(h) {
				setTimeout(function() {
					el.style.left = h + "px";
				},h*during/width);
			})(i);
		}
	};
})(jQuery);