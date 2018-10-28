
jQuery(document).ready(function () {
  var initialItems = 6,
          increseCounterBy = 3;
  jQuery('.project-wrapper .project-group').addClass("filter-content");
  showMessage();

  // Search filter
  function searchFilter(filter) {
    var item = jQuery('.project-wrapper .project-group .three-col');
    if (filter) {
      jQuery(item).find("> h3:not(:Contains(" + filter + "))").parent().hide().removeClass('filtered');
      jQuery(item).find("> h3:Contains(" + filter + ")").parent().show().addClass('filtered');
      hideCategory();
    } else {
      jQuery(item).show().addClass('filtered');
      jQuery('.project-wrapper .project-group').show().removeClass('hidden').addClass("filter-content");
    }
    return false;
  }

  // Hide category based on search results
  function hideCategory() {
    jQuery('.project-wrapper .project-group').each(function (i, elem) {
      var noOfResults = jQuery(elem).find('.filtered').length,
              ifResultExist = (noOfResults != 0) ? jQuery(elem).show().removeClass('hidden').addClass("filter-content") : jQuery(elem).hide().addClass('hidden').removeClass("filter-content");
    });
  }

  function showMessage() {
    jQuery(document).on("keyup", "body .search-form .inner-container form input", function () {
      var totalItems = jQuery("body .project-group").length;
      var hiddenLength = jQuery("body .project-group.hidden").length;
      jQuery(".project-group .group-content .column-wrapper .three-col.filtered").matchHeight();
      if (hiddenLength === totalItems) {
        jQuery(".no-result").show();
        jQuery(".category-list").hide();
      } else {
        jQuery(".no-result").hide();
        jQuery(".category-list").show();
      }
    });
  }

  // Compare search expression to items
  jQuery.expr[':'].Contains = function (a, i, m) {
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
  };

  // Call search functionality on query change
  jQuery('.project-wrapper .search-form .search-query').on("keyup", function () {
    searchFilter(jQuery(this).val());
    initLoadMore();
  });

  // Initialize see more functionality
  initLoadMore();


  jQuery('.project-wrapper form input').keyup(function () {
    var $val = jQuery(this).val();
    if ($val.length > 0) {
      jQuery('.project-wrapper form span').css({"opacity": "1", "visibility": "visible"});
    } else {
      jQuery('.project-wrapper form span').css({"opacity": "0", "visibility": "hidden"});
    }
  });

  jQuery('.project-wrapper form .clear-search').click(function () {
    jQuery('.project-wrapper form span').css({"opacity": "0", "visibility": "hidden"});
    jQuery('.project-wrapper form .search-query').val('');
    jQuery(".project-wrapper .category-list").removeAttr("style");
    searchFilter(jQuery(this).val());

  });


  // Hide items more than initially visible items
  function initLoadMore() {
    jQuery('.project-wrapper .project-group').each(function (i, elem) {
      var item = jQuery(elem).find('.column-wrapper > .filtered'),
              totalItems = item.length,
              loadMore = jQuery(elem).find('.load-more'),
              loadCounter = 0;

      // Show load more button if items are greater than initial load items
      if (totalItems > initialItems) {
        loadMore.show();
        loadMoreItems(item, elem, loadCounter, totalItems);
      }
      else {
        loadMore.hide();
        loadMoreItems(item, elem, loadCounter, totalItems);
      }
    });
  }

  // See more/ See less functionality
  function loadMoreItems(item, elem, loadCounter, totalItems) {
    var limit = initialItems + (loadCounter * increseCounterBy);
    if (limit >= totalItems) {
      limit = totalItems;
      jQuery(elem).find('.load-more').html('See Less').addClass('see-less');
    } else if (limit <= initialItems) {
      limit = initialItems;
      jQuery(elem).find('.load-more').html('See More').removeClass('see-less');
    }
    var length = jQuery(item).length;
    // Show items below limit
    for (i = 0; i < limit; i++) {
      jQuery(item).eq(i).show();
    }
    // Hide items above limit
    for (i = limit; i < length; i++) {
      jQuery(item).eq(i).hide();
    }
  }

  // Hide extra data and show it on click of load more
  jQuery('.load-more').each(function () {
    var loadCounter = 0;
    jQuery(this).click(function () {
      if (jQuery(this).hasClass('see-less')) {
        loadCounter = 0;
      } else {
        loadCounter = loadCounter + 10;
      }

      var item = jQuery(this).parents('.project-group').find('.column-wrapper > .filtered'),
              totalItems = item.length,
              elem = jQuery(this).parents('.project-group');
      loadMoreItems(item, elem, loadCounter, totalItems);
    });
  });

  // Toggle filters on responsive view
  jQuery(document).on('click', '.project-wrapper .hamburger', function () {
    jQuery('.project-wrapper .category-list').addClass('open-filter');
    jQuery('html, body').css({'overflow': 'hidden'});
  });
  jQuery('.project-wrapper .category-list').on('click', ' .close-icon, ul > li > a', function () {
    jQuery('.project-wrapper .category-list').removeClass('open-filter');
    jQuery('html, body').removeAttr('style');
  });
});

// Scroll to target and activate filter on scroll
jQuery(document).ready(function () {

  jQuery(".project-wrapper .category-list li a").click(function () {
    var winWidth = jQuery(window).width();
    var hyperLink = jQuery(this).attr("href");
    var scrollOffset;
    (winWidth >= 768) ? scrollOffset = 0 : scrollOffset = 80;
    jQuery('html, body').animate({
      scrollTop: jQuery(hyperLink).offset().top - scrollOffset
    }, 1000);
  });

  jQuery(window).on("resize", function () {
    jQuery('html, body').removeAttr('style');
    jQuery(".project-group .group-content .column-wrapper .three-col").matchHeight();
  }).resize();
  var scrolled = jQuery(document).scrollTop();
  upfixCategory(scrolled);
  var scroll = jQuery(document).scrollTop();
  jQuery(window).on("scroll", function () {
    var scrolled = jQuery(document).scrollTop();
    if ((scrolled > scroll)) {
      upfixCategory(scrolled);
      /* active on scroll */
      activeUp(scrolled);
    } else if ((scrolled < scroll)) {
      downfixCategory(scrolled);
      /* active on scroll */
      activeDown(scrolled)
    }
    scroll = jQuery(document).scrollTop();
  });
});

function upfixCategory(scrolled) {
  var offsetTop = jQuery(".project-wrapper").offset().top;
  var position = (offsetTop - scrolled);
  if (position < 0) {
    jQuery(".project-wrapper .category-list, .search-form").addClass("fixed-category");
    uptopPosition(scrolled);
  }
}

function uptopPosition(scrolled) {
  var preojectLength = jQuery(".project-group.filter-content").length;
  if (preojectLength > 0) {
    var titleOffset = jQuery(".project-group.filter-content:eq(" + (preojectLength - 1) + ") .group-content").offset().top;
    var titlePosition = (titleOffset - scrolled);
    var topValue = parseInt(jQuery(".project-wrapper .category-list").css("top"));
    if (titlePosition <= topValue) {
      jQuery(".project-wrapper .category-list").css("top", titlePosition + "px");
    }
  }
}

function downfixCategory(scrolled) {
  var offsetTop = jQuery(".project-wrapper").offset().top;
  var position = (offsetTop - scrolled);
  if (position >= 0) {
    jQuery(".project-wrapper .category-list, .search-form").removeClass("fixed-category");
  }
  downtopPosition(scrolled);
}

function downtopPosition(scrolled) {
  var preojectLength = jQuery(".project-group.filter-content").length;
  if (preojectLength > 0) {
    var titleOffset = jQuery(".project-group.filter-content:eq(" + (preojectLength - 1) + ") .group-content").offset().top;
    var titlePosition = (titleOffset - scrolled);
    var topValue = parseInt(jQuery(".project-wrapper .category-list").css("top"));
    var paddingTop = parseInt(jQuery(".project-group.filter-content").css("padding-top")) + 4;
    if (titlePosition <= paddingTop) {
      jQuery(".project-wrapper .category-list").css("top", titlePosition + "px");
    } else {
      jQuery(".project-wrapper .category-list").removeAttr("style");
    }
  }

}

function activeUp(scrolled) {
  var textoffsetTop = 0;
  var textPosition = 0;
  jQuery(".project-wrapper .project-group").each(function () {
    textoffsetTop = jQuery(this).find(".group-content .column-wrapper").offset().top;
    textPosition = (textoffsetTop - scrolled);
    var windowHeight = jQuery(window).height();
    if ((textPosition > 200) && (textPosition < windowHeight)) {
      var projectId = jQuery(this).attr("id");
      jQuery(".project-wrapper .category-list li").each(function () {
        var hyperLink = jQuery(this).find("a").attr("href");
        if (hyperLink.indexOf(projectId) >= 0) {
          var offsetSecurity = jQuery("#security").offset().top;
          var securitypossition = offsetSecurity - scrolled;
          if (securitypossition === 0) {
            jQuery(".project-wrapper .category-list li a").removeClass("active");
            jQuery(".project-wrapper .category-list li a[href='#security']").addClass("active");
          } else {
            jQuery(".project-wrapper .category-list li a").removeClass("active");
            jQuery(this).find("a").addClass("active");
          }
        }
      });
    }
  });
}

function activeDown(scrolled) {
  var textoffsetTop = 0;
  var textPosition = 0;
    console.log("down");

  jQuery(".project-wrapper .project-group").each(function () {
    textoffsetTop = jQuery(this).find(".group-content .column-wrapper").offset().top;
    var height = jQuery(this).find(".group-content .column-wrapper").height();
    textPosition = ((textoffsetTop + height) - scrolled);
    var windowHeight = jQuery(window).height();
    if ((textPosition > 100) && (textPosition < windowHeight)) {
      var projectId = jQuery(this).attr("id");
      jQuery(".project-wrapper .category-list li").each(function () {
        var hyperLink = jQuery(this).find("a").attr("href");
        if (hyperLink.indexOf(projectId) >= 0) {
          var offsetSecurity = jQuery("#security").offset().top;
          var securitypossition = offsetSecurity - scrolled;
          if (securitypossition === 0) {
            jQuery(".project-wrapper .category-list li a").removeClass("active");
            jQuery(".project-wrapper .category-list li a[href='#security']").addClass("active");
          } else {
            jQuery(".project-wrapper .category-list li a").removeClass("active");
            jQuery(this).find("a").addClass("active");
          }

        }
      });
    }
    var offsetandroid = jQuery("#android").offset().top;
    var androidPosition = scrolled-offsetandroid;
    var winHeight = jQuery(window).height();
      if((200+(-androidPosition))>winHeight){
        jQuery("body .project-wrapper .category-list ul li a[href='#android']").removeClass("active");
      }
  });
}
// Use $ instead of jQuery without replacing global $
(function ($) {
  // On DOM ready
//Image responsive code

  function ImageIE() {
    if (/MSIE|Trident/.test(navigator.userAgent)) {
      window.fitie.init();
    }
  }

  $(document).ready(function () {
    ImageIE();
    $(".tab-part span").click(function () {
      $('html, body').animate({
        scrollTop: $(".project-wrapper").offset().top
      }, 1000);
    });
    $(".hero-banner .tabs li a").click(function () {
      var winWidth = $(window).width();
      var hyperLink = $(this).attr("href");
      var scrollOffset;
      (winWidth >= 768) ? scrollOffset = 0 : scrollOffset = 80;
      $('html, body').animate({
        scrollTop: $(hyperLink).offset().top - scrollOffset
      }, 1000);
    });

    $(window).on("resize", function () {
      ImageIE();
    }).resize();
  });

})(jQuery);




this.fitie=function(t){function e(){c.call(t,g+m,e);var a={boxSizing:"content-box",display:"inline-block",overflow:"hidden"};"backgroundColor backgroundImage borderColor borderStyle borderWidth bottom fontSize lineHeight height left opacity margin position right top visibility width".replace(/\w+/g,function(t){a[t]=l[t]}),d.border=d.margin=d.padding=0,d.display="block",d.height=d.width="auto",d.opacity=1;var h=t.videoWidth||t.width,s=t.videoHeight||t.height,u=h/s,v=document.createElement("object-fit");v.appendChild(t.parentNode.replaceChild(v,t));for(var p in a)v.runtimeStyle[p]=a[p];var b;"fill"===i?f?(d.width=o,d.height=n):(d["-ms-transform-origin"]="0% 0%",d["-ms-transform"]="scale("+o/h+","+n/s+")"):(r>u?"contain"===i:"cover"===i)?(b=n*u,d.width=Math.round(b)+"px",d.height=n+"px",d.marginLeft=Math.round((o-b)/2)+"px"):(b=o/u,d.width=o+"px",d.height=Math.round(b)+"px",d.marginTop=Math.round((n-b)/2)+"px")}var i=t.currentStyle["object-fit"];if(i&&/^(contain|cover|fill)$/.test(i)){var o=t.clientWidth,n=t.clientHeight,r=o/n,a=t.nodeName.toLowerCase(),d=t.runtimeStyle,l=t.currentStyle,h=t.addEventListener||t.attachEvent,c=t.removeEventListener||t.detachEvent,g=t.addEventListener?"":"on",f="img"===a,m=f?"load":"loadedmetadata";h.call(t,g+m,e),t.complete&&e()}},this.fitie.init=function(){if(document.body)for(var t=document.querySelectorAll("img,video"),e=-1;t[++e];)fitie(t[e]);else setTimeout(fitie.init)},/MSIE|Trident/.test(navigator.userAgent)&&this.fitie.init();
//# sourceMappingURL=fitie.js.map

/**
 * jquery-match-height master by @liabru
 * http://brm.io/jquery-match-height/
 * License: MIT
 */

;(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['bower_components/jquery/jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('bower_components/jquery/jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = 'master';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});
//# sourceMappingURL=main.js.map
