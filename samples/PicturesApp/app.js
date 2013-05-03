App = {};

App.init = function () {
	console.log("App Init");
	App.utils.metaHack();
	$("#picturesApp").live("pageinit", function() {
		$(this).find('#top').trigger('create');
		App.page.actionBarSample.init($(this));
		App.page.applicationMenu.init($(this));
	});
	$("#cameraPics").live("pageinit", function() {
		$(this).trigger('create');
		App.page.actionBarSample.init($(this));
		App.page.applicationMenu.init($(this));
	});	
	$('#imageShow').live("pageinit", function(){
		$(this).find('#image').attr("src","");
		
	})
}

App.utils = {
	metaHack: function () {
		var meta = document.createElement("meta");
		meta.setAttribute('name','viewport');
		meta.setAttribute('content','initial-scale='+ (1/window.devicePixelRatio) + ',user-scalable=no');
		document.getElementsByTagName('head')[0].appendChild(meta);
	}
}

App.page = {
	actionBarSample: {},
	applicationMenu: {},
	pictureView: null
}

App.page.actionBarSample.init = function( pageContext ) {

	//Handle overflow menu clicks
	pageContext.find(".bb10-panel").bind("vclick", function() {
		//Close the panel
		$(this).panel("close");
	});
	
	pageContext.find("[data-role='tab']").bind("vclick", function() {
		//Change page on tab click
		if($(this).data("href")) {
			$.mobile.changePage( $(this).data("href"), { transition: "fade"} );
		}
	});
}

App.page.applicationMenu.init = function( pageContext ) {
	if(typeof blackberry != 'undefined'){
		blackberry.event.addEventListener('swipedown', function(){
			pageContext.find('#top').panel("open");
		});
	}
}

App.init();

