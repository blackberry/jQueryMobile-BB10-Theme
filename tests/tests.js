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

/*
 * mobile dialog unit tests
 */

(function($) {

	function computedStyleTest(s, json, message) {
        ok(s.length > 0, message + " - selector should exist" );
        s.each( function(i) {
            for ( var prop in json) {
                //check if we are looking for the inverse
                var notProp = !!(/^!/.test(prop)),
                    //Clean up the property
                    cssProp = prop.replace(/^!/, "");

                //Check if we are dealing with an array
                if (json[prop] instanceof Array) {
                    var bool = false;
                    for ( var j = 0; j < json[prop].length; j++) {
                        bool |= (window.getComputedStyle(s.get(i), null)[cssProp] === json[prop][j]);
                    }
                    if(notProp) {
                        ok(!bool, message + " " + cssProp + " - should not have any" + ": " + json[prop] );
                    } else {
                        ok(bool, message + " " + cssProp + " - should have one of" + ": " + json[prop] );
                    }
                } else {
                    if(notProp) {
                        notEqual(window.getComputedStyle(s.get(i), null)[cssProp], json[prop], message + " - should not have " + prop + ": " + json[prop] );
                    } else {
                        equal(window.getComputedStyle(s.get(i), null)[cssProp], json[prop], message + " - should have " + prop + ": " + json[prop] );
                    }
                }
            }
        });
    }

    module ('Lists', {
        setup: function() {
        }
    });

    test( "List item", function() {
        computedStyleTest($("#list li"), {height: "121px"}, "li height");
    });

	module ('Buttons', {
		setup: function() {}
	});

	test( 'Buttons', function() {
		computedStyleTest ($('a.ui-btn[data-role="button"]'), {height: "101px", margin: "20px", "min-width": "354px", "font-size": "40px"}, "Button Dimensions");
		computedStyleTest ($('a.ui-btn[data-role="button"] .ui-btn-inner'), {"font-size":"40px"}, "Button Inner");
	});

	module ('Text Fields', {
		setup: function() {}
	});

	test('Text Fields', function () {
		computedStyleTest ($('input.ui-input-text'), {height: "85px", "font-size": "40px", margin: "20px", padding: "10px 20px"}, "Text Field Dimensions");
	});

	module ('Toggle Switches', {
		setup: function() {}
	});

	test('Toggle Switches', function () {
		computedStyleTest ($('.ui-slider.ui-slider-switch'), {height: "72px", "font-size": "40px", margin: "20px"}, "Toggle Bounding");
	});

	module ('Slider Bar - Basic', {
		setup: function() {}
	});

	test('Slider Bar - Basic', function () {
		computedStyleTest ($('div.ui-slider:not(div.ui-slider-switch)'), {height: "16px", "font-size": "40px", margin: "40px 20px", padding: "0px"}, "Slider Bar - Basic");
	});
	
	module ('Action bar', {
	
	});
	
	test('Structural Classes are applied', function () {
		var actionBarArea = $("#action-bar-area");
		ok ( actionBarArea.hasClass("action-bar-area"));
	});
	
	test('has at most 3 actions visible', function () {
		var actionBarArea = $("#action-bar-area");
		ok( actionBarArea.find("[data-role='action']").length <= 3);
	});
	
	test('has at most 4 tabs visible', function () {
		var actionBarArea = $("#action-bar-area");
		ok( actionBarArea.find("[data-role='tab']").length <= 4);
	});
	
	test('has at most 5 items visible', function () {
		var actionBarArea = $("#action-bar-area");
		ok( actionBarArea.find(".action-bar-action-item").length <= 5);
	});
	
	test('if actionbar has tabs, back button is not available', function () {
		var actionBarArea = $("#action-bar-area2");
		ok( !(actionBarArea.find( "[data-role='tab']" ).length > 0 && actionBarArea.find( ".action-bar-back" ).length > 0 ) );
	});
	
	test('Back Button', function () {
		var actionBarArea1 = $("#action-bar-area");
		var actionBarArea2 = $("#action-bar-area2");
		var actionBarArea3 = $("#action-bar-area3");
		var backBtn = actionBarArea3.find( ".action-bar-back" );
		ok( actionBarArea1.find( ".action-bar-back" ).length === 0, "Back Button should not be created if it does not exist" );
		ok( actionBarArea2.find( ".action-bar-back" ).length === 0, "Back Button should not exist if tabs are present" );
		ok( backBtn.length === 1, "Back Button should exist" );
		backBtn = backBtn.first();
		ok( backBtn.find( ".action-bar-back-text" ).length === 1, "Back Button should have text" );
	});
	
	test('Tab Button', function () {
		var actionBarArea = $("#action-bar-area"),
			tabs = actionBarArea.find( "[data-role='tab']" ),
			tab, img, text;

		for (var i = 0; i < tabs.length; i++){
			tab = tabs.eq(i);
			img = tab.find("img").first();
			text = tab.find(".action-bar-action-item-text");
			
			ok( tab.hasClass("action-bar-action-item"), "Tab Button should have action item class" );
			ok( tab.hasClass("action-bar-tab-item"), "Tab Button should have tab item class" );
			ok( tab.find("img").length === 1, "Tab button should have an image" );
			ok( img.hasClass("action-bar-action-item-image") );
			ok( text.length === 1, "Tab button should have text");
		}
	});
	
	test('Action Button', function () {
		var actionBarArea = $("#action-bar-area3"),
			action = actionBarArea.find( "[data-role='action']" ).first(),
			img = action.find("img").first(),
			text = action.find(".action-bar-action-item-text");
			
		ok( action.hasClass("action-bar-action-item"), "Action Button should have action item class" );
		ok( !action.hasClass("action-bar-tab-item"), "Action Button should not have tab item class" );
		ok( action.find("img").length === 1, "Tab button should have an image" );
		ok( img.hasClass("action-bar-action-item-image") );
		ok( text.length === 1, "Tab button should have text");
	});
	
	test('Tab Overflow Button', function () {
		var actionBarArea = $("#action-bar-area"),
			overflow = actionBarArea.find(".tabs"),
			noOverlow = $("#action-bar-area3").find(".tabs");
			
		ok( overflow.length === 1, "There should only be one tab overflow");
		ok( noOverlow.length === 0, "There should not be a tab overflow");
		
		overflow = overflow.first();
		ok( overflow.hasClass("action-bar-overflow") );
		ok( overflow.hasClass("action-bar-tab-item") );
	});
	
	test('Tab Overflow Menu', function () {
		
		var overflow = $(document).find(".left"),
			menuItems = overflow.find(".menuItem");
		
		ok(overflow.length > 0, "An overflow menu should exist");
		ok(menuItems.length === 4);
		
	});
	
	
	test('Action Overflow', function () {
		var actionBarArea = $("#action-bar-area"),
			overflow = actionBarArea.find(".actions"),
			noOverlow = $("#action-bar-area3").find(".actions");
			
		ok( overflow.length === 1, "There should only be one action overflow");
		ok( noOverlow.length === 0, "There should not be an action overflow");
		
		overflow = overflow.first();
		ok( overflow.hasClass("action-bar-overflow") );
	});
	
	test('if there are more than one tab, there is only one action or the action overflow visible', function () {
		var actionbars = $('[data-role="actionbar"]'),
			actionBarArea, actions, tabs;
		
		for (var i = 0; i < actionbars.length; i++) {
			actionBarArea = actionbars.eq(i);
			tabs = actionBarArea.find( "[data-role='tab']" );
			actions = actionBarArea.find( "[data-role='action']" );
			if(tabs.length > 0) {
				ok( actions.length <= 1);
			}
		}
	});
	
})( jQuery );
