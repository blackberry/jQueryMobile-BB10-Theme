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
	toggle: {}
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



App.init();

