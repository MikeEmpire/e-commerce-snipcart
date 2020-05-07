// When DOM is fully loaded
jQuery(document).ready(function ($) {
  console.log("loaded!");
  /* ==================================================
	  Enable Strict Mode 
	================================================== */
  ("use strict");

  /* ==================================================
	  Main Settings 
	================================================== */
  var settings = {
    /* Audio player instance */
    audio_player: false,
  };

  /* ==================================================
	  Small Helpers 
	================================================== */

  /* "classChanged" Extend Class
 	 ----------------------------------- */
  (function (func) {
    window.$.fn.addClass = function () {
      func.apply(this, arguments);
      this.trigger("classChanged");
      return this;
    };
  })(window.$.fn.addClass);

  /* Smooth Scroll
	 ----------------------------------- */
  function scroll_to(target, speed) {
    var offset = window.$("#header").outerHeight(),
      hash = target.split("#")[1];

    if (hash) {
      hash = "#" + hash;

      if (window.$(hash).length) {
        var scroll_offset = window.$(hash).offset().top - offset;
        $("html, body").animate(
          {
            scrollTop: scroll_offset,
          },
          speed
        );
      }
    }
  }

  /* Disabe HASH links
	 ----------------------------------- */
  $('a[href="#"]').on("click", function (e) {
    e.preventDefault;
    return false;
  });

  /* Detect IE
 	 -------------------------------- */
  function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    var edge = ua.indexOf("Edge/");
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    // other browser
    return false;
  }
  var version = detectIE();
  if (version != false) {
    $("html").addClass("ie ie-" + version);
  }

  /* Bind Smooth Scroll events
	 ----------------------------------- */
  $(document).on(
    "click",
    "#header #nav li a, #responsive-nav li a, .smooth-scroll",
    function (e) {
      var target = window.$(this).attr("href");
      scroll_to(target, 900);
    }
  );

  /* "Skew" (glitch) effect
 	 ----------------------------------- */
  $(".skew-fx").bind(
    "webkitAnimationEnd mozAnimationEnd animationEnd",
    function () {
      $(this).removeClass("on");
    }
  );
  $(".skew-fx").hover(function () {
    if (window.$(window).width() > 750) {
      $(this).addClass("on");
    }
  });

  /* Masonry event hover effect
 	 ----------------------------------- */
  $(".event-brick").on("hover", function (e) {
    $(this).toggleClass("on");
  });

  /* Extend Class functions */
  $.fn.addClassDelay = function (c, d) {
    var t = window.$(this);
    setTimeout(function () {
      t.addClass(c);
    }, d);
    return this;
  };
  $.fn.removeClassDelay = function (c, d) {
    var t = window.$(this);
    setTimeout(function () {
      t.removeClass(c);
    }, d);
    return this;
  };

  /* ==================================================
	  Reload Scripts 
  ================================================== */

  /* ==================================================
	  YouTube 
	================================================== */
  function _youtube(container) {
    $(".youtube", container).each(function () {
      /* Based on the YouTube ID, we can easily find the thumbnail image */
      var src = "http://i.ytimg.com/vi/" + this.id + "/maxresdefault.jpg";

      /* If image doesn't exists get image from YouTube */
      if ($(this).find("img").length <= 0) {
        $(this).append('<img src="' + src + '">');
      }

      /* Add thumb classes */
      $(this).addClass("thumb thumb-fade");

      /* Overlay the Play icon to make it look like a video player */
      var icon_layer_template =
        "" +
        '<span class="thumb-icon trans-40">' +
        '<svg class="circle-svg" width="80" height="80" viewBox="0 0 50 50">' +
        '<circle class="circle" cx="25" cy="25" r="23" stroke="#fff" stroke-width="1" fill="none"></circle>' +
        "</svg>" +
        '<span class="pe-7s-video"></span>' +
        "</span>";

      $(this).append(icon_layer_template);

      $(document).on("click", "#" + this.id, function () {
        /* Create an iFrame with autoplay set to true */
        var iframe_url =
          "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
        if ($(this).data("params")) {
          iframe_url += "&" + $(this).data("params");
        }

        /* The height and width of the iFrame should be the same as parent */
        var iframe = $("<iframe/>", {
          frameborder: "0",
          src: iframe_url,
          width: "1200",
          height: "675",
        });

        /* Replace the YouTube thumbnail with YouTube HTML5 Player */
        $(this).replaceWith(iframe);

        /* Make movie responsive */
        if ($.fn.ResVid) {
          $(container).ResVid();
        }

        /* Pause Player */
        if (
          typeof settings.audio_player != "undefined" ||
          settings.audio_player != false
        ) {
          settings.audio_player.playerAction("pause");
        }
      });
    });
  }
  /* ==================================================
	   Lightbox
	================================================== */
  function _lightbox(container) {
    /* Image */
    $(".imagebox", container).magnificPopup({
      type: "image",
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find("img");
        },
      },
    });

    /* Iframe */
    $(".mediabox", container).magnificPopup({
      type: "iframe",
    });

    /* Theme Gallery */
    $(".gallery", container).magnificPopup({
      delegate: "a.g-item",
      callbacks: {
        elementParse: function (item) {
          if (item.el.hasClass("iframe-link")) {
            item.type = "iframe";

            /* Pause Player */
            if (
              typeof settings.audio_player != "undefined" ||
              settings.audio_player != false
            ) {
              settings.audio_player.playerAction("pause");
            }
          } else {
            item.type = "image";
          }
        },
      },
      gallery: {
        enabled: true,
      },
    });
  }

  /* ==================================================
	  Tracklist 
	================================================== */
  function _audio_player(container) {
    if (
      typeof settings.audio_player == "undefined" ||
      settings.audio_player == false
    )
      return false;

    /* Add progress container to 
		   tracklist track
		 -------------------------------- */
    if (window.$(".sp-tracklist").length) {
      $(".sp-tracklist li").each(function () {
        // If track doesn't have ".sp-content-control" container
        if (window.$(this).find(".sp-content-control").length <= 0) {
          // Create unique ID
          var temp_id =
              "sp-progress_" + Math.random().toString(36).substr(2, 9),
            progress_html =
              '<div id="' +
              temp_id +
              '" class="track-row track-row-progress sp-content-control">' +
              '<span class="sp-content-progress">' +
              '<span class="sp-content-loading"></span>' +
              '<span class="sp-content-position"></span>' +
              "</span>" +
              "</div>";

          /* Add unique ID to tracklist track "data-control" attribute */
          $(this).find(".track").attr("data-control", temp_id);

          /* Append progress html to track content */
          if (window.$(this).find(".track-row-lyrics").length) {
            $(progress_html).insertBefore(
              window.$(this).find(".track-row-lyrics")
            );
          } else {
            $(this).append(progress_html);
          }
        }
      });
    }

    /* Generate Waveform
		 -------------------------------- */
    if (window.$(".track-waveform").length) {
      $(".track-waveform").each(function () {
        var $this = window.$(this),
          id = window.$this.attr("id"),
          audio = window.$this.attr("data-audio"),
          waveform;

        if (
          Waveform != undefined &&
          id !== "undefined" &&
          audio !== "undefined" &&
          audio !== ""
        ) {
          waveform = window.$("#" + id + " .waveform")[0];
          $.ajax({
            url: audio,
            async: false,
            type: "GET",
            dataType: "binary",
            processData: false,
            success: function (data) {
              var blob = data;
              Waveform.generate(blob, {
                canvas_width: 1400,
                canvas_height: 200,
                bar_width: 4,
                bar_gap: 0.4,
                wave_start_color: "#ff7700",
                wave_end_color: "#ff2400",
                shadow_height: 70,
                shadow_start_color: "#ff7700",
                shadow_end_color: "#ff2400",
                shadow_opacity: 0.2,
                shadow_gap: 1,
                download: false,
                onComplete: function (png, pixels) {
                  var canvas = waveform;
                  var context = canvas.getContext("2d");
                  context.putImageData(pixels, 0, 0);
                  settings.audio_player.update_events(window.$this);
                },
              });
            },

            error: function (xhr, status, err) {
              console.log(status);
            },
          }); // Ajax magic
        }
      });
    }

    /* UPDATE Scamp player content 
		   and events
		 -------------------------------- */
    settings.audio_player.update_content();
    settings.audio_player.update_events("body");
  }

  /* ==================================================
	  Text Animations 
	================================================== */
  function _text_anim(container) {
    if (window.$(".text-fx", container).length) {
      window.$(".text-fx", container).each(function () {
        if (!window.$(this).hasClass("finished")) {
          window.$(this).addClass("finished");
          var c = window.$(this).html().replace("<br />", "~");
          var c = c.replace("<br>", "~");
          var e = c.split("");
          var b = "";
          var a;
          for (var d = 0; d < e.length; d++) {
            if (e[d] == " ") {
              b += " ";
            } else {
              if (e[d] == "~") {
                b += "<br />";
              } else {
                b +=
                  '<p><span class="trans-10" style="-webkit-transition-delay: ' +
                  d / 32 +
                  "s; transition-delay: " +
                  d / 32 +
                  's;">' +
                  e[d] +
                  "</span></p>";
              }
            }
          }
          window.$(this).html(b);
        }
      });
    }
    if (window.$(".text-fx-word", container).length) {
      window.$(".text-fx-word", container).each(function () {
        if (!window.$(this).hasClass("finished")) {
          window.$(this).addClass("finished");
          var d = window.$(this).html().split(" ");
          var b = "";
          var a;
          for (var c = 0; c < d.length; c++) {
            if (d[c] == " ") {
              b += " ";
            } else {
              if (d[c] == "<br>" || d[c] == "<br />") {
                b += "<br />";
              } else {
                b +=
                  '<p><span class="trans-15" style="-webkit-transition-delay: ' +
                  c / 14 +
                  "s; transition-delay: " +
                  c / 14 +
                  's;">' +
                  d[c] +
                  "</span></p>";
              }
            }
          }
          window.$(this).html(b);
        }
      });
    }
    if (window.$(".text-fx-btn", container).length) {
      window.$(".text-fx-btn .text-fx-btn-x", container).each(function () {
        if (!window.$(this).hasClass("finished")) {
          window.$(this).addClass("finished");
          var c = window.$(this).html().replace("<br />", "~");
          var c = c.replace("<br>", "~");
          var e = c.split("");
          var b = "";
          var a;
          for (var d = 0; d < e.length; d++) {
            if (e[d] == " ") {
              b += " ";
            } else {
              if (e[d] == "~") {
                b += "<br />";
              } else {
                b +=
                  '<p><span class="trans-12" style="-webkit-transition-delay: ' +
                  d / 45 +
                  "s; transition-delay: " +
                  d / 45 +
                  's;">' +
                  e[d] +
                  "</span></p>";
              }
            }
          }
          window.$(this).html(b);
        }
      });
    }
  }

  /* ==================================================
	   Masonry boxes
	================================================== */
  function _masonry(container) {
    /* Gallery Grid */
    $(".gallery-grid").isotope({
      itemSelector: ".gallery-grid-item",
      transitionDuration: 0,
    });
    setTimeout(function () {
      window.$(".gallery-grid").isotope("layout");
    }, 3000);
  }

  /* ==================================================
	  Resonsive videos 
	================================================== */
  function _responsive_videos(container) {
    if (window.$.fn.ResVid) {
      $(container).ResVid();
    }
  }

  /* ==================================================
	  Toggle Effect 
	================================================== */
  function _toggle(container) {
    $(".toggle", container).each(function () {
      /* Init */
      $(".active-toggle", this).next().show();

      /* List variables */
      var toggle = window.$(this);

      /* Click on Toggle Heading */
      $("h4.toggle-title", this).on("click", function (e) {
        if (window.$(this).is(".active-toggle")) {
          $(this).removeClass("active-toggle");
          $(".toggle-content", toggle).slideUp(400);
        } else {
          $(this).addClass("active-toggle");
          $(".toggle-content", toggle).slideDown(400);
        }
        e.preventDefault;
      });
    });
  }

  /* ==================================================
	  Tabs 
	================================================== */
  function _tabs(container) {
    $(".tabs-wrap", container).each(function () {
      /* List variables */
      var tabs = window.$(this);

      /* Click on Tab */
      $("ul.tabs li a", tabs).on("click", function (e) {
        if (!window.$(this).is("on")) {
          var tab = window.$(this).attr("href");
          if (window.$(tab).length) {
            $(".tab-content").removeClass("on");
            $("ul.tabs li a", tabs).removeClass("on");
            $(tab).addClass("on");
            $(this).addClass("on");
          }
        }
        return false;
        e.preventDefault;
      });
    });
  }

  /* ==================================================
	  BX Slider 
	================================================== */
  function _bxslider(container) {
    if (window.$(".layers-slider").length) {
      var layers_slider = window.$(".layers-slider").bxSlider({
        mode: "fade",
        auto: false,
        speed: 1000,
        pager: true,
        controls: true,
        pause: 5000,
        touchEnabled: true,
        onSliderLoad: function (slide) {
          setTimeout(function () {
            var init_height = window
              .$(".layers-slider li", layers_slider)
              .outerHeight();
            window.$(".bx-viewport", layers_slider).height(init_height);
          }, 100);
          window
            .$(".layers-slider li.on .title", layers_slider)
            .addClassDelay("on", 1000);
          $(".layers-slider li.on .sub-title", layers_slider).addClassDelay(
            "on",
            1200
          );
          $(".layers-slider li.on .thumb-icon", layers_slider).addClassDelay(
            "on",
            1300
          );
        },
        onSlideBefore: function (slide) {
          slide.addClass("start");
          slide.addClassDelay("over", 10);
          slide.parent().children("li").removeClassDelay("on start", 100);
          slide.addClassDelay("on", 500);
          slide.removeClassDelay("over", 800);
          $(slide).find(".title").removeClass("on");
          $(slide).find(".sub-title").removeClass("on");
          $(slide).find(".thumb-icon").removeClass("on");
        },
        onSlideAfter: function (slide) {
          $(slide).find(".title").addClassDelay("on", 200);
          $(slide).find(".sub-title").addClassDelay("on", 600);
          $(slide).find(".thumb-icon").addClassDelay("on", 700);
        },
      });
    }

    if (window.$(".testi-slider").length) {
      var testi_slider = window.$(".testi-slider").bxSlider({
        mode: "fade",
        auto: false,
        speed: 1000,
        pager: true,
        controls: true,
        pause: 5000,
        touchEnabled: true,
        onSliderLoad: function (slide) {
          setTimeout(function () {
            var init_height = window
              .$(".testi-slider li", testi_slider)
              .outerHeight();
            window.$(".bx-viewport", testi_slider).height(init_height);
          }, 100);
        },
        onSlideBefore: function (slide) {
          slide.addClass("start");
          slide.addClassDelay("over", 10);
          slide.parent().children("li").removeClassDelay("on start", 100);
          slide.addClassDelay("on", 500);
          slide.removeClassDelay("over", 800);
        },
      });
    }
  }

  /* ==================================================
	  Countdown 
	================================================== */
  function _countdown(container) {
    if (window.$.fn.countdown) {
      $(".countdown").each(function (e) {
        var date = window.$(this).data("event-date");

        window.$(this).countdown(date, function (event) {
          varwindow.$this = window.$(this);

          switch (event.type) {
            case "seconds":
            case "minutes":
            case "hours":
            case "days":
            case "weeks":
            case "daysLeft":
              window.$this.find("." + event.type).html(event.value);
              break;

            case "finished":
              break;
          }
        });
      });
    }
  }

  /* ==================================================
	  Google Maps 
	================================================== */
  function _google_maps(container) {
    if (window.$.fn.gmap3) {
      $(".gmap", container).each(function () {
        var $gmap = window.$(this),
          marker = "images/map-marker.png",
          address = window.$gmap.data(
            "address"
          ) /* Google map address e.g 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia' */,
          zoom = window.$gmap.data("zoom") /* Map zoom value. Default: 16 */,
          zoom_control /* Use map zoom. Default: true */,
          scrollwheel; /* Enable mouse scroll whell for map zooming: Default: false */

        if (window.$gmap.data("zoom_control") == "true") {
          zoom_control = true;
        } else {
          zoom_control = false;
        }

        if (window.$gmap.data("scrollwheel") == "true") {
          scrollwheel = true;
        } else {
          scrollwheel = false;
        }

        $gmap
          .gmap3({
            address: address,
            zoom: zoom,
            zoomControl: zoom_control /* Use map zoom. Default: true */,
            scrollwheel: scrollwheel /* Enable mouse scroll whell for map zooming: Default: false */,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, "style1"],
            },
            styles: [
              {
                featureType: "all",
                elementType: "labels",
                stylers: [
                  {
                    visibility: "on",
                  },
                ],
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    saturation: 36,
                  },
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 40,
                  },
                ],
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    visibility: "on",
                  },
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 16,
                  },
                ],
              },
              {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 20,
                  },
                ],
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 17,
                  },
                  {
                    weight: 1.2,
                  },
                ],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#ffffff",
                  },
                ],
              },
              {
                featureType: "administrative.neighborhood",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#aaaaaa",
                  },
                ],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 20,
                  },
                ],
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 21,
                  },
                  {
                    visibility: "on",
                  },
                ],
              },
              {
                featureType: "poi.business",
                elementType: "geometry",
                stylers: [
                  {
                    visibility: "on",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [
                  {
                    lightness: "0",
                  },
                  {
                    visibility: "on",
                  },
                  {
                    color: "#ff7700",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    visibility: "off",
                  },
                  {
                    color: "#000000",
                  },
                ],
              },
              {
                featureType: "road.highway.controlled_access",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#e1300e",
                  },
                ],
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 18,
                  },
                ],
              },
              {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#575757",
                  },
                ],
              },
              {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#ffffff",
                  },
                ],
              },
              {
                featureType: "road.arterial",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#282828",
                  },
                ],
              },
              {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 16,
                  },
                ],
              },
              {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#999999",
                  },
                ],
              },
              {
                featureType: "road.local",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    saturation: "-52",
                  },
                  {
                    color: "#212121",
                  },
                ],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 19,
                  },
                ],
              },
              {
                featureType: "transit.line",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#e1300e",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000",
                  },
                  {
                    lightness: 17,
                  },
                  {
                    visibility: "on",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#1c1c1c",
                  },
                ],
              },
            ],
          })
          .marker({
            address: address,
            icon: marker,
          });
      });
    }
  }

  /* ==================================================
	  Text Slider 
	================================================== */
  function _text_slider(container) {
    if (window.$(".text-slider", container).length <= 0) {
      return;
    }

    // For each instance
    $(".text-slider", container).each(function () {
      (varwindow.$this = window.$(this)),
        (delay = parseInt(window.$this.attr("data-delay"), 10)),
        handle,
        (index = 1),
        (l = window.$(this).find(".text-slide").length - 1),
        (delay = delay * 1000);
      if (l == 0) {
        return;
      }

      var _change_slide = function () {
        $this
          .find(".text-slide:eq( " + index + " )")
          .hide()
          .removeClass("visible")
          .find(".on")
          .removeClass("on");
        index++;
        if (index > l) {
          index = 0;
        }
        $this
          .find(".text-slide:eq( " + index + " )")
          .show()
          .addClass("visible");
        $this.find(".visible h2").addClassDelay("on", 100);
        $this.find(".visible h6").addClassDelay("on", 300);
      };
      _change_slide();
      handle = setInterval(_change_slide, delay);
      delay = delay * 1000;
    });
  }

  /* ==================================================
	  Homepage 
	================================================== */
  function _homepage_init(container) {
    /* Set itro image animations */
    $(".intro-image", container).addClass("on");
    $(".intro-image", container).removeClassDelay("on blur-fx trans-20", 2100);

    /* Get instagram feed */
    _instagram("html");

    /* Set isotope layout */
    if (window.$.fn.isotope) {
      $(".items, .gallery-grid").isotope("layout");
    }
  }

  /* ==================================================
	  Shopping Cart 
	================================================== */
  (function () {});

  /* ==================================================
	  Navigation 
	================================================== */
  (function () {
    /* Main navigation
	 	----------------------------------- */
    var $nav = window.$("#nav").children("ul");

    // Create main navigation
    $("li", window.$nav)
      .on("mouseenter", function () {
        var $this = window.$(this),
          $sub = window.$(this).children("ul");
        if ($sub.length) window.$(this).addClass("active");
        $sub.hide().stop(true, true).fadeIn(200);
      })
      .on("mouseleave", function () {
        $(this)
          .removeClass("active")
          .children("ul")
          .stop(true, true)
          .fadeOut(50);
      });

    /* Change Active State on Scroll
		   Show or hide navigation background
	 	----------------------------------- */
    var sections = window.$(".section"),
      nav = window.$("#nav"),
      header = window.$("#header"),
      offset = 20,
      hidden_nav = false,
      header_height = header.outerHeight(),
      first_section = window.$(".section").eq(0),
      last_section = window.$(".site .section").last();

    // Disable hidden navigation
    if (header.hasClass("hide-navigation")) {
      hidden_nav = true;
    }

    var scroll_actions = function () {
      var cur_pos = window.$(this).scrollTop(),
        last_pos = last_section.offset().top + last_section.outerHeight();

      /* Show or hide naviagtion background */
      if (hidden_nav) {
        if (cur_pos > 0) {
          header.removeClass("hide-navigation");
        } else {
          header.addClass("hide-navigation");
        }
      }

      /* Add .active class to navigation if
			is over on .section container */
      if (cur_pos < first_section.offset().top - header_height - offset) {
        sections.removeClass("active");
        nav.find("a").removeClass("active on");
      } else if (cur_pos > last_pos - header_height - offset) {
        sections.removeClass("active");
        nav.find("a").removeClass("active on");
      } else {
        sections.each(function (i) {
          var top = window.$(this).offset().top - header_height - offset,
            bottom = top + window.$(this).outerHeight();

          if (cur_pos >= top && cur_pos <= bottom) {
            nav.find("a").removeClass("active on");
            sections.removeClass("active");
            $(this).addClass("active");
            nav
              .find('a[href*="#' + $(this).attr("id") + '"]')
              .addClass("active on");
          }
        });
      }
    };

    $(window).on("scroll", scroll_actions);

    scroll_actions();

    /* Responsive navigation
 	 	----------------------------------- */

    /* Clone top navigation and add to the sidebar */
    $("#nav ul, #nav li").addClass("top-nav-el");
    var top_nav = window.$("#nav > ul").children().clone();
    if (window.$("#responsive-nav ul").length <= 0) {
      $("#responsive-nav").append("<ul></ul>");
      $("#responsive-nav ul").append(top_nav);
    } else {
      $(top_nav).insertBefore("#responsive-nav ul > li:first-child:eq(0)");
    }
    $("#responsive-nav li").each(function () {
      if (window.$(this).children("ul").length) {
        $(this)
          .find("a")
          .first()
          .after('<i class="submenu-trigger icon icon-angle-down"></i>');
      }
      $(this).addClass("text-fx-btn rotate-x-360");
      $(this).find("a").addClass("trans-10 text-fx-btn-x");
    });

    $("#responsive-nav > ul > li").addClass("first-child");
    $(
      '#responsive-nav .submenu-trigger, #responsive-nav .menu-item-has-children > a[href="#"]'
    ).on("click", function (e) {
      e.preventDefault();
      var li = window.$(this).closest("li"),
        main_index = window.$(this).parents(".first-child").index();
      $(
        "#responsive-nav > ul > li:not(:eq( " + main_index + " )) ul:visible"
      ).slideUp();
      $(
        "#responsive-nav > ul > li:not(:eq( " +
          main_index +
          " )) li, #responsive-nav > ul > li:not(:eq( " +
          main_index +
          " ))"
      ).removeClass("opened");
      li.toggleClass("opened").find(" > ul").slideToggle(400);
    });

    /* Menu Trigger */
    $(".responsive-trigger").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("responsive-block-on");
    });

    $(".responsive-block-close, .responsive-block-layer").on("click", function (
      e
    ) {
      e.preventDefault();
      $("body").removeClass("responsive-block-on");
    });

    /* Close Slidebar after click on hash anchor and ajax links */
    $(document).on(
      "click",
      '.responsive-block-content a[href*="#"], .responsive-block-content a.ajax-link',
      function (e) {
        if (window.$(this).attr("href") != "#") {
          $("body").removeClass("responsive-block-on");
        }
      }
    );

    /* Responsive Social Icons
		 -------------------------------- */

    if (window.$("#responsive-social").length) {
      /* Clone top social icons and put in sidebar */
      var $social_block = window.$("#social-block .social-icons").clone();
      $("#responsive-social")
        .append($social_block)
        .find(".social-icons")
        .addClass("on");
    }

    /* Icon navigation
 	 	----------------------------------- */

    /* Show/Hide Search Block */
    $("#nav-search").on("click", function (e) {
      $(this).toggleClass("on");
      $("#search-block").slideToggle(400);
      e.preventDefault();
    });

    $("#search-block").on("focusout", function () {
      $("#nav-search").removeClass("on");
      $(this).slideUp(400);
      e.preventDefault();
    });

    /* Show/Hide Social Block */
    $("#nav-social").on("click", function (e) {
      $(this).toggleClass("on");

      $("#social-block").slideToggle(400, function () {
        $("#social-block .show-fx").toggleClass("on");
      });

      e.preventDefault();
    });

    /* Show Player Trigger */
    $('a[href="#show-player"]').on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (window.$("#scamp_player").hasClass("sp-show-player")) {
        $("#scamp_player")
          .removeClass("sp-show-player")
          .addClass("sp-hidden-player");
        $(this).removeClass("on");
      } else {
        $("#scamp_player")
          .removeClass("sp-hidden-player")
          .addClass("sp-show-player");
        $(this).addClass("on");
      }
    });
  })();

  /* ==================================================
	  Events 
	================================================== */
  (function () {
    /* Scroll */
    if (window.$("#events-scroll").length) {
      var Scrollbar = window.Scrollbar;
      Scrollbar.init(document.querySelector("#events-scroll"), {
        alwaysShowTracks: true,
      });
    }
  })();

  /* ==================================================
	  Parallax 
	================================================== */
  (function () {
    if (window.$(window).width() < 750) {
      return;
    }

    var images;

    function init() {
      images = [].slice.call(window.$(".parallax"));
      if (!images.length) {
        return;
      }

      $(window).on("scroll", doParallax);
      $(window).on("resize", doParallax);
      doParallax();
    }

    function getViewportHeight() {
      var a = document.documentElement.clientHeight,
        b = window.innerHeight;
      return a < b ? b : a;
    }

    function getViewportScroll() {
      if (typeof window.scrollY != "undefined") {
        return window.scrollY;
      }
      if (typeof pageYOffset != "undefined") {
        return pageYOffset;
      }
      var doc = document.documentElement;
      doc = doc.clientHeight ? doc : document.body;
      return doc.scrollTop;
    }

    function doParallax() {
      var el,
        elOffset,
        elHeight,
        offset = getViewportScroll(),
        vHeight = getViewportHeight();

      for (var i in images) {
        el = images[i];
        if (window.$(el).css("background-image") != "none") {
          elOffset = el.offsetTop;
          elHeight = el.offsetHeight;

          if (elOffset > offset + vHeight || elOffset + elHeight < offset) {
            continue;
          }

          el.style.backgroundPosition =
            "50% " + Math.round(((elOffset - offset) * 3) / 12) + "px";
        }
      }
    }

    init();
  })();

  /* ==================================================
	  Music Player 
	================================================== */
  (function () {
    if (window.$("#scamp_player").length <= 0) {
      return;
    }

    settings.audio_player = newwindow.$.ScampPlayer(window.$("#scamp_player"), {
      /* Default Scamp Player options */
      volume: 70 /* Start volume level */,
      autoplay: false /* Autoplay track */,
      no_track_image:
        "js/audio-player/img/no-track-image.png" /* Placeholder image for track cover */,
      path: "js/audio-player/",
      loop: false /* Loop tracklist */,
      load_first_track: true /* Load First track */,
      random: false /* Random playing */,
      titlebar: false /* Replace browser title on track title */,
      check_files: false /* Checks whether a track file exists */,
      client_id: "23f5c38e0aa354cdd0e1a6b4286f6aa4" /* Soundcloud Client ID */,
      shoutcast: true,
      shoutcast_interval: 20000,
      labels: {
        play: "Play",
        cover: "Cover",
        title: "Title",
        buy: "Buy",
        remove: "Remove",
        empty_queue: "Empty Queue",
      },
      debug: false,
    });

    /* Check Player Status
 	 	----------------------------------- */
    $("#scamp_player").on("classChanged", function () {
      if (window.$(this).hasClass("sp-show-player")) {
        $('a[href="#show-player"]').addClass("status-show-player");
      } else {
        $('a[href="#show-player"]').removeClass("status-show-player");
      }

      if (window.$(this).hasClass("playing")) {
        $('a[href="#show-player"]')
          .addClass("status-playing")
          .removeClass("status-loading status-paused");
        var pos = window.$("#scamp_player .sp-position").width(),
          el_w = $(window).width(),
          max = 144,
          p,
          x;

        pos = parseFloat(pos / el_w) * 100;
        pos = pos.toFixed(0);
        p = pos / 100;
        x = p * max;
        $(".nav-player-btn.circle-btn .circle").css({
          "stroke-dasharray": +x + " 144",
        });
      } else if (window.$(this).hasClass("loading")) {
        $('a[href="#show-player"]')
          .addClass("status-loading")
          .removeClass("status-playing status-paused");
      } else if (window.$(this).hasClass("paused")) {
        $('a[href="#show-player"]')
          .addClass("status-paused")
          .removeClass("status-playing status-loading");
      } else {
        $('a[href="#show-player"]').removeClass(
          "status-playing status-loading status-paused"
        );
      }
    });

    /* Lyrics button
		 -------------------------------- */
    $("body").on("click", ".sp-tracklist li .track-lyrics", function () {
      (varwindow.$this = window.$(this)),
        ($li = window.$this.parents("li")),
        ($list = window.$this.parents(".sp-tracklist"));

      $list.find("li").not($li).find(".track-row-lyrics").slideUp();
      $list
        .find("li")
        .not($li)
        .find(".track-lyrics.is-active")
        .removeClass("is-active");

      $this.toggleClass("is-active");
      $li.find(".track-row-lyrics").slideToggle();
    });
  })();

  /* ==================================================
	  Stats 
	================================================== */
  (function () {
    $("ul.stats").each(function () {
      /* Variables */
      var $max_el = 6,
        $stats = window.$(this),
        $stats_values = [],
        $stats_names = [],
        $timer = $stats.data("timer"),
        $stats_length;

      /* Get all stats and convert to array */
      /* Set length variable */
      $("li", $stats).each(function (i) {
        $stats_values[i] = window.$(".stat-value", this).text();
        $stats_names[i] = window.$(".stat-name", this).text();
      });
      $stats_length = $stats_names.length;

      /* Clear list */
      $stats.html("");

      /* Init */
      display_stats();

      /* Setwindow.$timer */
      var init = setInterval(function () {
        display_stats();
      }, $timer);

      /* Generate new random array */
      function randsort(c, l, m) {
        var o = new Array();
        for (var i = 0; i < m; i++) {
          var n = Math.floor(Math.random() * l);
          var index = jQuery.inArray(n, o);
          if (index >= 0) i--;
          else o.push(n);
        }
        return o;
      }

      /* Display stats */
      function display_stats() {
        var random_list = randsort($stats_names, $stats_length, $max_el);
        var i = 0;

        /* First run */
        if (window.$("li", $stats).length == 0) {
          for (var e = 0; e < random_list.length; e++) {
            $($stats).append(
              '<li class="stat-col"><span class="stat-value"></span><span class="stat-name"></span></li>'
            );
          }
        }

        var _display = setInterval(function () {
          var num = random_list[i];
          var stat_name = window.$("li", $stats).eq(i).find(".stat-name");
          stat_name.animate(
            { bottom: "-40px", opacity: 0 },
            400,
            "easeOutQuart",
            function () {
              $(this).text($stats_names[num]);
              $(this).css({ bottom: "-40px", opacity: 1 });
              $(this).animate({ bottom: 0 }, 400, "easeOutQuart");
            }
          );

          var stat_value = window.$("li", $stats).eq(i).find(".stat-value");
          display_val(stat_value, num);
          i++;
          if (i == random_list.length) clearInterval(_display);
        }, 600);
      }

      /* Display value */
      function display_val(val, num) {
        var val_length = $stats_values[num].length,
          val_int = parseInt($stats_values[num], 10),
          counter = 10,
          delta = 10,
          new_val;

        // Delta
        if (val_int <= 50) delta = 1;
        else if (val_int > 50 && val_int <= 100) delta = 3;
        else if (val_int > 100 && val_int <= 1000) delta = 50;
        else if (val_int > 1000 && val_int <= 2000) delta = 100;
        else if (val_int > 2000 && val_int <= 3000) delta = 150;
        else if (val_int > 3000 && val_int <= 4000) delta = 200;
        else delta = 250;

        var _display = setInterval(function () {
          counter = counter + delta;
          new_val = counter;
          val.text(new_val);
          if (new_val >= val_int) {
            clearInterval(_display);
            val.text($stats_values[num]);
          }
        }, 40);
      }
    });
  })();

  /* ==================================================
	  Music 
	================================================== */
  (function () {
    if (!$.fn.isotope) {
      return;
    }

    var $container = $(".items"),
      $win = $(window);

    if ($container.length) {
      /* Isotope
	 	 	 ------------------------- */
      $(window).on("resize", function () {
        $container.isotope("layout");
      });

      $container.isotope({
        itemSelector: ".item",
        onLayout: function () {
          $win.trigger("scroll");
        },
      });

      // Add filter event
      var _items_filter = function ($el, $data) {
        // Add all filter class
        $el.addClass("item-filter");

        // Add categories to item classes
        $(".item", $container).each(function (i) {
          var $this = $(this);
          $this.addClass($this.attr($data));
        });

        $el.on("click", "a", function (e) {
          var $this = $(this),
            $option = $this.attr($data);

          // Add active filter class
          $(".item-filter").removeClass("active-filter");
          $el.addClass("active-filter");
          $(".item-filter:not(.active-filter) li a").removeClass("is-active");
          $(".item-filter:not(.active-filter) li:first-child a").addClass(
            "is-active"
          );

          // Add/remove active class for this filter
          $el.find("a").removeClass("is-active");
          $this.addClass("is-active");

          if ($option) {
            if ($option !== "*")
              $option = $option.replace($option, "." + $option);
            $container.isotope({ filter: $option });
          }

          e.preventDefault();
        });

        $el.find("a").first().addClass("is-active");
      };

      // Init filters
      if ($(".filter-list").length) {
        _items_filter($(".filter-list"), "data-categories");
      }
    }
  })();

  /* ==================================================
	  Contact Form 
	================================================== */
  (function () {
    var $form = window.$(".contact-form");

    $form.append('<div id="ajax-message" style="display:none"></div>');
    var $ajax_message = window.$("#ajax-message");

    /* Submit click event */
    $form.on("click", "input[type=submit]", function (e) {
      $ajax_message.hide();

      /* Show loader */
      NProgress.start();

      /* Ajax request */
      $.post("plugins/contact-form.php", $form.serialize(), function (data) {
        /* Show ajax-message */
        $ajax_message.html(data).show();

        /* Hide preloader */
        NProgress.done();

        /* If the message was sent, clear form fields */
        if (data.indexOf("success") != -1) {
          clear_form_elements($form);
        }
      });

      e.preventDefault();
    });

    function clear_form_elements(el) {
      window
        .$(el)
        .find(":input")
        .each(function () {
          switch (this.type) {
            case "password":
            case "select-multiple":
            case "select-one":
            case "text":
            case "email":
            case "textarea":
              window.$(this).val("");
              break;
            case "checkbox":
            case "radio":
              this.checked = false;
          }
        });
    }
  })();

  /* ==================================================
	  Ajax Loader 
  ================================================== */
  /* ==================================================
	  Ajax Loader 
	================================================== */
  (function () {
    /* Create a new instance of the plugin */
    var SimplyAjaxLoader = new $.SimplyAjaxLoader($(".ajax-link"), {
      deeplinking: true,
      load_start: function () {},
      load_end: function (container) {
        /* I get fired when the ajax is ending load content */
        /* Init scripts */
        _text_anim(container);
        _lightbox(container);
        _responsive_videos(container);
        _toggle(container);
        _tabs(container);
        _masonry(container);
        _bxslider(container);
        _countdown(container);
        _google_maps(container);
        _text_slider(container);
        _audio_player(container);
        _youtube(container);
      },
      close: function () {},
    });
  })();

  /* ==================================================
	   INIT Dynamic scripts
	   Scripts will be loaded also by AJAX request
	================================================== */
  _text_anim("html");
  _lightbox("html");
  _responsive_videos("html");
  _toggle("html");
  _tabs("html");
  _masonry("html");
  _bxslider("html");
  _countdown("html");
  _google_maps("html");
  _audio_player("html");
  _youtube("html");

  /* ==================================================
	  Loader 
	================================================== */
  // (function () {
  //   if ($(".loading-layer").length <= 0) {
  //     reload_scripts("html");
  //     return false;
  //   }
  //   $("body").addClass("page-loading");
  //   $(".loading-layer .show-fx").addClass("on");

  //   var countImages = $(".site img").length;

  //   setTimeout(function () {
  //     $(".site")
  //       .imagesLoaded({ background: true })
  //       .always(function (instance) {
  //         $(".loading-layer").addClass("hide-layer");

  //         setTimeout(function () {
  //           $(".loading-layer")
  //             .css("visibility", "hidden")
  //             .removeClass("hide-layer show-layer");
  //           $("body").removeClass("page-loading");

  //           _homepage_init("html");
  //           _text_slider("#intro");
  //         }, 1400);
  //       })
  //       .progress(function (instance, image) {
  //         if (image.isLoaded) {
  //           $(image.img).addClass("loaded");

  //           var countLoadedImages = $(".site img.loaded ").length,
  //             bar_width = 100 * (countLoadedImages / countImages) + "%";

  //           $("#loading-layer .progress-bar").css({ width: bar_width });
  //         }
  //       });
  //   }, 1000);
  // })();
});
