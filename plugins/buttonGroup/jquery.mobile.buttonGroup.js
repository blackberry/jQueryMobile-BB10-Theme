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


(function ($) {
	$.widget("mobile.buttonGroup", $.mobile.widget, {
		options: {
			initSelector: ':jqmData(role="controlgroup"):jqmData(type="horizontal")'
		},
		_create: function () {
			this.element.addClass('bb-buttongroup');
			
			this.controlWrapper = this.element.children()
				.addClass('bb-buttongroup-controls');
		
			var buttons = this.controlWrapper.children(),
				numButtons = buttons.length,
				divisor = numButtons % 3;
			
			// If button group has multiple rows add stacked class to apply margin correction offset
			if (numButtons >= 3) { this.controlWrapper.addClass('bb-buttongroup-stacked'); }
			
			// Arrange Buttons into a grid layout
			// If button group is multiple of three, wrap in 3 column grid
			if (divisor === 0) {
				this.controlWrapper.addClass('ui-grid-b');
			}
			else {
				// Single line - 1 Button
				if (numButtons === 1) {
					this.controlWrapper.addClass('ui-grid-solo');
				} 
				// 2 or 4 Buttons
				else if (numButtons === 2 || numButtons === 4) {
					this.controlWrapper.addClass('ui-grid-a');
				}
				// Multi Line
				else {
					// Arrange buttons into a 3 column grid
					this.controlWrapper.addClass('ui-grid-b');
					
					// Move the remaining buttons into a separate container with an appropriate grid layout
					this.controlWrapperExtra = $(document.createElement('div'))
						.addClass('bb-buttongroup-controls-extra ui-controlgroup-controls');
					this.element.append(this.controlWrapperExtra);
					var extra = buttons.slice(numButtons - divisor, buttons.length);
					this.controlWrapperExtra.append(extra);
					
					// If 2 buttons remain
					if (extra.length === 2) { 
						this.controlWrapperExtra.addClass('ui-grid-a'); 
					}
					// If 1 button remains
					else if (extra.length === 1) {
						this.controlWrapperExtra.addClass('ui-grid-solo');
					}
				}
			}
			
			// Add Corner rounding classes to the appropriate buttons
			// If the button group is stacked 
			if (numButtons > 3) {
				//Top left Button
				buttons.eq(0)
					.removeClass('ui-corner-left')
					.addClass('ui-corner-tl')
					.children().removeClass('ui-corner-left')
					.addClass('ui-corner-tl');
				//Bottom Right Button
				buttons.eq(numButtons-1)
					.removeClass('ui-corner-right')
					.addClass('ui-corner-br')
					.children().removeClass('ui-corner-right')
						.addClass('ui-corner-br');
				
				// 4 Button layout requires a special case as it breaks the pattern
				if (numButtons === 4) {
					//Top Right Button
					buttons.eq(1)
						.addClass('ui-corner-tr')
						.children().addClass('ui-corner-tr');
					//Bottom Left Button
					buttons.eq(2)
						.addClass('ui-corner-')
						.css('margin-top', '-2px')
						.children().addClass('ui-corner-bl');
				} 
				else {
					//Top Right Button
					buttons.eq(2)
						.addClass('ui-corner-tr')
						.children().addClass('ui-corner-tr');
					//Bottom Left Button
					if (divisor === 0) { divisor = 3; } 
					buttons.eq(numButtons - divisor)
						.addClass('ui-corner-bl')
						.children().addClass('ui-corner-bl');
				}
			}
		}
	});
	//TODO: enhance upon controlgroup creation event instead of pageinit
	$( document ).bind( "pageinit create", function( e ){
		$.mobile.buttonGroup.prototype.enhanceWithin( e.target );
	});
})(jQuery);
