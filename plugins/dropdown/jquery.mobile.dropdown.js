/* Copyright 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.License
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

	$.widget("mobile.dropdown", $.mobile.widget, {

		options: {
			initSelector: ""//":jqmData(role='dropdown')"
		},

		_init: function() {
		},

		_create: function() {

			var	self = this,
				parent = $(this.element).parent(),
				collapse = $('<div data-role="collapsible" data-content-theme="c" data-collapsed="true" data-iconpos="right">'),
				select = $(this.element),
				list = $('<ul data-role="listview"></ul>').appendTo(collapse);

			this.header = $('<h1></h1>').appendTo(collapse);

			select.find('option').each( function (i,el){
				var item = $(document.createElement('li')).text($(el).text());
				if($(el).attr("selected") === "selected") {
					self._setHeader($(el).text());
					item.addClass("checked");
				}
				list.append(item);

			});

			select.css("display", "none");

			$("<div>").attr("data-enhance", "false").wrap(select);

			parent.after(collapse);

			collapse.parent().trigger("create");
			parent.remove();

			setTimeout(function(){
				select.appendTo(collapse);
			}, 0);

			list.bind("vclick", function(event){
				var item = $(event.target);
				self._setHeader(item.text());
				$(".checked").removeClass("checked");
				item.addClass("checked");
			});
		},

		_setHeader: function(text) {
			var headerText = this.header.find('.ui-btn-text'),
					headerStatusText = headerText.find('.ui-collapsible-heading-status'),
					item = $(event.target);

			//Check if the content has been enhanced yet
			if(headerText.length === 0){
				this.header.text(text);
			} else {
				headerText.text(text).append(headerStatusText);
			}
		},

		refresh: function() {
		}
	});

	$( document ).unbind( "selectmenubeforecreate" );
	$( document ).bind( "selectmenubeforecreate", function(event){
		$( event.target ).dropdown();
	} );
})(jQuery);
