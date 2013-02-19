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

	$.widget("mobile.actionbar", $.mobile.widget, {

		options: {
			initSelector: ":jqmData(role='actionbar')",
			backButtonText: $.mobile.page.prototype.options.backBtnText,
			disableTapToggle: true
		},

		_init: function() {
		},

		_create: function() {
			this.actionBarArea = $( this.element );
			this.actionOverflow = this.tabOverflow = 0;

			var overflow,
				self = this,
				o = self.options,
				bar = $( document.createElement( 'div' ) ),
				actions = $( document.createElement( 'div' ) ),
				itemList = this.actionBarArea.children( ":jqmData(role='action'), :jqmData(role='tab')" ),
				actionList = itemList.filter( ":jqmData(role='action')" ),
				tabList = itemList.filter( ":jqmData(role='tab')" ),
				back = this.actionBarArea.children( ":jqmData(role='back')").first();


			this.tabOverflow = this.actionBarArea.children(":jqmData(role='tab-overflow')");
			this.actionOverflow = this.actionBarArea.children(":jqmData(role='action-overflow')");

			$("[data-role=footer]").fixedtoolbar({ tapToggle: !o.disableTapToggle });

			this.actionBarArea.addClass('action-bar-area action-bar');
			actions.addClass('action-bar-actions');

			//If text field is selected, hide the actionbar
			$(".ui-input-text").focus(function(){
				$(".ui-footer").addClass('bb10-landscape-hidden');
			}).blur(function(){
				$(".ui-footer").removeClass('bb10-landscape-hidden');
			});

			//If we have tabs we can not have a back button
			if (back.length && !tabList.length) {
				this._createBackButton(back, this.actionBarArea);
			} else {
				back.remove();
				actions.addClass('action-bar-actions-full-width');
			}

			for (var i = 0; i < tabList.length; i++) {
				actions.append(this._createTabItem(tabList.eq(i)));
			}

			for (i = 0; i < actionList.length; i++) {
				actions.append(this._createActionItem(actionList.eq(i)));
			}

			if( this.actionOverflow.length > 0 ) {
				this.actionOverflow.addClass('action-bar-overflow actions')
					.appendTo(actions)
					.bind('vclick', function(){
						$(self.element).trigger("actionOverflowPressed");
                                       });
                       }

			if( this.tabOverflow.length > 0 ) {
				var hasContent = (this.tabOverflow.children("p, img").length > 0) ? "" : "noContent";
				this.tabOverflow.addClass('action-bar-overflow tabs action-bar-tab-item ' + hasContent)
					.prependTo(actions)
					.bind('vclick', function(event) {
						$(self.element).trigger("tabOverflowPressed");
					});
			}

			this.actionBarArea.append(actions);


			var itemsLen, actionBarItems, itemsize;

			if ( tabList.not('[data-overflow]').length > 0) {
				actionBarItems = this.actionBarArea.find(".action-bar-tab-item").not(".tabs");
				itemsize = "action-bar-grid-" + ( (actionList.length || this.actionOverflow.length) > 0 ? "tabAction" : "tabs");
			} else {
				actionBarItems = this.actionBarArea.find(".action-bar-action-item");
				itemsize = "action-bar-grid-actions";
			}

			itemsLen = actionBarItems.length;
			itemsize +=  "-" + ( ( itemsLen > 5 ) ? "e" : String.fromCharCode( 96 + itemsLen ) );
			actionBarItems.addClass(itemsize);

			$( '.action-bar-action-item, .action-bar-tab-item' )
				.bind( 'vmousedown', function( event ) {
					$(event.delegateTarget).addClass( 'pressed' );
				})
				.bind ('vmouseup', function(event) {
					$(event.delegateTarget).removeClass( 'pressed' );
				});


			$( document )
				.bind( 'actionbarIn', function() {
					self._animateIn( back, actions );
				})
				.bind( 'actionbarOut', function() {
					self._animateOut( back, actions );
				});
		},

		refresh: function() {
		},

		destroy: function() {
			$(this.overflowActionMenu).remove();
			$(this.overflowTabMenu).remove();
		},

		_createOverFlowItem: function(item) {
			item.addClass('menuItem light-text-fade');
			var content = item.children("p").first().html();
			item.children("p").remove();
			item.append(content);
			return item;
		},

		_createActionItem: function(item) {
			item = this._createBarItem(item);
			item.addClass("action-bar-action-item");
			return item;
		},

		_createTabItem: function(item) {
			item = this._createBarItem(item);
			item.addClass("action-bar-tab-item");
			return item;
		},

		_createBarItem: function(item) {
			var label = item.find('p').first(),
				itemImage = item.find('img').first()
					.addClass('action-bar-action-item-image')
					.appendTo(item);


			if (label) {
				var actionItemText = $(document.createElement('div'))
						.addClass('action-bar-action-item-text')
						.html(label)
						.appendTo(item);
			}

			return item;
		},

		_createBackButton: function(back, appendto) {
			var backText = $(document.createElement('div'));

			backText
				.addClass('action-bar-back-text')
				.html("<p>" + this.options.backButtonText + "</p>");

			back.addClass( 'action-bar-back' )
				.append(backText)
				.bind( 'vmousedown', function(event) {
					$(event.delegateTarget).addClass('pressed');
					window.history.back();
					return false;
				})
				.bind( 'vmouseup', function(event) {
					$(event.delegateTarget).removeClass('pressed');
				})
				.appendTo(appendto);
		},

		_createOverflowButton: function(menu) {
			return $(document.createElement('div'))
				.addClass('action-bar-overflow');
		},

		_animateIn: function(back, actions) {
			if (back) {
				back.removeClass('action-bar-back-offset-right action-bar-back-offset-left');
			}
			actions.removeClass('action-bar-actions-offset-right action-bar-actions-offset-left');
		},

		_animateOut: function(back, actions, bar, callback) {
			if (back) {
				back.addClass('action-bar-back-offset-right');
			}
			actions.addClass('action-bar-actions-offset-right');
			if (callback) {
				actions.on('webkitTransitionEnd', function caller() {actions.off('webkitTransitionEnd', caller); callback(); });
			}
		},

		_animateBelow: function(back, actions) {
			if (back) {
				back.addClass('action-bar-back-offset-left');
			}
			actions.addClass('action-bar-actions-offset-left');
		}
	});
	$( document ).bind( "pagecreate create", function( e ){
		$.mobile.actionbar.prototype.enhanceWithin( e.target );
	});
})(jQuery);
