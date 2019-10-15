$(function() {
	try {
		var target = new Concerto.Stylesheet();
		target.getStyleSheet('simplePagination.css');
		
		var style = new Concerto.Stylesheet();
		style.getStyleSheet('jquery-ui.css');
		
		var color = style.getRule('ui-state-default').getStyle('color');
		
		if (color != null) {
			target.getRule('compact-theme a').setStyle('color', color);
		}
		
		var color2 = style.getRule('ui-state-active').getStyle('color');
		
		if (color2 != null) {
			target.getRule('compact-theme .current').setStyle('color', color2);
		}
	} catch (e) {
	}
});
