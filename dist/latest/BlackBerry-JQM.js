/* 
*  Copyright 2012-2013 BlackBerry;
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
				collapse = $('<div data-role="collapsible" data-content-theme=' + $.mobile.getInheritedTheme( parent, "c" ) + ' data-collapsed="true" data-iconpos="right">'),
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
			select.remove();

			setTimeout(function(){
				select.appendTo(collapse);
			}, 0);

			list.bind("vclick", function(event){
				var item = $(event.target);
				self._setHeader(item.text());
				$(".checked").removeClass("checked");
				item.addClass("checked");
				select.prop('value', select.find('option:contains("' + item.text() + '")').attr('value'));
				select.trigger("change");
				collapse.trigger('collapse');
			});
		},

		_setHeader: function(text) {
			var headerText = this.header.find('.ui-btn-text'),
				headerStatusText = headerText.find('.ui-collapsible-heading-status');

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

(function($) {
    $.widget("mobile.gridview", $.mobile.widget, {

        options: {
            initSelector: ":jqmData(role='gridview')",
            margin: 0.78125
        },

        _create: function() {
            var self = this;

            self.element.addClass(function( i, orig ) {
                return orig + " ui-gridview ";
            });

            self.refresh(true);
        },

        _getChildrenByTagName: function( ele, lcName, ucName )
        {
            var results = [],
                dict = {};
                dict[ lcName ] = dict[ ucName ] = true;
                ele = ele.firstChild;
            while ( ele ) {
                if ( dict[ ele.nodeName ] ) {
                    results.push( ele );
                }
                ele = ele.nextSibling;
            }
            return $( results );
        },

        refresh: function() {

            this.parentPage = this.element.closest( ".ui-page" );

            var self = this,
                o = self.options,
                $list = this.element,
                div = this._getChildrenByTagName( $list[ 0 ], "div", "DIV" ),
                ww = window.innerWidth || $( window ).width(),
                innerDivWidth = 0,
                itemClassDict = {},
                item, itemClass;

                function fixLeft (i) {
                    return ( innerDivWidth * i + o.margin * ( i + 1 ) ) + "%";
                }

            for ( var pos = 0, numdiv = div.length; pos < numdiv; pos++ ) {
                item = div.eq( pos );
                itemClass = "ui-grid-li";

                if ( item.jqmData( "role" ) === "list-divider" ) {

                    itemClass += " ui-li ui-li-divider ui-bar-" + "b";
                    item.attr( "role", "heading" );

                } else {
                    var innerDiv = this._getChildrenByTagName( item[ 0 ], "div", "DIV" );
                    innerDivWidth = 100 / innerDiv.length - o.margin - o.margin / innerDiv.length;
                    var img = innerDiv
                            .find( "p" )
                                .addClass( "ui-grid-item-details" )
                                .css("width", ( innerDivWidth )+ "%" )
                                .css( "left", fixLeft )
                                .end()
                            .find( "img" ).css( "width", ( innerDivWidth ) + "%" );

                }

                if ( !itemClassDict[ itemClass ] ) {
                    itemClassDict[ itemClass ] = [];
                }

                itemClassDict[ itemClass ].push( item[ 0 ] );
            }

            for ( itemClass in itemClassDict ) {
                $( itemClassDict[ itemClass ] ).addClass( itemClass ).children( ".ui-btn-inner" ).addClass( itemClass );
            }

            $list.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" );
            $list.find("a").removeClass( "ui-link" ).addClass( "ui-link-inherit" );
        }

    });
    $( document ).bind( "pagecreate create", function( e ){
        $.mobile.gridview.prototype.enhanceWithin( e.target );
    });
})(jQuery);

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
			var parent = $(this.element).parent('div.ui-input-search, div.ui-input-text');
			
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
				parent = input.parent('div.ui-input-search, div.ui-input-text'),
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

(function($) {
    $.widget( "mobile.progressbar", $.mobile.widget, {

        options: {
            initSelector: "progress",
            color: "dark",
			highlightColor: '#00BC9F',
			accentColor: 'rgb(-120, 68, 39)'
        },

        _create: function() {
            this.progress = this.element
                .css( 'display', 'none' );
            this.outerElement = $( document.createElement( 'div' ) )
                .attr( 'class', 'bb-progress' )
                .insertBefore( this.progress )
                .append( this.progress );
            this.outer = $( document.createElement( 'div' ) )
                .attr( 'class', 'outer bb-progress-outer-' + this.options.color + ' bb-progress-outer-idle-background-' + this.options.color )
                .appendTo( this.outerElement );
            this.fill = $( document.createElement( 'div' ) )
                .attr( 'class', 'bb-progress-fill bb10Highlight' )
                .appendTo( this.outer );
            this.inner = $( document.createElement( 'div' ) )
                .attr( 'class', 'inner' )
                .appendTo( this.outer );

			// Get our values
            this.outerElement.maxValue = this.progress.attr( 'max' ) ? parseInt( this.progress.attr( 'max' ), 10 ) : 0;
            this.outerElement.value = this.progress.attr( 'value' ) ? parseInt( this.progress.attr( 'value' ), 10 ) : 0;

            this.setValue( this.outerElement.value );

        },

        pause: function( isPaused ) {
            var pause = ( isPaused !== undefined ) ? isPaused : true;
            if ( pause ) {
                this.fill.addClass( 'paused' );
            } else {
                this.fill.removeClass( 'paused' );
            }
        },

        setError: function( hasError ) {
            var error = ( hasError !== undefined ) ? hasError : true;
            if ( error ) {
                this.fill.addClass( 'error' );
            } else {
                this.fill.removeClass( 'error' );
            }
        },

        setValue: function( value ) {

            var percent = 0;

            if ( value === undefined || value < 0 || value > this.outerElement.maxValue ) {
                return;
            } else {
                this.outerElement.value = value;
                this.value = value;
            }

            // Calculate our percentage
            if ( value >= this.outerElement.maxValue ) {
                percent = 100;
                this.fill.addClass( 'completed' )
                    .removeClass( 'active paused error' );
            } else if ( value === 0 ) {
                this.outer.attr( 'class', 'outer bb-progress-outer-' + this.options.color + ' bb-progress-outer-idle-background-' + this.options.color );
            } else {
                this.outer.attr( 'class', 'outer bb-progress-outer-' + this.options.color );
                this.fill.attr( 'class', 'bb-progress-fill bb10Highlight' )
                    .css( 'background', '' );
                this.fill.addClass( 'active' )
                    .removeClass( 'completed paused error' );
                percent = this.outerElement.value/parseInt( this.outerElement.maxValue, 10 ) * 100;
            }

            // Set width by percentage
            this.fill.css( 'width', percent + '%' );

        }
    });
    $( document ).bind( "pagecreate create", function( e ){
        $.mobile.progressbar.prototype.enhanceWithin( e.target );
    });
})(jQuery);

