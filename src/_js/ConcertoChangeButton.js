/**
*	Change System Button Menu
*
*
*
**/
var Concerto = Concerto || {};

Concerto.ChangeButton = function(target) {
	/**
	*	properties
	**/
	var prop  = {
		element:null,
		systems:['IS', '環S', '施S', 'ES', 'MM', '検査'],
	};
	
	/**
	*	_buildMenu
	**/
	_buildMenu = function() {
        var system_urls = prop.systems.map(function(name, i) {
            return '<li><a href="'
                + location.href.replace(/\/itc_work(.)\//, '/itc_work' + (i + 1) + '/')
                + '" target="_self">' + name + 'システム</a></li>';
        });
        
		var template = '\
			<div>\
				<div>\
					<a class="menu_button ui-state-default" href="javascript:void(0);" title="システム切替メニューを表示します">▲</a>\
				</div>\
				<ul class="menu_menu" style="position:absolute; z-index:50; width:100px;">'
            + system_urls.join('\n')
            + '</ul>\
			</div>\
		';
		
		$(prop.element).append(template);
	};

	/**
	*	_attach
	**/
	_attach = function() {
		$(prop.element)
			.find('.menu_button')
			.click(function() {
				$(this).parent().next().toggle();
				return false;
			})
			.parent()
			.next()
			.hide()
			.menu()
		;
		
		$(document).click(function() {
			$(prop.element)
				.find('.menu_button')
				.parent()
				.next()
				.hide();
		});
	}
	
	/**
	*	construct
	*	@param string target element
	**/
	try {
		prop.element = target;
		_buildMenu();
		_attach();
	} catch (e) {
		console.log(e.message);
	}
	
	/**
	*	public method
	**/
	return {
	};
};
