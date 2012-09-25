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

