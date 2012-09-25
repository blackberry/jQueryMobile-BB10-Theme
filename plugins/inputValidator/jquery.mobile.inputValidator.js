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
	$.widget("mobile.inputValidator", $.mobile.widget, {
		options: {
			initSelector: 'input[type="text"]:jqmData(role="bb-inputvalidator"), input[type="search"]:jqmData(role="bb-inputvalidator")'
		},
		
		_create: function() {
			var self = this;
			this.element
				.addClass("bb-text-validated");
			this.wrapper = $(document.createElement("div"))	
				.addClass("bb-text-validator");
				
			// Check whether the target is a search input by inspecting its parent. 
			var parent = $(this.element).parent('div.ui-input-search');
			if (parent.length !== 0) {
				//Bubble the wrapper target to the input's parent
				parent.addClass("bb-text-validated");
				this.wrapper
					.insertBefore(parent)
					.append(parent);
			} else {
				this.wrapper
					.insertBefore(this.element)
					.append(this.element);
			}
			this.icon = $(document.createElement("div"))
				.addClass("bb-validation-icon")
				.appendTo(this.wrapper);
			this._validate($(this.element));
			
			// Watch the input and attach valid/invalid classes depending on the state
			$('.bb-text-validated').bind('focus keyup blur', function(event) {
				self._validate($(event.target));
			});
		},
		
		//@desc				Adds valid/invalid classes depending on the validity of the input
		//@param input		A jQuery object representing the input to validate
		_validate: function(input) {
			var pattern = new RegExp(input.attr("pattern")),
				parent = input.parent('div.ui-input-search'),
				watched = input.add(parent);
			
			if (input.attr('required') === undefined) {
				//If not required, empty and out of focus; set as neutral
				if (input.val() === "" && !input.is(':focus')) {
					watched.addClass('bb-text-empty')
						.removeClass('bb-text-valid')
						.removeClass('bb-text-invalid');
					return;
				} 
				//If in focus and has bb-text-empty class, remove to allow validation
				else if (input.hasClass('bb-text-empty') && !input.val() && input.is(':focus')) {
					watched.removeClass('bb-text-empty');
				}
			}
			// Add / Remove validation classes
			if ( pattern.test(input.val())) {
				watched.addClass('bb-text-valid')
					.removeClass('bb-text-invalid');
			} else {
				watched.removeClass("bb-text-valid")
					.addClass("bb-text-invalid");
			}
		}
	});
	
	$(document).bind("pagecreate create", function(e) {
		$.mobile.inputValidator.prototype.enhanceWithin(e.target);
	});
})(jQuery);
