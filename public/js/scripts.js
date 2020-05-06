/*
 * Waveform generator ver. 1.0.0
 * Modified by Rascals Themes 2013-2018
 *
 */

var Waveform;

(function($) {

	var audio_context;
    if (typeof AudioContext !== "undefined") {
        audio_context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        audio_context = new webkitAudioContext();
    } else {
       	console.log( 'Unable to run this Web Audio API example' );
    	return;
    }

	Waveform = {

		settings : {
			canvas_width: 453,
			canvas_height: 66,
			bar_width: 3,
			bar_gap : 0.2,
			wave_start_color: "#ff7700",
			wave_end_color: "#ff2400",
			download: false,
			shadow_height : 70,
			shadow_start_color: "#ff7700",
			shadow_end_color: "#ff2400",
			shadow_opacity : 0.2,
			shadow_gap : 1, // 1px
			onComplete: function(png, pixels) {}
		},

		generate: function(file, options) {

			// preparing canvas
			this.settings.canvas = document.createElement('canvas');
			this.settings.context = this.settings.canvas.getContext('2d');

			this.settings.canvas.width = (options.canvas_width !== undefined) ? parseInt(options.canvas_width) : this.settings.canvas_width;
			this.settings.canvas.height = (options.canvas_height !== undefined) ? parseInt(options.canvas_height) : this.settings.canvas_height;

			// Wave gradient
			this.settings.wave_start_color = (options.wave_start_color !== undefined) ? options.wave_start_color : this.settings.wave_start_color;
			this.settings.wave_end_color = (options.wave_end_color !== undefined) ? options.wave_end_color : this.settings.wave_end_color;

			// Shadow gradient
			this.settings.shadow_start_color = (options.shadow_start_color !== undefined) ? options.shadow_start_color : this.settings.shadow_start_color;
			this.settings.shadow_end_color = (options.shadow_end_color !== undefined) ? options.shadow_end_color : this.settings.shadow_end_color;

			// Shadow opacity
			this.settings.shadow_opacity = (options.shadow_opacity !== undefined) ? parseFloat(options.shadow_opacity) : this.settings.shadow_opacity;

			// Shadow gap
			this.settings.shadow_gap = (options.shadow_gap !== undefined) ? parseInt(options.shadow_gap) : this.settings.shadow_gap;

			// Gap
			this.settings.bar_width = (options.bar_width !== undefined) ? parseInt(options.bar_width) : this.settings.bar_width;
			this.settings.bar_gap = (options.bar_gap !== undefined) ? parseFloat(options.bar_gap) : this.settings.bar_gap;

			this.settings.download = (options.download !== undefined) ? options.download : this.settings.download;

			this.settings.onComplete = (options.onComplete !== undefined) ? options.onComplete : this.settings.onComplete;

			this.settings.shadow_height = (options.shadow_height !== undefined) ? parseFloat(options.shadow_height) : this.settings.shadow_height;

			// read file buffer
			var reader = new FileReader();
			Waveform.audioContext = audio_context;
	        reader.onload = function(event) {

	            Waveform.audioContext.decodeAudioData(event.target.result, function(buffer) {
	                Waveform.extractBuffer(buffer);
	            });
	        };
	        reader.readAsArrayBuffer(file);
		},

		extractBuffer: function(buffer) {
		    buffer = buffer.getChannelData(0);
		    var sections = this.settings.canvas.width;
		    var len = Math.floor(buffer.length / sections);
		    var vals = [];
		    var maxHeight = this.settings.canvas.height-this.settings.shadow_height;
		    for (var i = 0; i < sections; i += this.settings.bar_width) {
		        vals.push(this.bufferMeasure(i * len, len, buffer) * 10000);
		    }

		    for (var j = 0; j < sections; j += this.settings.bar_width) {
		        var scale =  maxHeight / Math.max.apply(Math,vals);
		        var val = this.bufferMeasure(j * len, len, buffer) * 10000;
		        val *= scale;
		        val += 1;
		       
		        this.drawBar(j, val);

		        if ( this.settings.shadow_height > 0 ) {

		        	scale =  this.settings.shadow_height / Math.max.apply(Math,vals);
			        val = this.bufferMeasure(j * len, len, buffer) * 10000;
			        val *= scale;
			        val += 1;

	        		this.drawShadow(j, val);
	        	}
		    }

		    if (this.settings.download) {
		    	this.generateImage();
		    }
		    this.settings.onComplete(this.settings.canvas.toDataURL('image/png'), this.settings.context.getImageData(0, 0, this.settings.canvas.width, this.settings.canvas.height));
		    // clear canvas for redrawing
		    this.settings.context.clearRect(0, 0, this.settings.canvas.width, this.settings.canvas.height);
	    },

	    bufferMeasure: function(position, length, data) {
	        var sum = 0.0;
	        for (var i = position; i <= (position + length) - 1; i++) {
	            sum += Math.pow(data[i], 2);
	        }
	        return Math.sqrt(sum / data.length);
	    },

	    drawBar: function(i, h) {

	    	var grd = this.settings.context.createLinearGradient(0,0,0,170);
			grd.addColorStop( 0, this.settings.wave_start_color );
			grd.addColorStop( 1, this.settings.wave_end_color );

			this.settings.context.fillStyle = grd;

			var w = this.settings.bar_width;
	        if (this.settings.bar_gap !== 0) {
	            w *= Math.abs(1 - this.settings.bar_gap);
	        }
	        var x = i + (w / 2),
	            y = this.settings.canvas.height - h;

	        // Shadow
	        y = y - this.settings.shadow_height;
	        this.settings.context.fillRect(x, y, w, h);

	    },

	    drawShadow: function(i, h) {

	    	var grd = this.settings.context.createLinearGradient(0,0,0,170);
			grd.addColorStop( 0, this.settings.shadow_start_color );
			grd.addColorStop( 1, this.settings.shadow_end_color );

			this.settings.context.fillStyle = grd;

			var w = this.settings.bar_width;
	        if (this.settings.bar_gap !== 0) {
	            w *= Math.abs(1 - this.settings.bar_gap);
	        }
	        var x = i + (w / 2),
	            y = this.settings.canvas.height - this.settings.shadow_height;

	        y = y + this.settings.shadow_gap;
	        this.settings.context.globalAlpha = this.settings.shadow_opacity;
	        this.settings.context.fillRect(x, y, w, h);
	        this.settings.context.globalAlpha = 1.0;
	    },

	    generateImage: function() {
	    	var image = this.settings.canvas.toDataURL('image/png');

	    	var link = document.createElement('a');
	    	link.href = image;
	    	link.setAttribute('download', '');
	    	link.click();
	    }
	}

})(jQuery);


/*
 * SimplyAjaxLoader ver. 2.0.0
 * jQuery Ajax Page Loader Plugin
 *
 * Copyright (c) 2013-2018 Mariusz Rek
 * Rascals Themes 2013-2018
 *
 */

(function($) {

    $.SimplyAjaxLoader = function(el, options) {

        var defaults = {
			deeplinking : false,
			debug : false,
			autoload : false,
			load_start : function(){},
			load_end	: function(e, content){},
			close	: function(e){}
        }
        var plugin = this,
        	apc,
        	path = location.href,
        	is_root = location.pathname == "/",
        	apc_page,
        	pluginObj,
        	a = $( el ),
        	new_content,
        	loader = false,
        	link = false;

        plugin.settings = {};

        var init = function() {
            plugin.settings = $.extend({}, defaults, options);

            if ( typeof NProgress !== 'undefined' ) {

            	/* Configure preloader  */
				NProgress.configure({ showSpinner: false });
            	loader = true;
            }

            // Add ajax content
           	var ajax_template = '<div class="apc">' +
					'<div class="apc-block">' +
						'<div class="apc-container">' +
							'<div class="apc-close-layer"></div>' +
							'<div class="apc-page on"></div>' +
						'</div>' +
					'</div>' +
				'</div>';

            $( 'body' ).append( ajax_template );

    		// Create APC variables
    		apc = $( '.apc' );
    		apc_page = $( '.apc .apc-page' );

            // Load from hash
            if ( plugin.settings.deeplinking ) {
            	$( window ).on( 'popstate', plugin.start );
            	plugin.start();
            }

            // Events 

            // - Next
            $( document ).on( 'click', '.apc-next', plugin.click_open );

            // - Prev
            $( document ).on( 'click', '.apc-prev', plugin.click_open );

            // - Close event
            $( document ).on( 'click', '.apc-close', plugin.close );
            $( document ).on( 'click', '.apc-close-layer', plugin.close );

            // Link event
            a.each(function(){
				// Add click event
				$( this ).on( 'click', plugin.click_open );

            });
            
        }

        // After click on ajax link
        plugin.click_open = function(e) {
            
            if ( $( this ).attr( 'href' ) !== '#' ) {

				link = $( this );

				/* Change location link */
				if ( plugin.settings.deeplinking ) { 
					history.pushState( null, null, link.attr( 'href' ) );
					plugin.start();

				} else {
					plugin.load_start();
				}

	    	}
	            
	        e.preventDefault();
        }

        // Close Ajax container content
        plugin.close = function(e) {

            if ( plugin.settings.debug ) console.log('Close content.');

			apc.find( '.apc-block' ).removeClass( 'on' );

			// Animations
			setTimeout( function(){ apc.removeClass( 'on' ) }, 500 );
          	setTimeout( function(){ 
          		$( 'body' ).removeClass( 'apc-open' );

          		/* Hide preloader */
				if ( loader) {
					NProgress.done();
				}

				/* Remove link */
				if ( plugin.settings.deeplinking )  {
					history.pushState( null, "", path );
				}

          		plugin.clear_content();
          	}, 500 );

            e.preventDefault();
        }

        // Start
        plugin.start = function(e) {

        	if ( ! is_root ) {
        		is_root = true;
        		return false;
            }

            if ( window.location.hash ) {
        		return false;
        	}

        	// Prevent double page loading
        	if ( link != false ) {
        		plugin.load_start();
        		return false;
        	}

        	var href = location.pathname.replace(/^.*[\\/]/, "");


	        if ( href != '' ) {
				// Check if link is in the page content
				if ( $('a[href="'+href+'"]:first').length ) {
					link = $('a[href="'+href+'"]:first');

				// Create temporary link
				} else {
					var a_temp = document.createElement('a');
					a_temp =  $( a_temp ).attr('href', href ).addClass( 'ajax-link' );
					link = a_temp;
				}

				plugin.load_start();
			}
					
		}
        
        // Public Methods
        plugin.load_start = function(e) {
            
        	 /* Show preloader */
			if ( loader) {
				NProgress.start();
			}

           // Set Callback function
            plugin.settings.load_start.call(undefined);

            // Check if APC is visible
            if ( apc_page.find( '#ajax-container' ).length ) {
            	apc_page.addClass( 'start' );
            	setTimeout( function(){ apc_page.addClass( 'over move-container' ) }, 10 );
            	setTimeout( function(){ apc_page.removeClass( 'on start' ) }, 100 );
            	setTimeout( function(){
            		apc_page.removeClass('move-container');
            		plugin.clear_content();
            		plugin.load_ajax();
            	}, 500 );

            } else {

	        	$( 'body' ).addClass( 'apc-open' );

	        	// Animations
	        	setTimeout( function(){ apc.addClass( 'on' ) }, 100 );
	        	setTimeout( function(){ plugin.load_ajax() }, 500 );
	        }
        }


        plugin.load_ajax = function() {

        	$.ajax({
				url: link.attr( 'href' ),
				dataType: 'html',
				cache: false,
				async: true,
				success: function (data) {
					new_content = $( '<div>' + data + '</div>' ).find( '#ajax-container' );

					// Error
					if ( new_content.length <= 0 ) {
						plugin.load_error_page();
						return;
					}

					// Images Loaded
					new_content.imagesLoaded( { background: true }, function() {
						plugin.show_content();
						
					});
											
				},

				error: function (xhr, status, err) {
					plugin.load_error_page();
				}

			}); // Ajax magic

        }

        plugin.show_content = function() {

        	/* Hide preloader */
			if ( loader) {
				NProgress.done();
			}

			// Scroll to top
			apc.find( '.apc-block' ).scrollTop(0);

			// Add new content
        	apc_page.append( new_content );

        	// Create navigation
        	plugin.add_navigation();

        	// Set Callback function
			plugin.settings.load_end.call( undefined, apc_page );

			// Clear link variable
			link = false;

        	// Animations
        	if ( apc.find( '.apc-block'  ).hasClass( 'on' ) ) {
        		apc_page.addClass( 'on' );
        		setTimeout( function(){ apc_page.removeClass( 'over' ); }, 800 );
        		
        	} else {
        		apc.find( '.apc-block' ).addClass( 'on' );
        	}
        	
        }

        plugin.add_navigation = function() {
        	
        	// Check if link has naviagtion container
        	var 
        		nav_html,
        		nav_container,
        		nav_links = new Array(),
        		index,
        		prev_link = '',
        		next_link = '',
        		current_link = link.attr( 'href' ),
        		nav_color_class = 'light-nav',
        		l;

        	// Check if link has naviagtion container	
        	if ( link.attr( 'data-nav-container' ) ) {
        		nav_container = link.attr( 'data-nav-container' );
        		if ( $( nav_container ).length ) {
	        		$( '.ajax-link', nav_container ).each( function() {
	        			if ( $( this ).attr( 'href' ) !== '' || $( this ).attr( 'href' ) !== '#' ) {
					  		nav_links.push( $( this ).attr( 'href' ) );
						}
					});

	        		// Nav length
	        		l = nav_links.length-1;

	        		if ( l > 0 ) {

	        			// Create nav links
						index = nav_links.indexOf( current_link );

						if ( index == 0 ) {
							prev_link =	'#';
							next_link = nav_links[1];
						} else if ( index == l ) {
							prev_link =	nav_links[l-1];
							next_link = '#';
						} else {
							next_link = nav_links[index+1];
							prev_link = nav_links[index-1];
						}

						prev_link = '<a href="' + prev_link + '" class="arrow-nav left apc-prev" data-nav-container="' + nav_container + '"><span><i class="icon icon-angle-left"></i></span></a>';
						next_link = '<a href="' + next_link + '" class="arrow-nav right apc-next" data-nav-container="' + nav_container + '"><span><i class="icon icon-angle-right"></i></span></a>';
	        		}
	        	}
				

        	}

        	// Check bg color
        	if ( apc_page.find( '#ajax-container.light-bg' ).length ) {
        		nav_color_class = 'dark-nav';
        	}

        	apc_page.prepend( '<div class="apc-nav ' + nav_color_class + '">' + prev_link + next_link + '<a href="#" class="apc-close"><span class="pe-7s-close"></span></a></div>' );


        }

        plugin.clear_content = function() {

        	apc_page.removeClass( 'start' );
        	apc_page.empty();
        }

        plugin.load_error_page = function() {

        	$.ajax({
				url: '404.html',
				dataType: 'html',
				cache: false,
				async: true,
				success: function (data) {
					new_content = $( '<div>' + data + '</div>' ).find( '#ajax-container' );

					// Error
					if ( new_content.length <= 0 ) {
						console.log(data);
						return;
					}

					// Images Loaded
					new_content.imagesLoaded( { background: true }, function() {

						plugin.show_content();
						
					});
											
				},

				error: function (xhr, status, err) {
					console.log('xhr: ' +xhr+ ' status: '+status+' error: ' +err );
				}

			}); // Ajax magic

        }

        init();

    }

})(jQuery);


/*
 * ResVid ver. 1.0.0
 * jQuery Responsive Video Plugin
 *
 * Copyright (c) 2013-2018 Mariusz Rek
 * Rascals Themes 2013-2018
 *
 */

(function($){

 	$.fn.extend({ 
 		
		//pass the options variable to the function
 		ResVid: function(options) {


			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				syntax : ''
			}
				
			var options =  $.extend(defaults, options);

    		return $('iframe', this).each(function(i) {

    			if ( $( this ).parent().hasClass( 'wpb_video_wrapper' ) ) {
    				return;
    			}
				var 
					$o = options,
					$iframe = $(this);
					$players = /www.youtube.com|player.vimeo.com/;
				
				if ($iframe.attr('src') !== undefined && $iframe.attr('src') !== '' && $iframe.attr('src').search($players) > 0) {

					// Ratio
					var $ratio = ($iframe.height() / $iframe.width()) * 100;

					// Add some CSS to iframe
					$iframe.css({
						position : 'absolute',
						top : '0',
						left : '0',
						width : '100%',
						height : '100%'
					});

					// Add wrapper element
					$iframe.wrap('<div class="video-wrap" style="width:100%;position:relative;height:0;padding-bottom:'+$ratio+'%" />');
				}
				
				
			
    		});
    	}
	});
	
})(jQuery);


/*!
* Parallax Scroll
**/
;(function ($) {

	// if ( $( window ).width() < 750 ) {  
	// 	return;
	// }
 	$(function() {
	  ParallaxScroll.init();
	});

	var ParallaxScroll = {
	  /* PUBLIC VARIABLES */
	  showLogs: false,
	  round: 1500,

	  /* PUBLIC FUNCTIONS */
	  init: function() {
	    this._log("init");
	    if (this._inited) {
	      this._log("Already Inited");
	      this._inited = true;
	      return;
	    }
	    this._requestAnimationFrame = (function() {
	      return window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame ||
	        window.oRequestAnimationFrame ||
	        window.msRequestAnimationFrame ||
	        function( /* function */ callback, /* DOMElement */ element) {
	          window.setTimeout(callback, 1000 / 60);
	        };
	    })();
	    this._onScroll(true);
	  },

	  /* PRIVATE VARIABLES */
	  _inited: false,
	  _properties: ['x', 'y', 'z', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ', 'scale'],
	  _requestAnimationFrame: null,

	  /* PRIVATE FUNCTIONS */
	  _log: function(message) {
	    if (this.showLogs) console.log("Parallax Scroll / " + message);
	  },
	  _onScroll: function(noSmooth) {
	    var scroll = $(document).scrollTop();
	    var windowHeight = $(window).height();
	    this._log("onScroll " + scroll);
	    $("[data-parallax]").each($.proxy(function(index, el) {
	      var $el = $(el);
	      var properties = [];
	      var applyProperties = false;
	      var style = $el.data("style");
	      if (style == undefined) {
	        style = $el.attr("style") || "";
	        $el.data("style", style);
	      }
	      var datas = [$el.data("parallax")];
	      var iData;
	      for (iData = 2;; iData++) {
	        if ($el.data("parallax" + iData)) {
	          datas.push($el.data("parallax-" + iData));
	        } else {
	          break;
	        }
	      }
	      var datasLength = datas.length;
	      for (iData = 0; iData < datasLength; iData++) {
	        var data = datas[iData];
	        var scrollFrom = data["from-scroll"];
	        if (scrollFrom == undefined) scrollFrom = Math.max(0, $(el).offset().top - windowHeight);
	        scrollFrom = scrollFrom | 0;
	        var scrollDistance = data["distance"];
	        var scrollTo = data["to-scroll"];
	        if (scrollDistance == undefined && scrollTo == undefined) scrollDistance = windowHeight;
	        scrollDistance = Math.max(scrollDistance | 0, 1);
	        var easing = data["easing"];
	        var easingReturn = data["easing-return"];
	        if (easing == undefined || !$.easing || !$.easing[easing]) easing = null;
	        if (easingReturn == undefined || !$.easing || !$.easing[easingReturn]) easingReturn = easing;
	        if (easing) {
	          var totalTime = data["duration"];
	          if (totalTime == undefined) totalTime = scrollDistance;
	          totalTime = Math.max(totalTime | 0, 1);
	          var totalTimeReturn = data["duration-return"];
	          if (totalTimeReturn == undefined) totalTimeReturn = totalTime;
	          scrollDistance = 1;
	          var currentTime = $el.data("current-time");
	          if (currentTime == undefined) currentTime = 0;
	        }
	        if (scrollTo == undefined) scrollTo = scrollFrom + scrollDistance;
	        scrollTo = scrollTo | 0;
	        var smoothness = data["smoothness"];
	        if (smoothness == undefined) smoothness = 30;
	        smoothness = smoothness | 0;
	        if (noSmooth || smoothness == 0) smoothness = 1;
	        smoothness = smoothness | 0;
	        var scrollCurrent = scroll;
	        scrollCurrent = Math.max(scrollCurrent, scrollFrom);
	        scrollCurrent = Math.min(scrollCurrent, scrollTo);
	        if (easing) {
	          if ($el.data("sens") == undefined) $el.data("sens", "back");
	          if (scrollCurrent > scrollFrom) {
	            if ($el.data("sens") == "back") {
	              currentTime = 1;
	              $el.data("sens", "go");
	            } else {
	              currentTime++;
	            }
	          }
	          if (scrollCurrent < scrollTo) {
	            if ($el.data("sens") == "go") {
	              currentTime = 1;
	              $el.data("sens", "back");
	            } else {
	              currentTime++;
	            }
	          }
	          if (noSmooth) currentTime = totalTime;
	          $el.data("current-time", currentTime);
	        }
	        this._properties.map($.proxy(function(prop) {
	          var defaultProp = 0;
	          var to = data[prop];
	          if (to == undefined) return;
	          if (prop == "scale" || prop == "scaleX" || prop == "scaleY" || prop == "scaleZ") {
	            defaultProp = 1;
	          } else {
	            to = to | 0;
	          }
	          var prev = $el.data("_" + prop);
	          if (prev == undefined) prev = defaultProp;
	          var next = ((to - defaultProp) * ((scrollCurrent - scrollFrom) / (scrollTo - scrollFrom))) + defaultProp;
	          var val = prev + (next - prev) / smoothness;
	          if (easing && currentTime > 0 && currentTime <= totalTime) {
	            var from = defaultProp;
	            if ($el.data("sens") == "back") {
	              from = to;
	              to = -to;
	              easing = easingReturn;
	              totalTime = totalTimeReturn;
	            }
	            val = $.easing[easing](null, currentTime, from, to, totalTime);
	          }
	          val = Math.ceil(val * this.round) / this.round;
	          if (val == prev && next == to) val = to;
	          if (!properties[prop]) properties[prop] = 0;
	          properties[prop] += val;
	          if (prev != properties[prop]) {
	            $el.data("_" + prop, properties[prop]);
	            applyProperties = true;
	          }
	        }, this));
	      }
	      if (applyProperties) {
	        if (properties["z"] != undefined) {
	          var perspective = data["perspective"];
	          if (perspective == undefined) perspective = 800;
	          var $parent = $el.parent();
	          if (!$parent.data("style")) $parent.data("style", $parent.attr("style") || "");
	          $parent.attr("style", "perspective:" + perspective + "px; -webkit-perspective:" + perspective + "px; " + $parent.data("style"));
	        }
	        if (properties["scaleX"] == undefined) properties["scaleX"] = 1;
	        if (properties["scaleY"] == undefined) properties["scaleY"] = 1;
	        if (properties["scaleZ"] == undefined) properties["scaleZ"] = 1;
	        if (properties["scale"] != undefined) {
	          properties["scaleX"] *= properties["scale"];
	          properties["scaleY"] *= properties["scale"];
	          properties["scaleZ"] *= properties["scale"];
	        }
	        var translate3d = "translate3d(" + (properties["x"] ? properties["x"] : 0) + "px, " + (properties["y"] ? properties["y"] : 0) + "px, " + (properties["z"] ? properties["z"] : 0) + "px)";
	        var rotate3d = "rotateX(" + (properties["rotateX"] ? properties["rotateX"] : 0) + "deg) rotateY(" + (properties["rotateY"] ? properties["rotateY"] : 0) + "deg) rotateZ(" + (properties["rotateZ"] ? properties["rotateZ"] : 0) + "deg)";
	        var scale3d = "scaleX(" + properties["scaleX"] + ") scaleY(" + properties["scaleY"] + ") scaleZ(" + properties["scaleZ"] + ")";
	        var cssTransform = translate3d + " " + rotate3d + " " + scale3d + ";";
	        this._log(cssTransform);
	        $el.attr("style", "transform:" + cssTransform + " -webkit-transform:" + cssTransform + " " + style);
	      }
	    }, this));
	    if (window.requestAnimationFrame) {
	      window.requestAnimationFrame($.proxy(this._onScroll, this, false));
	    } else {
	      this._requestAnimationFrame($.proxy(this._onScroll, this, false));
	    }
	  }
	}

})(jQuery);

;(function ($) {
/**
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0 
 * @author Henry Algus <henryalgus@gmail.com>
 *
 */
 
// use this transport for "binary" data type
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
		// setup all variables
                var xhr = new XMLHttpRequest(),
		url = options.url,
		type = options.type,
		async = options.async || true,
		// blob or arraybuffer. Default is blob
		dataType = options.responseType || "blob",
		data = options.data || null,
		username = options.username || null,
		password = options.password || null;
					
                xhr.addEventListener('load', function(){
			var data = {};
			data[options.dataType] = xhr.response;
			// make callback and send data
			callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });
 
                xhr.open(type, url, async, username, password);
				
		// setup custom headers
		for (var i in headers ) {
			xhr.setRequestHeader(i, headers[i] );
		}
				
                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});
})(jQuery);