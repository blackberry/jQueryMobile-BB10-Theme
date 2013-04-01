App = {};

App.init = function () {
	console.log("App Init");
	App.utils.metaHack();
	$("#activity").live("pageinit", function(){
		App.page.activity.init();
	});
	$("#bb_activity").live("pageinit", function(){
		App.page.bb_activity.init();
	});
	$("#progressPage").live("pageinit", function(){
		App.page.progress.init();
	});
	$("#sliderPage, #sliderPageDark").live("pageinit", function(){
		App.page.slider.init();
	});
	$("#togglePage, #togglePageDark").live("pageinit", function(){
		App.page.toggle.init();
	});
	$("#actionBarSample").live("pageinit", function() {
		App.page.actionBarSample.init();
	});
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
	activity: {},
	bb_activity: {},
	progress: {},
	slider: {},
	toggle: {},
	actionBarSample: {}
}

App.page.activity.init = function() {
	$('#show').on('click', function () {
			$.mobile.loading('show');
	});
	$('#text').on('click', function() {
		$.mobile.loading('show', {
			text: 'Loading',
			textVisible: true,
			textonly: true,
			theme: 'a'
		});
	});
	$('#swatch-a').on('click', function() {
		$.mobile.loading( 'show', {
			text: 'Loading',
			textVisible: true,
			theme: 'a'
		});
	});
	$('#swatch-a-notext').on('click', function() {
		$.mobile.loading( 'show', {
			theme: 'a'
		});
	});
	$('#swatch-c').on('click', function() {
		$.mobile.loading( 'show', {
			text: 'Loading',
			textVisible: true,
			theme: 'c'
		});
	});
	$('#swatch-c-notext').on('click', function() {
		$.mobile.loading( 'show', {
			theme: 'c'
		});
	});
	$('#hide').on('click', function () {
		$.mobile.loading('hide');
	});
}

App.page.bb_activity.init = function() {
	console.log("bb_activity");
	$('#throttle').on('change', function () {
		console.log("throttle");
		var speed = $('#throttle').val();
		$('#speedTest').activityindicator('speed', speed+'s');
	});
}

App.page.progress.init = function() {
	var p = 0;
	var error = pause = false;

	function watchProgress() {
		if( p > 100 || error || pause) {
			return;
		}
		$('#rogress').progressbar("setValue", p);
		p+= 4;
		setTimeout(watchProgress, 100);
	}

	
	$('#start').on('vclick', function () {
		error = false;
		watchProgress();
	});

	$('#error').on('vclick', function () {
		$('#rogress').progressbar("setError", error = !error);
	});

	$('#pause').on('vclick', function () {
		$('#rogress').progressbar("pause", pause = !pause);
	});

	$('#reset').on('vclick', function () {
		p = 0;
		error = pause = false;
		$('#rogress').progressbar("setValue", p);
	});
}

App.page.slider.init = function() {
	$('#slider-disabled').slider('disable');
	$('#slider-disabled-highlight').slider('disable');
}

App.page.toggle.init = function() {
	console.log("toggle init");
	$('#flip-disabled').slider('disable');
}

App.page.actionBarSample.init = function() {

	var $tabo = $("#tover"),
	overflowState = $tabo.hasClass("noContent");


	//Open the action overflow menu
	$("#aover").bind("vclick", function() {
		$("#right").panel("open");
	});

	$("#left").on("panelbeforeopen", function() {
		//Save the state of the overflow button
		overflowState = $tabo.hasClass("noContent");
		$tabo.addClass("noContent");
	})
	.on("panelbeforeclose", function() {
		//Put the overflow button into the correct state
		if(!overflowState) {
			$tabo.removeClass("noContent");
		}
	});

	//Open the tab overflow menu
	$tabo.bind("vclick", function() {
		$("#left").panel("open");
	});

	//Handle overflow menu clicks
	$(".bb10-panel").bind("vclick", function() {
		//Close the panel
		$(this).panel("close");
	});

	$("#left li").bind("vclick", function() {
		//Clear the active state from any other buttons that may have been set to active
		$(this).siblings().removeClass("ui-btn-active");
		//Add the active state to the selected button
		$(this).addClass("ui-btn-active");
		//Clear the contents of the tab overflow button
		//Add class to put the tab overflow icon in the correct position
		//Clear the active state from all tab buttons in action bar
		$('[data-role="tab"], [data-role="tab-overflow"]').removeClass("active");
	});

	$(".inBar").bind("vclick", function() {
		//Set the active state to the tab in the actionbar
		$('#' + this.id.slice(0, 2)).addClass("active");
		$tabo.addClass("noContent").empty();
		overflowState = true;
	});

	$(".notInBar").bind("vclick", function() {
		//Set the active state to the tab overflow button
		$tabo.empty()
		.addClass("active")
		.html('<img src="img/generic_81_81_placeholder.png" alt=""><p>' + $(this).text() + '</p>')
		.removeClass("noContent");
		overflowState = false;
	});

	$("[data-role='tab']").bind("vclick", function() {
		//Change page on tab click
		if($(this).data("href")) {
			$.mobile.changePage( $(this).data("href"), { transition: "slideup"} );
		}
	});
}



App.init();

