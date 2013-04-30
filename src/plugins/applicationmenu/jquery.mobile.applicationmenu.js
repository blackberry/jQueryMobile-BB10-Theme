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

	$.widget("mobile.applicationmenu", $.mobile.widget, {

		options: {
			initSelector: ":jqmData(role='applicationmenu')",
			maxItems: 5
		},

		_init: function() {
		},

		_create: function() {
			this.actionsArea = this.element;
			this.actionsArea.parent('.ui-panel-inner').addClass('ui-panel-inner-application-menu');
			var self = this,		
				o = self.options,
				actions = $( document.createElement( 'div' ) ),
				itemList = this.actionsArea.children( ":jqmData(role='action'), :jqmData(role='SettingsActionItem')" ),
				barItemsTotal = (self.options.maxItems < itemList.length) ? self.options.maxItems : itemList.length,
				isSettingsActionFound = false;
			
			for (var i = 0; i < barItemsTotal; i++) {
				this.actionsArea.append(this._createActionItem(itemList.eq(i)));
			}
			
			//display SettingsActionItem on the right side when it is the only item
			if( barItemsTotal === 1 ){
				this.actionsArea.children(":jqmData(role='SettingsActionItem')").addClass('application-menu-item-settings');
			}

			this.actionsArea.addClass('application-menu');

			$( '.application-menu-item' )
				.bind( 'vmousedown', function( event ) {
					$(event.delegateTarget)
						.children('.application-menu-item-pressed-indicator')
						.addClass( 'pressed' );
				})
				.bind ('vmouseup', function(event) {
					$(event.delegateTarget)
							.children('.application-menu-item-pressed-indicator')
							.removeClass( 'pressed' );
				});
		},

		refresh: function() {
		},

		destroy: function() {

		},

		_createActionItem: function(item) {
			var label = item.find('p').first(),
				itemImage = item.find('img').first()
					.addClass('application-menu-item-image')
					.appendTo(item);

			if (label) {
				var actionItemText = $(document.createElement('div'))
						.addClass('application-menu-item-text')
						.html(label)
						.appendTo(item);
			}

			var pressedIndicator = $(document.createElement('div'))
				.addClass('application-menu-item-pressed-indicator')
				.prependTo(item);

			item.addClass('application-menu-item visible');

			return item;
		}

	});
	$( document ).bind( "pagecreate create", function( e ){
		$.mobile.applicationmenu.prototype.enhanceWithin( e.target );
	});
})(jQuery);
