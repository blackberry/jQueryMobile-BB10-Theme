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
