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
			this.showActionOverflow = this.showTabOverflow = false;

			var overflow,
				item, isItemTab,
				self = this,
				o = self.options,
				bar = $( document.createElement( 'div' ) ),
				actions = $( document.createElement( 'div' ) ),
				itemList = this.actionBarArea.children( ":jqmData(role='action'), :jqmData(role='tab')" ),
				actionList = itemList.filter( ":jqmData(role='action')" ),
				tabList = itemList.filter( ":jqmData(role='tab')" ),
				back = this.actionBarArea.children( ":jqmData(role='back')").first(),

				maxTabs = (actionList.length > 0 || tabList.length > 4) ? 3 : 4,
				maxActions = ( tabList.not('[data-overflow]').length > 0 ) ? ((actionList.length > 1) ? 0 : 1 ): 3;

			$("[data-role=footer]").fixedtoolbar({ tapToggle: !o.disableTapToggle });

			this.actionBarArea.addClass('action-bar-area');
			bar.addClass('action-bar');
			actions.addClass('action-bar-actions');

			//If we have tabs we can not have a back button
			if (back.length && !tabList.length) {
				this._createBackButton(back, bar);
			} else {
				back.remove();
				actions.addClass('action-bar-actions-full-width');
			}

			if (!itemList || itemList.length < 1) {
				var emptyItem = $(document.createElement('div'));
				emptyItem.addClass('action-bar-action-item');
				actions.append(emptyItem);
			}

			var overflowNeeded = tabList.length > maxTabs,
				cloneId;
			for (var i = 0; i < tabList.length; i++) {
				item = tabList.eq(i);
				//add to tab overflow
				if(overflowNeeded || item.data("overflow")) {
					var clone = item.clone();
					this._addToTabOverflow(clone);

					if (i > maxTabs - 1 || item.data("overflow")) {
						item.remove();
						continue;
					} else {
						if(cloneId = clone.attr("id")) {
							clone.attr('data-for', cloneId).attr('id',"");
						}
					}
				}
				//Create Tab item
				actions.append(this._createTabItem(item));
			}

			for (i = 0; i < actionList.length; i++) {
				item = actionList.eq(i);
				if (i > maxActions - 1 || item.data("overflow")) {
					//add to action overflow
					this._addToActionOverflow(item);
					continue;
				}
				//Create action item
				actions.append(this._createActionItem(item));
			}

			if( this.showActionOverflow ) {
				this.overflowActionMenu.find('.menuItem').bind('vclick', {context: self}, this._hideActionOverflow);

				this.overflowActionMenu.bind('vclick', function(event){
					return false;
				});
				this._createOverflowButton(this.overflowActionMenu)
					.addClass("actions")
					.appendTo(actions)
					.bind('vclick', function(){
						self.overflowActionMenu.addClass("showMenu");

						setTimeout(function() {
							$(document).bind('vclick', {context: self}, self._hideActionOverflow);
						}, 0);
					});
			}

			if( this.showTabOverflow ) {
				this.overflowTabMenu.bind('vclick', function() {
					return false;
				});
				var tabBtn = this._createOverflowButton(this.overflowTabMenu)
					.addClass("tabs")
					.addClass("action-bar-tab-item")
					.prependTo(actions)
					.bind('vclick', function(event) {
						$('.ui-page-active, .ui-footer-fixed, .ui-header-fixed')
							.addClass('showTabHelper')
							.addClass('showTabOverflow');
						event.stopPropagation();
						setTimeout(function() {
							$(document).one('vclick', function () {
								$('.ui-page-active, .ui-footer-fixed, .ui-header-fixed')
									.removeClass('showTabOverflow')
									.one("webkitTransitionEnd",function() {
										$(this).removeClass('showTabHelper');
									});

							});
						}, 0);
					});

					this.overflowTabMenu.find(".menuItem").bind('vclick',function () {
						$('.ui-page-active, .ui-footer, .ui-header').removeClass('showTabOverflow');
						tabBtn.empty();
						$(this).find('img').clone().appendTo(tabBtn);
						$('<div class="action-bar-action-item-text"><p>' + $(this).text() + '</p></div>').appendTo(tabBtn);
						tabBtn.css('background-position-x', '-50%');

						$(".action-bar-tab-item:not(.action-bar-overflow)").one('vclick', function() {
							tabBtn.css('background-position-x', '50%');
							tabBtn.find('img').remove();
							tabBtn.find('.action-bar-action-item-text').remove();
						});
					});
			}

			bar.append(actions);

			this.actionBarArea.append(bar);

			var itemsLen, actionBarItems, itemsize;

			if ( tabList.not('[data-overflow]').length > 0) {
				actionBarItems = this.actionBarArea.find(".action-bar-tab-item").not(".tabs");
				itemsize = "action-bar-grid-" + ( actionList.length > 0 ? "tabAction" : "tabs");
			} else {
				actionBarItems = this.actionBarArea.find(".action-bar-action-item");
				itemsize = "action-bar-grid-actions";
			}

			itemsLen = actionBarItems.length;
			itemsize +=  "-" + ( ( itemsLen > 5 ) ? "e" : String.fromCharCode( 96 + itemsLen ) );
			actionBarItems.addClass(itemsize);

			$( '.action-bar-action-item' )
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

			$("[data-for]").bind("vclick", function(event) {
				$("#"+$(this).attr("data-for")).trigger(event.type);
				event.stopImmediatePropagation();
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

			item.addClass('action-bar-action-item');

			if (label) {
				var actionItemText = $(document.createElement('div'))
						.addClass('action-bar-action-item-text')
						.html(label)
						.appendTo(item);
			}

			return item;
		},

		_hideActionOverflow: function (event) {
			var self = event.data.context;
			self.overflowActionMenu.removeClass("showMenu");
			$(document).unbind('vclick', self._hideActionOverflow);
		},

		_addToTabOverflow: function(item) {
			if (!this.overflowTabMenu){
				this.overflowTabMenu = this._createOverflowMenu(this.actionBarArea, true);
				this.showTabOverflow = true;
			}

			this._addToOverflow(item, this.overflowTabMenu);
		},

		_addToActionOverflow: function(item) {
			if (!this.overflowActionMenu){
				this.overflowActionMenu = this._createOverflowMenu(this.actionBarArea, false);
				this.showActionOverflow = true;
			}
			this._addToOverflow(item, this.overflowActionMenu);
		},

		_addToOverflow: function (item, menu) {
			if ( !menu ) {
				//init tab overflow
				this.showTabOverflow = true;
			}
			item = this._createOverFlowItem(item);
			item.appendTo(menu.children(".overflowMenuContent").first());
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

		_createOverflowMenu: function(element, isLeft) {
			var overflowMenu = $(document.createElement('div'))
					.addClass("overflowMenu" + ( isLeft ? " left" : "" ) ),
				overflowMenuContent = $(document.createElement('div'))
					.addClass("overflowMenuContent")
					.appendTo(overflowMenu);
			if(isLeft) {
				element.closest( '.ui-page' ).first().before(overflowMenu);
			} else {
				element.closest( '.ui-page' ).first().append(overflowMenu);
			}
			return overflowMenu;
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
