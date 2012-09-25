/*
* Copyright 2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and 
* limitations under the License.
*/
 
(function($) {
	$.widget( "mobile.activityindicator", $.mobile.widget, {
		options: {
			initSelector: ":jqmData(role='bb-activity-indicator')",
			size: "medium",
			theme: 'c',
			speed: '2s'
		},
		_create: function() {
			//Get attribute data and store for readibility
			var themeAttr = this.element.attr('data-theme');
			var sizeAttr = this.element.attr('data-size');
			
			//Set Options
			this.options.size = sizeAttr !== undefined ? sizeAttr : this.options.size;
			this.options.theme = themeAttr !== undefined ? themeAttr : this.options.theme;
			
			//Create widget
			this.swirl = $(document.createElement('div'))
				.addClass('bb-activity-swirl' + ' bb-activity-' + this.options.size);
			this.element
				.append(this.swirl)
				.addClass(
					'bb-activity ' +
					'bb-activity-bg-' + this.options.theme + 
					' bb-activity-' + this.options.size
				);
		},
		display: function(isVisible) {
			if (!isVisible) {
				this.element.addClass('bb-activity-hidden');
			} else {
				this.element.removeClass('bb-activity-hidden');
			}
		},
		speed: function (seconds) {
			this.swirl.css('-webkit-animation-duration', seconds);
		}
	});
	$( document ).bind( "pagecreate create", function( e ){
        $.mobile.activityindicator.prototype.enhanceWithin( e.target );
    });
})(jQuery);
