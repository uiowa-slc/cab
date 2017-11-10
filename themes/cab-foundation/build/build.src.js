/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.8.3',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   goo.gl/v3V4Gp
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);

!function(a,b,c,d){"use strict";function e(a){return("string"==typeof a||a instanceof String)&&(a=a.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g,"")),a}var f=function(b){for(var c=b.length,d=a("head");c--;)0===d.has("."+b[c]).length&&d.append('<meta class="'+b[c]+'" />')};f(["foundation-mq-small","foundation-mq-small-only","foundation-mq-medium","foundation-mq-medium-only","foundation-mq-large","foundation-mq-large-only","foundation-mq-xlarge","foundation-mq-xlarge-only","foundation-mq-xxlarge","foundation-data-attribute-namespace"]),a(function(){"undefined"!=typeof FastClick&&"undefined"!=typeof c.body&&FastClick.attach(c.body)});var g=function(b,d){if("string"==typeof b){if(d){var e;if(d.jquery){if(e=d[0],!e)return d}else e=d;return a(e.querySelectorAll(b))}return a(c.querySelectorAll(b))}return a(b,d)},h=function(a){var b=[];return a||b.push("data"),this.namespace.length>0&&b.push(this.namespace),b.push(this.name),b.join("-")},i=function(a){for(var b=a.split("-"),c=b.length,d=[];c--;)0!==c?d.push(b[c]):this.namespace.length>0?d.push(this.namespace,b[c]):d.push(b[c]);return d.reverse().join("-")},j=function(b,c){var d=this,e=function(){var e=g(this),f=!e.data(d.attr_name(!0)+"-init");e.data(d.attr_name(!0)+"-init",a.extend({},d.settings,c||b,d.data_options(e))),f&&d.events(this)};return g(this.scope).is("["+this.attr_name()+"]")?e.call(this.scope):g("["+this.attr_name()+"]",this.scope).each(e),"string"==typeof b?this[b].call(this,c):void 0},k=function(a,b){function c(){b(a[0])}function d(){if(this.one("load",c),/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var a=this.attr("src"),b=a.match(/\?/)?"&":"?";b+="random="+(new Date).getTime(),this.attr("src",a+b)}}return a.attr("src")?void(a[0].complete||4===a[0].readyState?c():d.call(a)):void c()};b.matchMedia=b.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(c),function(a){function c(){d&&(g(c),i&&a.fx.tick())}for(var d,e=0,f=["webkit","moz"],g=b.requestAnimationFrame,h=b.cancelAnimationFrame,i="undefined"!=typeof a.fx;e<f.length&&!g;e++)g=b[f[e]+"RequestAnimationFrame"],h=h||b[f[e]+"CancelAnimationFrame"]||b[f[e]+"CancelRequestAnimationFrame"];g?(b.requestAnimationFrame=g,b.cancelAnimationFrame=h,i&&(a.fx.timer=function(b){b()&&a.timers.push(b)&&!d&&(d=!0,c())},a.fx.stop=function(){d=!1})):(b.requestAnimationFrame=function(a){var c=(new Date).getTime(),d=Math.max(0,16-(c-e)),f=b.setTimeout(function(){a(c+d)},d);return e=c+d,f},b.cancelAnimationFrame=function(a){clearTimeout(a)})}(a),b.Foundation={name:"Foundation",version:"5.5.1",media_queries:{small:g(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"small-only":g(".foundation-mq-small-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),medium:g(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"medium-only":g(".foundation-mq-medium-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),large:g(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"large-only":g(".foundation-mq-large-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xlarge:g(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"xlarge-only":g(".foundation-mq-xlarge-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xxlarge:g(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,"")},stylesheet:a("<style></style>").appendTo("head")[0].sheet,global:{namespace:d},init:function(a,c,d,e,f){var h=[a,d,e,f],i=[];if(this.rtl=/rtl/i.test(g("html").attr("dir")),this.scope=a||this.scope,this.set_namespace(),c&&"string"==typeof c&&!/reflow/i.test(c))this.libs.hasOwnProperty(c)&&i.push(this.init_lib(c,h));else for(var j in this.libs)i.push(this.init_lib(j,c));return g(b).load(function(){g(b).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider")}),a},init_lib:function(b,c){return this.libs.hasOwnProperty(b)?(this.patch(this.libs[b]),c&&c.hasOwnProperty(b)?("undefined"!=typeof this.libs[b].settings?a.extend(!0,this.libs[b].settings,c[b]):"undefined"!=typeof this.libs[b].defaults&&a.extend(!0,this.libs[b].defaults,c[b]),this.libs[b].init.apply(this.libs[b],[this.scope,c[b]])):(c=c instanceof Array?c:new Array(c),this.libs[b].init.apply(this.libs[b],c))):function(){}},patch:function(a){a.scope=this.scope,a.namespace=this.global.namespace,a.rtl=this.rtl,a.data_options=this.utils.data_options,a.attr_name=h,a.add_namespace=i,a.bindings=j,a.S=this.utils.S},inherit:function(a,b){for(var c=b.split(" "),d=c.length;d--;)this.utils.hasOwnProperty(c[d])&&(a[c[d]]=this.utils[c[d]])},set_namespace:function(){var b=this.global.namespace===d?a(".foundation-data-attribute-namespace").css("font-family"):this.global.namespace;this.global.namespace=b===d||/false/i.test(b)?"":b},libs:{},utils:{S:g,throttle:function(a,b){var c=null;return function(){var d=this,e=arguments;null==c&&(c=setTimeout(function(){a.apply(d,e),c=null},b))}},debounce:function(a,b,c){var d,e;return function(){var f=this,g=arguments,h=function(){d=null,c||(e=a.apply(f,g))},i=c&&!d;return clearTimeout(d),d=setTimeout(h,b),i&&(e=a.apply(f,g)),e}},data_options:function(b,c){function d(a){return!isNaN(a-0)&&null!==a&&""!==a&&a!==!1&&a!==!0}function e(b){return"string"==typeof b?a.trim(b):b}c=c||"options";var f,g,h,i={},j=function(a){var b=Foundation.global.namespace;return a.data(b.length>0?b+"-"+c:c)},k=j(b);if("object"==typeof k)return k;for(h=(k||":").split(";"),f=h.length;f--;)g=h[f].split(":"),g=[g[0],g.slice(1).join(":")],/true/i.test(g[1])&&(g[1]=!0),/false/i.test(g[1])&&(g[1]=!1),d(g[1])&&(g[1]=-1===g[1].indexOf(".")?parseInt(g[1],10):parseFloat(g[1])),2===g.length&&g[0].length>0&&(i[e(g[0])]=e(g[1]));return i},register_media:function(b,c){Foundation.media_queries[b]===d&&(a("head").append('<meta class="'+c+'"/>'),Foundation.media_queries[b]=e(a("."+c).css("font-family")))},add_custom_rule:function(a,b){if(b===d&&Foundation.stylesheet)Foundation.stylesheet.insertRule(a,Foundation.stylesheet.cssRules.length);else{var c=Foundation.media_queries[b];c!==d&&Foundation.stylesheet.insertRule("@media "+Foundation.media_queries[b]+"{ "+a+" }")}},image_loaded:function(a,b){var c=this,d=a.length;0===d&&b(a),a.each(function(){k(c.S(this),function(){d-=1,0===d&&b(a)})})},random_str:function(){return this.fidx||(this.fidx=0),this.prefix=this.prefix||[this.name||"F",(+new Date).toString(36)].join("-"),this.prefix+(this.fidx++).toString(36)},match:function(a){return b.matchMedia(a).matches},is_small_up:function(){return this.match(Foundation.media_queries.small)},is_medium_up:function(){return this.match(Foundation.media_queries.medium)},is_large_up:function(){return this.match(Foundation.media_queries.large)},is_xlarge_up:function(){return this.match(Foundation.media_queries.xlarge)},is_xxlarge_up:function(){return this.match(Foundation.media_queries.xxlarge)},is_small_only:function(){return!(this.is_medium_up()||this.is_large_up()||this.is_xlarge_up()||this.is_xxlarge_up())},is_medium_only:function(){return this.is_medium_up()&&!this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up()},is_large_only:function(){return this.is_medium_up()&&this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up()},is_xlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&!this.is_xxlarge_up()},is_xxlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&this.is_xxlarge_up()}}},a.fn.foundation=function(){var a=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(a)),this})}}(jQuery,window,window.document),function(a,b,c){"use strict";Foundation.libs.abide={name:"abide",version:"5.5.1",settings:{live_validate:!0,validate_on_blur:!0,focus_on_invalid:!0,error_labels:!0,error_class:"error",timeout:1e3,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(a){var b=c.getElementById(a.getAttribute(this.add_namespace("data-equalto"))).value,d=a.value,e=b===d;return e}}},timer:null,init:function(a,b,c){this.bindings(b,c)},events:function(b){var c=this,d=c.S(b).attr("novalidate","novalidate"),e=d.data(this.attr_name(!0)+"-init")||{};this.invalid_attr=this.add_namespace("data-invalid"),d.off(".abide").on("submit.fndtn.abide validate.fndtn.abide",function(a){var b=/ajax/i.test(c.S(this).attr(c.attr_name()));return c.validate(c.S(this).find("input, textarea, select").get(),a,b)}).on("reset",function(){return c.reset(a(this))}).find("input, textarea, select").off(".abide").on("blur.fndtn.abide change.fndtn.abide",function(a){e.validate_on_blur===!0&&c.validate([this],a)}).on("keydown.fndtn.abide",function(a){e.live_validate===!0&&9!=a.which&&(clearTimeout(c.timer),c.timer=setTimeout(function(){c.validate([this],a)}.bind(this),e.timeout))})},reset:function(b){b.removeAttr(this.invalid_attr),a(this.invalid_attr,b).removeAttr(this.invalid_attr),a("."+this.settings.error_class,b).not("small").removeClass(this.settings.error_class)},validate:function(a,b,c){for(var d=this.parse_patterns(a),e=d.length,f=this.S(a[0]).closest("form"),g=/submit/.test(b.type),h=0;e>h;h++)if(!d[h]&&(g||c))return this.settings.focus_on_invalid&&a[h].focus(),f.trigger("invalid").trigger("invalid.fndtn.abide"),this.S(a[h]).closest("form").attr(this.invalid_attr,""),!1;return(g||c)&&f.trigger("valid").trigger("valid.fndtn.abide"),f.removeAttr(this.invalid_attr),c?!1:!0},parse_patterns:function(a){for(var b=a.length,c=[];b--;)c.push(this.pattern(a[b]));return this.check_validation_and_apply_styles(c)},pattern:function(a){var b=a.getAttribute("type"),c="string"==typeof a.getAttribute("required"),d=a.getAttribute("pattern")||"";return this.settings.patterns.hasOwnProperty(d)&&d.length>0?[a,this.settings.patterns[d],c]:d.length>0?[a,new RegExp(d),c]:this.settings.patterns.hasOwnProperty(b)?[a,this.settings.patterns[b],c]:(d=/.*/,[a,d,c])},check_validation_and_apply_styles:function(b){var c=b.length,d=[],e=this.S(b[0][0]).closest("[data-"+this.attr_name(!0)+"]");for(e.data(this.attr_name(!0)+"-init")||{};c--;){var f,g,h=b[c][0],i=b[c][2],j=h.value.trim(),k=this.S(h).parent(),l=h.getAttribute(this.add_namespace("data-abide-validator")),m="radio"===h.type,n="checkbox"===h.type,o=this.S('label[for="'+h.getAttribute("id")+'"]'),p=i?h.value.length>0:!0,q=[];if(h.getAttribute(this.add_namespace("data-equalto"))&&(l="equalTo"),f=k.is("label")?k.parent():k,l&&(g=this.settings.validators[l].apply(this,[h,i,f]),q.push(g)),m&&i)q.push(this.valid_radio(h,i));else if(n&&i)q.push(this.valid_checkbox(h,i));else if(q.push(b[c][1].test(j)&&p||!i&&h.value.length<1||a(h).attr("disabled")?!0:!1),q=[q.every(function(a){return a})],q[0])this.S(h).removeAttr(this.invalid_attr),h.setAttribute("aria-invalid","false"),h.removeAttribute("aria-describedby"),f.removeClass(this.settings.error_class),o.length>0&&this.settings.error_labels&&o.removeClass(this.settings.error_class).removeAttr("role"),a(h).triggerHandler("valid");else{this.S(h).attr(this.invalid_attr,""),h.setAttribute("aria-invalid","true");var r=f.find("small."+this.settings.error_class,"span."+this.settings.error_class),s=r.length>0?r[0].id:"";s.length>0&&h.setAttribute("aria-describedby",s),f.addClass(this.settings.error_class),o.length>0&&this.settings.error_labels&&o.addClass(this.settings.error_class).attr("role","alert"),a(h).triggerHandler("invalid")}d.push(q[0])}return d=[d.every(function(a){return a})]},valid_checkbox:function(a,b){var a=this.S(a),c=a.is(":checked")||!b||a.get(0).getAttribute("disabled");return c?a.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class):a.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),c},valid_radio:function(a){for(var b=a.getAttribute("name"),c=this.S(a).closest("[data-"+this.attr_name(!0)+"]").find("[name='"+b+"']"),d=c.length,e=!1,f=!1,g=0;d>g;g++)c[g].getAttribute("disabled")?(f=!0,e=!0):c[g].checked?e=!0:f&&(e=!1);for(var g=0;d>g;g++)e?this.S(c[g]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class):this.S(c[g]).attr(this.invalid_attr,"").parent().addClass(this.settings.error_class);return e},valid_equal:function(a,b,d){var e=c.getElementById(a.getAttribute(this.add_namespace("data-equalto"))).value,f=a.value,g=e===f;return g?(this.S(a).removeAttr(this.invalid_attr),d.removeClass(this.settings.error_class),label.length>0&&settings.error_labels&&label.removeClass(this.settings.error_class)):(this.S(a).attr(this.invalid_attr,""),d.addClass(this.settings.error_class),label.length>0&&settings.error_labels&&label.addClass(this.settings.error_class)),g},valid_oneof:function(a,b,c,d){var a=this.S(a),e=this.S("["+this.add_namespace("data-oneof")+"]"),f=e.filter(":checked").length>0;if(f?a.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class):a.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),!d){var g=this;e.each(function(){g.valid_oneof.call(g,this,null,null,!0)})}return f}}}(jQuery,window,window.document),function(a){"use strict";Foundation.libs.accordion={name:"accordion",version:"5.5.1",settings:{content_class:"content",active_class:"active",multi_expand:!1,toggleable:!0,callback:function(){}},init:function(a,b,c){this.bindings(b,c)},events:function(){var b=this,c=this.S;c(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion","["+this.attr_name()+"] > .accordion-navigation > a",function(d){var e=c(this).closest("["+b.attr_name()+"]"),f=b.attr_name()+"="+e.attr(b.attr_name()),g=e.data(b.attr_name(!0)+"-init")||b.settings,h=c("#"+this.href.split("#")[1]),i=a("> .accordion-navigation",e),j=i.children("."+g.content_class),k=j.filter("."+g.active_class);return d.preventDefault(),e.attr(b.attr_name())&&(j=j.add("["+f+"] dd > ."+g.content_class),i=i.add("["+f+"] .accordion-navigation")),g.toggleable&&h.is(k)?(h.parent(".accordion-navigation").toggleClass(g.active_class,!1),h.toggleClass(g.active_class,!1),g.callback(h),h.triggerHandler("toggled",[e]),void e.triggerHandler("toggled",[h])):(g.multi_expand||(j.removeClass(g.active_class),i.removeClass(g.active_class)),h.addClass(g.active_class).parent().addClass(g.active_class),g.callback(h),h.triggerHandler("toggled",[e]),void e.triggerHandler("toggled",[h]))})},off:function(){},reflow:function(){}}}(jQuery,window,window.document),function(a){"use strict";Foundation.libs.alert={name:"alert",version:"5.5.1",settings:{callback:function(){}},init:function(a,b,c){this.bindings(b,c)},events:function(){var b=this,c=this.S;a(this.scope).off(".alert").on("click.fndtn.alert","["+this.attr_name()+"] .close",function(a){var d=c(this).closest("["+b.attr_name()+"]"),e=d.data(b.attr_name(!0)+"-init")||b.settings;a.preventDefault(),Modernizr.csstransitions?(d.addClass("alert-close"),d.on("transitionend webkitTransitionEnd oTransitionEnd",function(){c(this).trigger("close").trigger("close.fndtn.alert").remove(),e.callback()})):d.fadeOut(300,function(){c(this).trigger("close").trigger("close.fndtn.alert").remove(),e.callback()})})},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.clearing={name:"clearing",version:"5.5.1",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close, div.clearing-blackout",open_selectors:"",skip_selector:"",touch_label:"",init:!1,locked:!1},init:function(a,b,c){var d=this;Foundation.inherit(this,"throttle image_loaded"),this.bindings(b,c),d.S(this.scope).is("["+this.attr_name()+"]")?this.assemble(d.S("li",this.scope)):d.S("["+this.attr_name()+"]",this.scope).each(function(){d.assemble(d.S("li",this))})},events:function(d){var e=this,f=e.S,g=a(".scroll-container");g.length>0&&(this.scope=g),f(this.scope).off(".clearing").on("click.fndtn.clearing","ul["+this.attr_name()+"] li "+this.settings.open_selectors,function(a,b,c){var b=b||f(this),c=c||b,d=b.next("li"),g=b.closest("["+e.attr_name()+"]").data(e.attr_name(!0)+"-init"),h=f(a.target);a.preventDefault(),g||(e.init(),g=b.closest("["+e.attr_name()+"]").data(e.attr_name(!0)+"-init")),c.hasClass("visible")&&b[0]===c[0]&&d.length>0&&e.is_open(b)&&(c=d,h=f("img",c)),e.open(h,b,c),e.update_paddles(c)}).on("click.fndtn.clearing",".clearing-main-next",function(a){e.nav(a,"next")}).on("click.fndtn.clearing",".clearing-main-prev",function(a){e.nav(a,"prev")}).on("click.fndtn.clearing",this.settings.close_selectors,function(a){Foundation.libs.clearing.close(a,this)}),a(c).on("keydown.fndtn.clearing",function(a){e.keydown(a)}),f(b).off(".clearing").on("resize.fndtn.clearing",function(){e.resize()}),this.swipe_events(d)},swipe_events:function(){var a=this,b=a.S;b(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(a){a.touches||(a=a.originalEvent);var c={start_page_x:a.touches[0].pageX,start_page_y:a.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:d};b(this).data("swipe-transition",c),a.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(c){if(c.touches||(c=c.originalEvent),!(c.touches.length>1||c.scale&&1!==c.scale)){var d=b(this).data("swipe-transition");if("undefined"==typeof d&&(d={}),d.delta_x=c.touches[0].pageX-d.start_page_x,Foundation.rtl&&(d.delta_x=-d.delta_x),"undefined"==typeof d.is_scrolling&&(d.is_scrolling=!!(d.is_scrolling||Math.abs(d.delta_x)<Math.abs(c.touches[0].pageY-d.start_page_y))),!d.is_scrolling&&!d.active){c.preventDefault();var e=d.delta_x<0?"next":"prev";d.active=!0,a.nav(c,e)}}}).on("touchend.fndtn.clearing",".visible-img",function(a){b(this).data("swipe-transition",{}),a.stopPropagation()})},assemble:function(b){var c=b.parent();if(!c.parent().hasClass("carousel")){c.after('<div id="foundationClearingHolder"></div>');var d=c.detach(),e="";if(null!=d[0]){e=d[0].outerHTML;var f=this.S("#foundationClearingHolder"),g=c.data(this.attr_name(!0)+"-init"),h={grid:'<div class="carousel">'+e+"</div>",viewing:g.templates.viewing},i='<div class="clearing-assembled"><div>'+h.viewing+h.grid+"</div></div>",j=this.settings.touch_label;Modernizr.touch&&(i=a(i).find(".clearing-touch-label").html(j).end()),f.after(i).remove()}}},open:function(b,d,e){function f(){setTimeout(function(){this.image_loaded(m,function(){1!==m.outerWidth()||o?g.call(this,m):f.call(this)}.bind(this))}.bind(this),100)}function g(b){var c=a(b);c.css("visibility","visible"),i.css("overflow","hidden"),j.addClass("clearing-blackout"),k.addClass("clearing-container"),l.show(),this.fix_height(e).caption(h.S(".clearing-caption",l),h.S("img",e)).center_and_label(b,n).shift(d,e,function(){e.closest("li").siblings().removeClass("visible"),e.closest("li").addClass("visible")}),l.trigger("opened.fndtn.clearing")}var h=this,i=a(c.body),j=e.closest(".clearing-assembled"),k=h.S("div",j).first(),l=h.S(".visible-img",k),m=h.S("img",l).not(b),n=h.S(".clearing-touch-label",k),o=!1;a("body").on("touchmove",function(a){a.preventDefault()}),m.error(function(){o=!0}),this.locked()||(l.trigger("open.fndtn.clearing"),m.attr("src",this.load(b)).css("visibility","hidden"),f.call(this))},close:function(b,d){b.preventDefault();var e,f,g=function(a){return/blackout/.test(a.selector)?a:a.closest(".clearing-blackout")}(a(d)),h=a(c.body);return d===b.target&&g&&(h.css("overflow",""),e=a("div",g).first(),f=a(".visible-img",e),f.trigger("close.fndtn.clearing"),this.settings.prev_index=0,a("ul["+this.attr_name()+"]",g).attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),e.removeClass("clearing-container"),f.hide(),f.trigger("closed.fndtn.clearing")),a("body").off("touchmove"),!1},is_open:function(a){return a.parent().prop("style").length>0},keydown:function(b){var c=a(".clearing-blackout ul["+this.attr_name()+"]"),d=this.rtl?37:39,e=this.rtl?39:37,f=27;b.which===d&&this.go(c,"next"),b.which===e&&this.go(c,"prev"),b.which===f&&this.S("a.clearing-close").trigger("click").trigger("click.fndtn.clearing")},nav:function(b,c){var d=a("ul["+this.attr_name()+"]",".clearing-blackout");b.preventDefault(),this.go(d,c)},resize:function(){var b=a("img",".clearing-blackout .visible-img"),c=a(".clearing-touch-label",".clearing-blackout");b.length&&(this.center_and_label(b,c),b.trigger("resized.fndtn.clearing"))},fix_height:function(a){var b=a.parent().children(),c=this;return b.each(function(){var a=c.S(this),b=a.find("img");a.height()>b.outerHeight()&&a.addClass("fix-height")}).closest("ul").width(100*b.length+"%"),this},update_paddles:function(a){a=a.closest("li");var b=a.closest(".carousel").siblings(".visible-img");a.next().length>0?this.S(".clearing-main-next",b).removeClass("disabled"):this.S(".clearing-main-next",b).addClass("disabled"),a.prev().length>0?this.S(".clearing-main-prev",b).removeClass("disabled"):this.S(".clearing-main-prev",b).addClass("disabled")},center_and_label:function(a,b){return b.css(!this.rtl&&b.length>0?{marginLeft:-(b.outerWidth()/2),marginTop:-(a.outerHeight()/2)-b.outerHeight()-10}:{marginRight:-(b.outerWidth()/2),marginTop:-(a.outerHeight()/2)-b.outerHeight()-10,left:"auto",right:"50%"}),this},load:function(a){var b;return b="A"===a[0].nodeName?a.attr("href"):a.closest("a").attr("href"),this.preload(a),b?b:a.attr("src")},preload:function(a){this.img(a.closest("li").next()).img(a.closest("li").prev())},img:function(a){if(a.length){var b=new Image,c=this.S("a",a);b.src=c.length?c.attr("href"):this.S("img",a).attr("src")}return this},caption:function(a,b){var c=b.attr("data-caption");return c?a.html(c).show():a.text("").hide(),this},go:function(a,b){var c=this.S(".visible",a),d=c[b]();this.settings.skip_selector&&0!=d.find(this.settings.skip_selector).length&&(d=d[b]()),d.length&&this.S("img",d).trigger("click",[c,d]).trigger("click.fndtn.clearing",[c,d]).trigger("change.fndtn.clearing")},shift:function(a,b,c){var d,e=b.parent(),f=this.settings.prev_index||b.index(),g=this.direction(e,a,b),h=this.rtl?"right":"left",i=parseInt(e.css("left"),10),j=b.outerWidth(),k={};b.index()===f||/skip/.test(g)?/skip/.test(g)&&(d=b.index()-this.settings.up_count,this.lock(),d>0?(k[h]=-(d*j),e.animate(k,300,this.unlock())):(k[h]=0,e.animate(k,300,this.unlock()))):/left/.test(g)?(this.lock(),k[h]=i+j,e.animate(k,300,this.unlock())):/right/.test(g)&&(this.lock(),k[h]=i-j,e.animate(k,300,this.unlock())),c()},direction:function(a,b,c){var d,e=this.S("li",a),f=e.outerWidth()+e.outerWidth()/4,g=Math.floor(this.S(".clearing-container").outerWidth()/f)-1,h=e.index(c);return this.settings.up_count=g,d=this.adjacent(this.settings.prev_index,h)?h>g&&h>this.settings.prev_index?"right":h>g-1&&h<=this.settings.prev_index?"left":!1:"skip",this.settings.prev_index=h,d},adjacent:function(a,b){for(var c=b+1;c>=b-1;c--)if(c===a)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},off:function(){this.S(this.scope).off(".fndtn.clearing"),this.S(b).off(".fndtn.clearing")},reflow:function(){this.init()}}}(jQuery,window,window.document),function(a,b,c){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"5.5.1",settings:{active_class:"open",disabled_class:"disabled",mega_class:"mega",align:"bottom",is_hover:!1,hover_timeout:150,opened:function(){},closed:function(){}},init:function(b,c,d){Foundation.inherit(this,"throttle"),a.extend(!0,this.settings,c,d),this.bindings(c,d)},events:function(){var d=this,e=d.S;e(this.scope).off(".dropdown").on("click.fndtn.dropdown","["+this.attr_name()+"]",function(b){var c=e(this).data(d.attr_name(!0)+"-init")||d.settings;(!c.is_hover||Modernizr.touch)&&(b.preventDefault(),e(this).parent("[data-reveal-id]")&&b.stopPropagation(),d.toggle(a(this)))}).on("mouseenter.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(a){var b,c,f=e(this);clearTimeout(d.timeout),f.data(d.data_attr())?(b=e("#"+f.data(d.data_attr())),c=f):(b=f,c=e("["+d.attr_name()+'="'+b.attr("id")+'"]'));var g=c.data(d.attr_name(!0)+"-init")||d.settings;e(a.currentTarget).data(d.data_attr())&&g.is_hover&&d.closeall.call(d),g.is_hover&&d.open.apply(d,[b,c])}).on("mouseleave.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(){var a,b=e(this);if(b.data(d.data_attr()))a=b.data(d.data_attr(!0)+"-init")||d.settings;else var c=e("["+d.attr_name()+'="'+e(this).attr("id")+'"]'),a=c.data(d.attr_name(!0)+"-init")||d.settings;d.timeout=setTimeout(function(){b.data(d.data_attr())?a.is_hover&&d.close.call(d,e("#"+b.data(d.data_attr()))):a.is_hover&&d.close.call(d,b)}.bind(this),a.hover_timeout)}).on("click.fndtn.dropdown",function(b){var f=e(b.target).closest("["+d.attr_name()+"-content]"),g=f.find("a");return g.length>0&&"false"!==f.attr("aria-autoclose")&&d.close.call(d,e("["+d.attr_name()+"-content]")),b.target!==c&&!a.contains(c.documentElement,b.target)||e(b.target).closest("["+d.attr_name()+"]").length>0?void 0:!e(b.target).data("revealId")&&f.length>0&&(e(b.target).is("["+d.attr_name()+"-content]")||a.contains(f.first()[0],b.target))?void b.stopPropagation():void d.close.call(d,e("["+d.attr_name()+"-content]"))}).on("opened.fndtn.dropdown","["+d.attr_name()+"-content]",function(){d.settings.opened.call(this)}).on("closed.fndtn.dropdown","["+d.attr_name()+"-content]",function(){d.settings.closed.call(this)}),e(b).off(".dropdown").on("resize.fndtn.dropdown",d.throttle(function(){d.resize.call(d)},50)),this.resize()},close:function(b){var c=this;b.each(function(){var d=a("["+c.attr_name()+"="+b[0].id+"]")||a("aria-controls="+b[0].id+"]");d.attr("aria-expanded","false"),c.S(this).hasClass(c.settings.active_class)&&(c.S(this).css(Foundation.rtl?"right":"left","-99999px").attr("aria-hidden","true").removeClass(c.settings.active_class).prev("["+c.attr_name()+"]").removeClass(c.settings.active_class).removeData("target"),c.S(this).trigger("closed").trigger("closed.fndtn.dropdown",[b]))}),b.removeClass("f-open-"+this.attr_name(!0))},closeall:function(){var b=this;a.each(b.S(".f-open-"+this.attr_name(!0)),function(){b.close.call(b,b.S(this))})},open:function(a,b){this.css(a.addClass(this.settings.active_class),b),a.prev("["+this.attr_name()+"]").addClass(this.settings.active_class),a.data("target",b.get(0)).trigger("opened").trigger("opened.fndtn.dropdown",[a,b]),a.attr("aria-hidden","false"),b.attr("aria-expanded","true"),a.focus(),a.addClass("f-open-"+this.attr_name(!0))},data_attr:function(){return this.namespace.length>0?this.namespace+"-"+this.name:this.name},toggle:function(a){if(!a.hasClass(this.settings.disabled_class)){var b=this.S("#"+a.data(this.data_attr()));0!==b.length&&(this.close.call(this,this.S("["+this.attr_name()+"-content]").not(b)),b.hasClass(this.settings.active_class)?(this.close.call(this,b),b.data("target")!==a.get(0)&&this.open.call(this,b,a)):this.open.call(this,b,a))}},resize:function(){var b=this.S("["+this.attr_name()+"-content].open"),c=a(b.data("target"));b.length&&c.length&&this.css(b,c)},css:function(a,b){var c=Math.max((b.width()-a.width())/2,8),d=b.data(this.attr_name(!0)+"-init")||this.settings;if(this.clear_idx(),this.small()){var e=this.dirs.bottom.call(a,b,d);a.attr("style","").removeClass("drop-left drop-right drop-top").css({position:"absolute",width:"95%","max-width":"none",top:e.top}),a.css(Foundation.rtl?"right":"left",c)}else this.style(a,b,d);return a},style:function(b,c,d){var e=a.extend({position:"absolute"},this.dirs[d.align].call(b,c,d));b.attr("style","").css(e)},dirs:{_base:function(a){var d=this.offsetParent(),e=d.offset(),f=a.offset();f.top-=e.top,f.left-=e.left,f.missRight=!1,f.missTop=!1,f.missLeft=!1,f.leftRightFlag=!1;var g;g=c.getElementsByClassName("row")[0]?c.getElementsByClassName("row")[0].clientWidth:b.outerWidth;var h=(b.outerWidth-g)/2,i=g;return this.hasClass("mega")||(a.offset().top<=this.outerHeight()&&(f.missTop=!0,i=b.outerWidth-h,f.leftRightFlag=!0),a.offset().left+this.outerWidth()>a.offset().left+h&&a.offset().left-h>this.outerWidth()&&(f.missRight=!0,f.missLeft=!1),a.offset().left-this.outerWidth()<=0&&(f.missLeft=!0,f.missRight=!1)),f},top:function(a,b){var c=Foundation.libs.dropdown,d=c.dirs._base.call(this,a);return this.addClass("drop-top"),1==d.missTop&&(d.top=d.top+a.outerHeight()+this.outerHeight(),this.removeClass("drop-top")),1==d.missRight&&(d.left=d.left-this.outerWidth()+a.outerWidth()),(a.outerWidth()<this.outerWidth()||c.small()||this.hasClass(b.mega_menu))&&c.adjust_pip(this,a,b,d),Foundation.rtl?{left:d.left-this.outerWidth()+a.outerWidth(),top:d.top-this.outerHeight()}:{left:d.left,top:d.top-this.outerHeight()}},bottom:function(a,b){var c=Foundation.libs.dropdown,d=c.dirs._base.call(this,a);return 1==d.missRight&&(d.left=d.left-this.outerWidth()+a.outerWidth()),(a.outerWidth()<this.outerWidth()||c.small()||this.hasClass(b.mega_menu))&&c.adjust_pip(this,a,b,d),c.rtl?{left:d.left-this.outerWidth()+a.outerWidth(),top:d.top+a.outerHeight()}:{left:d.left,top:d.top+a.outerHeight()}
},left:function(a){var b=Foundation.libs.dropdown.dirs._base.call(this,a);return this.addClass("drop-left"),1==b.missLeft&&(b.left=b.left+this.outerWidth(),b.top=b.top+a.outerHeight(),this.removeClass("drop-left")),{left:b.left-this.outerWidth(),top:b.top}},right:function(a,b){var c=Foundation.libs.dropdown.dirs._base.call(this,a);this.addClass("drop-right"),1==c.missRight?(c.left=c.left-this.outerWidth(),c.top=c.top+a.outerHeight(),this.removeClass("drop-right")):c.triggeredRight=!0;var d=Foundation.libs.dropdown;return(a.outerWidth()<this.outerWidth()||d.small()||this.hasClass(b.mega_menu))&&d.adjust_pip(this,a,b,c),{left:c.left+a.outerWidth(),top:c.top}}},adjust_pip:function(a,b,c,d){var e=Foundation.stylesheet,f=8;a.hasClass(c.mega_class)?f=d.left+b.outerWidth()/2-8:this.small()&&(f+=d.left-8),this.rule_idx=e.cssRules.length;var g=".f-dropdown.open:before",h=".f-dropdown.open:after",i="left: "+f+"px;",j="left: "+(f-1)+"px;";1==d.missRight&&(f=a.outerWidth()-23,g=".f-dropdown.open:before",h=".f-dropdown.open:after",i="left: "+f+"px;",j="left: "+(f-1)+"px;"),1==d.triggeredRight&&(g=".f-dropdown.open:before",h=".f-dropdown.open:after",i="left:-12px;",j="left:-14px;"),e.insertRule?(e.insertRule([g,"{",i,"}"].join(" "),this.rule_idx),e.insertRule([h,"{",j,"}"].join(" "),this.rule_idx+1)):(e.addRule(g,i,this.rule_idx),e.addRule(h,j,this.rule_idx+1))},clear_idx:function(){var a=Foundation.stylesheet;"undefined"!=typeof this.rule_idx&&(a.deleteRule(this.rule_idx),a.deleteRule(this.rule_idx),delete this.rule_idx)},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},off:function(){this.S(this.scope).off(".fndtn.dropdown"),this.S("html, body").off(".fndtn.dropdown"),this.S(b).off(".fndtn.dropdown"),this.S("[data-dropdown-content]").off(".fndtn.dropdown")},reflow:function(){}}}(jQuery,window,window.document),function(a,b){"use strict";Foundation.libs.equalizer={name:"equalizer",version:"5.5.1",settings:{use_tallest:!0,before_height_change:a.noop,after_height_change:a.noop,equalize_on_stack:!1},init:function(a,b,c){Foundation.inherit(this,"image_loaded"),this.bindings(b,c),this.reflow()},events:function(){this.S(b).off(".equalizer").on("resize.fndtn.equalizer",function(){this.reflow()}.bind(this))},equalize:function(b){var c=!1,d=b.find("["+this.attr_name()+"-watch]:visible"),e=b.data(this.attr_name(!0)+"-init");if(0!==d.length){var f=d.first().offset().top;if(e.before_height_change(),b.trigger("before-height-change").trigger("before-height-change.fndth.equalizer"),d.height("inherit"),d.each(function(){var b=a(this);b.offset().top!==f&&(c=!0)}),e.equalize_on_stack!==!1||!c){var g=d.map(function(){return a(this).outerHeight(!1)}).get();if(e.use_tallest){var h=Math.max.apply(null,g);d.css("height",h)}else{var i=Math.min.apply(null,g);d.css("height",i)}e.after_height_change(),b.trigger("after-height-change").trigger("after-height-change.fndtn.equalizer")}}},reflow:function(){var b=this;this.S("["+this.attr_name()+"]",this.scope).each(function(){var c=a(this);b.image_loaded(b.S("img",this),function(){b.equalize(c)})})}}}(jQuery,window,window.document),function(a,b){"use strict";Foundation.libs.interchange={name:"interchange",version:"5.5.1",cache:{},images_loaded:!1,nodes_loaded:!1,settings:{load_attr:"interchange",named_queries:{"default":"only screen",small:Foundation.media_queries.small,"small-only":Foundation.media_queries["small-only"],medium:Foundation.media_queries.medium,"medium-only":Foundation.media_queries["medium-only"],large:Foundation.media_queries.large,"large-only":Foundation.media_queries["large-only"],xlarge:Foundation.media_queries.xlarge,"xlarge-only":Foundation.media_queries["xlarge-only"],xxlarge:Foundation.media_queries.xxlarge,landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(b,c,d){if(/IMG/.test(b[0].nodeName)){var e=b[0].src;if(new RegExp(c,"i").test(e))return;return b[0].src=c,d(b[0].src)}var f=b.data(this.data_attr+"-last-path"),g=this;if(f!=c)return/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(c)?(a(b).css("background-image","url("+c+")"),b.data("interchange-last-path",c),d(c)):a.get(c,function(a){b.html(a),b.data(g.data_attr+"-last-path",c),d()})}}},init:function(b,c,d){Foundation.inherit(this,"throttle random_str"),this.data_attr=this.set_data_attr(),a.extend(!0,this.settings,c,d),this.bindings(c,d),this.load("images"),this.load("nodes")},get_media_hash:function(){var a="";for(var b in this.settings.named_queries)a+=matchMedia(this.settings.named_queries[b]).matches.toString();return a},events:function(){var c,d=this;return a(b).off(".interchange").on("resize.fndtn.interchange",d.throttle(function(){var a=d.get_media_hash();a!==c&&d.resize(),c=a},50)),this},resize:function(){var b=this.cache;if(!this.images_loaded||!this.nodes_loaded)return void setTimeout(a.proxy(this.resize,this),50);for(var c in b)if(b.hasOwnProperty(c)){var d=this.results(c,b[c]);d&&this.settings.directives[d.scenario[1]].call(this,d.el,d.scenario[0],function(a){if(arguments[0]instanceof Array)var b=arguments[0];else var b=Array.prototype.slice.call(arguments,0);return function(){a.el.trigger(a.scenario[1],b)}}(d))}},results:function(a,b){var c=b.length;if(c>0)for(var d=this.S("["+this.add_namespace("data-uuid")+'="'+a+'"]');c--;){var e,f=b[c][2];if(e=matchMedia(this.settings.named_queries.hasOwnProperty(f)?this.settings.named_queries[f]:f),e.matches)return{el:d,scenario:b[c]}}return!1},load:function(a,b){return("undefined"==typeof this["cached_"+a]||b)&&this["update_"+a](),this["cached_"+a]},update_images:function(){var a=this.S("img["+this.data_attr+"]"),b=a.length,c=b,d=0,e=this.data_attr;for(this.cache={},this.cached_images=[],this.images_loaded=0===b;c--;){if(d++,a[c]){var f=a[c].getAttribute(e)||"";f.length>0&&this.cached_images.push(a[c])}d===b&&(this.images_loaded=!0,this.enhance("images"))}return this},update_nodes:function(){var a=this.S("["+this.data_attr+"]").not("img"),b=a.length,c=b,d=0,e=this.data_attr;for(this.cached_nodes=[],this.nodes_loaded=0===b;c--;){d++;var f=a[c].getAttribute(e)||"";f.length>0&&this.cached_nodes.push(a[c]),d===b&&(this.nodes_loaded=!0,this.enhance("nodes"))}return this},enhance:function(c){for(var d=this["cached_"+c].length;d--;)this.object(a(this["cached_"+c][d]));return a(b).trigger("resize").trigger("resize.fndtn.interchange")},convert_directive:function(a){var b=this.trim(a);return b.length>0?b:"replace"},parse_scenario:function(a){var b=a[0].match(/(.+),\s*(\w+)\s*$/),c=a[1];if(b)var d=b[1],e=b[2];else var f=a[0].split(/,\s*$/),d=f[0],e="";return[this.trim(d),this.convert_directive(e),this.trim(c)]},object:function(a){var b=this.parse_data_attr(a),c=[],d=b.length;if(d>0)for(;d--;){var e=b[d].split(/\(([^\)]*?)(\))$/);if(e.length>1){var f=this.parse_scenario(e);c.push(f)}}return this.store(a,c)},store:function(a,b){var c=this.random_str(),d=a.data(this.add_namespace("uuid",!0));return this.cache[d]?this.cache[d]:(a.attr(this.add_namespace("data-uuid"),c),this.cache[c]=b)},trim:function(b){return"string"==typeof b?a.trim(b):b},set_data_attr:function(a){return a?this.namespace.length>0?this.namespace+"-"+this.settings.load_attr:this.settings.load_attr:this.namespace.length>0?"data-"+this.namespace+"-"+this.settings.load_attr:"data-"+this.settings.load_attr},parse_data_attr:function(a){for(var b=a.attr(this.attr_name()).split(/\[(.*?)\]/),c=b.length,d=[];c--;)b[c].replace(/[\W\d]+/,"").length>4&&d.push(b[c]);return d},reflow:function(){this.load("images",!0),this.load("nodes",!0)}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.joyride={name:"joyride",version:"5.5.1",defaults:{expose:!1,modal:!0,keyboard:!0,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:!0,start_offset:0,next_button:!0,prev_button:!0,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:!1,cookie_name:"joyride",cookie_domain:!1,cookie_expires:365,tip_container:"body",abort_on_close:!0,tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(b,c,d){Foundation.inherit(this,"throttle random_str"),this.settings=this.settings||a.extend({},this.defaults,d||c),this.bindings(c,d)},go_next:function(){this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())},go_prev:function(){this.settings.$li.prev().length<1||(this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(null,!0),this.startTimer()):(this.hide(),this.show(null,!0)))},events:function(){var c=this;a(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(a){a.preventDefault(),this.go_next()}.bind(this)).on("click.fndtn.joyride",".joyride-prev-tip",function(a){a.preventDefault(),this.go_prev()}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(a){a.preventDefault(),this.end(this.settings.abort_on_close)}.bind(this)).on("keyup.fndtn.joyride",function(a){if(this.settings.keyboard&&this.settings.riding)switch(a.which){case 39:a.preventDefault(),this.go_next();break;case 37:a.preventDefault(),this.go_prev();break;case 27:a.preventDefault(),this.end(this.settings.abort_on_close)}}.bind(this)),a(b).off(".joyride").on("resize.fndtn.joyride",c.throttle(function(){if(a("["+c.attr_name()+"]").length>0&&c.settings.$next_tip&&c.settings.riding){if(c.settings.exposed.length>0){var b=a(c.settings.exposed);b.each(function(){var b=a(this);c.un_expose(b),c.expose(b)})}c.is_phone()?c.pos_phone():c.pos_default(!1)}},100))},start:function(){var b=this,c=a("["+this.attr_name()+"]",this.scope),d=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],e=d.length;!c.length>0||(this.settings.init||this.events(),this.settings=c.data(this.attr_name(!0)+"-init"),this.settings.$content_el=c,this.settings.$body=a(this.settings.tip_container),this.settings.body_offset=a(this.settings.tip_container).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.riding=!0,"function"!=typeof a.cookie&&(this.settings.cookie_monster=!1),(!this.settings.cookie_monster||this.settings.cookie_monster&&!a.cookie(this.settings.cookie_name))&&(this.settings.$tip_content.each(function(c){var f=a(this);this.settings=a.extend({},b.defaults,b.data_options(f));for(var g=e;g--;)b.settings[d[g]]=parseInt(b.settings[d[g]],10);b.create({$li:f,index:c})}),!this.settings.start_timer_on_click&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")))},resume:function(){this.set_li(),this.show()},tip_template:function(b){var c,d;return b.tip_class=b.tip_class||"",c=a(this.settings.template.tip).addClass(b.tip_class),d=a.trim(a(b.li).html())+this.prev_button_text(b.prev_button_text,b.index)+this.button_text(b.button_text)+this.settings.template.link+this.timer_instance(b.index),c.append(a(this.settings.template.wrapper)),c.first().attr(this.add_namespace("data-index"),b.index),a(".joyride-content-wrapper",c).append(d),c[0]},timer_instance:function(b){var c;return c=0===b&&this.settings.start_timer_on_click&&this.settings.timer>0||0===this.settings.timer?"":a(this.settings.template.timer)[0].outerHTML},button_text:function(b){return this.settings.tip_settings.next_button?(b=a.trim(b)||"Next",b=a(this.settings.template.button).append(b)[0].outerHTML):b="",b},prev_button_text:function(b,c){return this.settings.tip_settings.prev_button?(b=a.trim(b)||"Previous",b=0==c?a(this.settings.template.prev_button).append(b).addClass("disabled")[0].outerHTML:a(this.settings.template.prev_button).append(b)[0].outerHTML):b="",b},create:function(b){this.settings.tip_settings=a.extend({},this.settings,this.data_options(b.$li));var c=b.$li.attr(this.add_namespace("data-button"))||b.$li.attr(this.add_namespace("data-text")),d=b.$li.attr(this.add_namespace("data-button-prev"))||b.$li.attr(this.add_namespace("data-prev-text")),e=b.$li.attr("class"),f=a(this.tip_template({tip_class:e,index:b.index,button_text:c,prev_button_text:d,li:b.$li}));a(this.settings.tip_container).append(f)},show:function(b,c){var e=null;if(this.settings.$li===d||-1===a.inArray(this.settings.$li.index(),this.settings.pause_after))if(this.settings.paused?this.settings.paused=!1:this.set_li(b,c),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0){if(b&&(this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tip_settings=a.extend({},this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location],!/body/i.test(this.settings.$target.selector)){var f=a(".joyride-modal-bg");/pop/i.test(this.settings.tipAnimation)?f.hide():f.fadeOut(this.settings.tipAnimationFadeSpeed),this.scroll_to()}this.is_phone()?this.pos_phone(!0):this.pos_default(!0),e=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tip_animation)?(e.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),setTimeout(function(){e.animate({width:e.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tip_animation)&&(e.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(),setTimeout(function(){e.animate({width:e.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)),this.settings.$current_tip=this.settings.$next_tip}else this.settings.$li&&this.settings.$target.length<1?this.show(b,c):this.end();else this.settings.paused=!0},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||a(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(a.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(a,b){a?(this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=b?this.settings.$li.prev():this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=a(".joyride-tip-guide").eq(this.settings.$li.index()),this.settings.$next_tip.data("closed","")},set_target:function(){var b=this.settings.$li.attr(this.add_namespace("data-class")),d=this.settings.$li.attr(this.add_namespace("data-id")),e=function(){return d?a(c.getElementById(d)):b?a("."+b).first():a("body")};this.settings.$target=e()},scroll_to:function(){var c,d;c=a(b).height()/2,d=Math.ceil(this.settings.$target.offset().top-c+this.settings.$next_tip.outerHeight()),0!=d&&a("html, body").stop().animate({scrollTop:d},this.settings.scroll_speed,"swing")},paused:function(){return-1===a.inArray(this.settings.$li.index()+1,this.settings.pause_after)},restart:function(){this.hide(),this.settings.$li=d,this.show("init")},pos_default:function(a){var b=this.settings.$next_tip.find(".joyride-nub"),c=Math.ceil(b.outerWidth()/2),d=Math.ceil(b.outerHeight()/2),e=a||!1;if(e&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector))this.settings.$li.length&&this.pos_modal(b);else{var f=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,g=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;this.bottom()?(this.settings.$next_tip.css(this.rtl?{top:this.settings.$target.offset().top+d+this.settings.$target.outerHeight()+f,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+g}:{top:this.settings.$target.offset().top+d+this.settings.$target.outerHeight()+f,left:this.settings.$target.offset().left+g}),this.nub_position(b,this.settings.tip_settings.nub_position,"top")):this.top()?(this.settings.$next_tip.css(this.rtl?{top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-d+f,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}:{top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-d+f,left:this.settings.$target.offset().left+g}),this.nub_position(b,this.settings.tip_settings.nub_position,"bottom")):this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top+f,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+c+g}),this.nub_position(b,this.settings.tip_settings.nub_position,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top+f,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-c+g}),this.nub_position(b,this.settings.tip_settings.nub_position,"right")),!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length&&(b.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}e&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(b){var c=this.settings.$next_tip.outerHeight(),d=(this.settings.$next_tip.offset(),this.settings.$target.outerHeight()),e=a(".joyride-nub",this.settings.$next_tip),f=Math.ceil(e.outerHeight()/2),g=b||!1;e.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),g&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(e):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-c-f}),e.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+d+f}),e.addClass("top")),g&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(a){this.center(),a.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var b=a(".joyride-modal-bg");if(b.length<1){var b=a(this.settings.template.modal);b.appendTo("body")}/pop/i.test(this.settings.tip_animation)?b.show():b.fadeIn(this.settings.tip_animation_fade_speed)}},expose:function(){var c,d,e,f,g,h="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof a)e=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;e=this.settings.$target}return e.length<1?(b.console&&console.error("element not valid",e),!1):(c=a(this.settings.template.expose),this.settings.$body.append(c),c.css({top:e.offset().top,left:e.offset().left,width:e.outerWidth(!0),height:e.outerHeight(!0)}),d=a(this.settings.template.expose_cover),f={zIndex:e.css("z-index"),position:e.css("position")},g=null==e.attr("class")?"":e.attr("class"),e.css("z-index",parseInt(c.css("z-index"))+1),"static"==f.position&&e.css("position","relative"),e.data("expose-css",f),e.data("orig-class",g),e.attr("class",g+" "+this.settings.expose_add_class),d.css({top:e.offset().top,left:e.offset().left,width:e.outerWidth(!0),height:e.outerHeight(!0)}),this.settings.modal&&this.show_modal(),this.settings.$body.append(d),c.addClass(h),d.addClass(h),e.data("expose",h),this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,e),void this.add_exposed(e))},un_expose:function(){var c,d,e,f,g,h=!1;if(arguments.length>0&&arguments[0]instanceof a)d=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;d=this.settings.$target}return d.length<1?(b.console&&console.error("element not valid",d),!1):(c=d.data("expose"),e=a("."+c),arguments.length>1&&(h=arguments[1]),h===!0?a(".joyride-expose-wrapper,.joyride-expose-cover").remove():e.remove(),f=d.data("expose-css"),"auto"==f.zIndex?d.css("z-index",""):d.css("z-index",f.zIndex),f.position!=d.css("position")&&("static"==f.position?d.css("position",""):d.css("position",f.position)),g=d.data("orig-class"),d.attr("class",g),d.removeData("orig-classes"),d.removeData("expose"),d.removeData("expose-z-index"),void this.remove_exposed(d))},add_exposed:function(b){this.settings.exposed=this.settings.exposed||[],b instanceof a||"object"==typeof b?this.settings.exposed.push(b[0]):"string"==typeof b&&this.settings.exposed.push(b)},remove_exposed:function(b){var c,d;for(b instanceof a?c=b[0]:"string"==typeof b&&(c=b),this.settings.exposed=this.settings.exposed||[],d=this.settings.exposed.length;d--;)if(this.settings.exposed[d]==c)return void this.settings.exposed.splice(d,1)},center:function(){var c=a(b);return this.settings.$next_tip.css({top:(c.height()-this.settings.$next_tip.outerHeight())/2+c.scrollTop(),left:(c.width()-this.settings.$next_tip.outerWidth())/2+c.scrollLeft()}),!0},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(c){var d=a(b),e=d.height()/2,f=Math.ceil(this.settings.$target.offset().top-e+this.settings.$next_tip.outerHeight()),g=d.width()+d.scrollLeft(),h=d.height()+f,i=d.height()+d.scrollTop(),j=d.scrollTop();return j>f&&(j=0>f?0:f),h>i&&(i=h),[c.offset().top<j,g<c.offset().left+c.outerWidth(),i<c.offset().top+c.outerHeight(),d.scrollLeft()>c.offset().left]},visible:function(a){for(var b=a.length;b--;)if(a[b])return!1;return!0},nub_position:function(a,b,c){a.addClass("auto"===b?c:b)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(b){this.settings.cookie_monster&&a.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),a(this.scope).off("keyup.joyride"),this.settings.$next_tip.data("closed",!0),this.settings.riding=!1,a(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),("undefined"==typeof b||b===!1)&&(this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip),this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip)),a(".joyride-tip-guide").remove()},off:function(){a(this.scope).off(".joyride"),a(b).off(".joyride"),a(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),a(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(jQuery,window,window.document),function(a,b){"use strict";Foundation.libs["magellan-expedition"]={name:"magellan-expedition",version:"5.5.1",settings:{active_class:"active",threshold:0,destination_threshold:20,throttle_delay:30,fixed_top:0,offset_by_height:!0,duration:700,easing:"swing"},init:function(a,b,c){Foundation.inherit(this,"throttle"),this.bindings(b,c)},events:function(){var c=this,d=c.S,e=c.settings;c.set_expedition_position(),d(c.scope).off(".magellan").on("click.fndtn.magellan","["+c.add_namespace("data-magellan-arrival")+'] a[href^="#"]',function(b){b.preventDefault();var d=a(this).closest("["+c.attr_name()+"]"),e=d.data("magellan-expedition-init"),f=this.hash.split("#").join(""),g=a('a[name="'+f+'"]');0===g.length&&(g=a("#"+f));var h=g.offset().top-e.destination_threshold+1;e.offset_by_height&&(h-=d.outerHeight()),a("html, body").stop().animate({scrollTop:h},e.duration,e.easing,function(){history.pushState?history.pushState(null,null,"#"+f):location.hash="#"+f})}).on("scroll.fndtn.magellan",c.throttle(this.check_for_arrivals.bind(this),e.throttle_delay)),a(b).on("resize.fndtn.magellan",c.throttle(this.set_expedition_position.bind(this),e.throttle_delay))},check_for_arrivals:function(){var a=this;a.update_arrivals(),a.update_expedition_positions()},set_expedition_position:function(){var b=this;a("["+this.attr_name()+"=fixed]",b.scope).each(function(){var c,d,e=a(this),f=e.data("magellan-expedition-init"),g=e.attr("styles");e.attr("style",""),c=e.offset().top+f.threshold,d=parseInt(e.data("magellan-fixed-top")),isNaN(d)||(b.settings.fixed_top=d),e.data(b.data_attr("magellan-top-offset"),c),e.attr("style",g)})},update_expedition_positions:function(){var c=this,d=a(b).scrollTop();a("["+this.attr_name()+"=fixed]",c.scope).each(function(){var b=a(this),e=b.data("magellan-expedition-init"),f=b.attr("style"),g=b.data("magellan-top-offset");if(d+c.settings.fixed_top>=g){var h=b.prev("["+c.add_namespace("data-magellan-expedition-clone")+"]");0===h.length&&(h=b.clone(),h.removeAttr(c.attr_name()),h.attr(c.add_namespace("data-magellan-expedition-clone"),""),b.before(h)),b.css({position:"fixed",top:e.fixed_top}).addClass("fixed")}else b.prev("["+c.add_namespace("data-magellan-expedition-clone")+"]").remove(),b.attr("style",f).css("position","").css("top","").removeClass("fixed")})},update_arrivals:function(){var c=this,d=a(b).scrollTop();a("["+this.attr_name()+"]",c.scope).each(function(){var b=a(this),e=b.data(c.attr_name(!0)+"-init"),f=c.offsets(b,d),g=b.find("["+c.add_namespace("data-magellan-arrival")+"]"),h=!1;f.each(function(a,d){if(d.viewport_offset>=d.top_offset){var f=b.find("["+c.add_namespace("data-magellan-arrival")+"]");return f.not(d.arrival).removeClass(e.active_class),d.arrival.addClass(e.active_class),h=!0,!0}}),h||g.removeClass(e.active_class)})},offsets:function(b,c){var d=this,e=b.data(d.attr_name(!0)+"-init"),f=c;return b.find("["+d.add_namespace("data-magellan-arrival")+"]").map(function(){var c=a(this).data(d.data_attr("magellan-arrival")),g=a("["+d.add_namespace("data-magellan-destination")+"="+c+"]");if(g.length>0){var h=g.offset().top-e.destination_threshold;return e.offset_by_height&&(h-=b.outerHeight()),h=Math.floor(h),{destination:g,arrival:a(this),top_offset:h,viewport_offset:f}}}).sort(function(a,b){return a.top_offset<b.top_offset?-1:a.top_offset>b.top_offset?1:0})},data_attr:function(a){return this.namespace.length>0?this.namespace+"-"+a:a},off:function(){this.S(this.scope).off(".magellan"),this.S(b).off(".magellan")},reflow:function(){var b=this;a("["+b.add_namespace("data-magellan-expedition-clone")+"]",b.scope).remove()}}}(jQuery,window,window.document),function(a){"use strict";Foundation.libs.offcanvas={name:"offcanvas",version:"5.5.1",settings:{open_method:"move",close_on_click:!1},init:function(a,b,c){this.bindings(b,c)},events:function(){var b=this,c=b.S,d="",e="",f="";"move"===this.settings.open_method?(d="move-",e="right",f="left"):"overlap_single"===this.settings.open_method?(d="offcanvas-overlap-",e="right",f="left"):"overlap"===this.settings.open_method&&(d="offcanvas-overlap"),c(this.scope).off(".offcanvas").on("click.fndtn.offcanvas",".left-off-canvas-toggle",function(f){b.click_toggle_class(f,d+e),"overlap"!==b.settings.open_method&&c(".left-submenu").removeClass(d+e),a(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".left-off-canvas-menu a",function(f){var g=b.get_settings(f),h=c(this).parent();!g.close_on_click||h.hasClass("has-submenu")||h.hasClass("back")?c(this).parent().hasClass("has-submenu")?(f.preventDefault(),c(this).siblings(".left-submenu").toggleClass(d+e)):h.hasClass("back")&&(f.preventDefault(),h.parent().removeClass(d+e)):(b.hide.call(b,d+e,b.get_wrapper(f)),h.parent().removeClass(d+e)),a(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-toggle",function(e){b.click_toggle_class(e,d+f),"overlap"!==b.settings.open_method&&c(".right-submenu").removeClass(d+f),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-menu a",function(e){var g=b.get_settings(e),h=c(this).parent();!g.close_on_click||h.hasClass("has-submenu")||h.hasClass("back")?c(this).parent().hasClass("has-submenu")?(e.preventDefault(),c(this).siblings(".right-submenu").toggleClass(d+f)):h.hasClass("back")&&(e.preventDefault(),h.parent().removeClass(d+f)):(b.hide.call(b,d+f,b.get_wrapper(e)),h.parent().removeClass(d+f)),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(g){b.click_remove_class(g,d+f),c(".right-submenu").removeClass(d+f),e&&(b.click_remove_class(g,d+e),c(".left-submenu").removeClass(d+f)),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(c){b.click_remove_class(c,d+f),a(".left-off-canvas-toggle").attr("aria-expanded","false"),e&&(b.click_remove_class(c,d+e),a(".right-off-canvas-toggle").attr("aria-expanded","false"))})},toggle:function(a,b){b=b||this.get_wrapper(),b.is("."+a)?this.hide(a,b):this.show(a,b)},show:function(a,b){b=b||this.get_wrapper(),b.trigger("open").trigger("open.fndtn.offcanvas"),b.addClass(a)},hide:function(a,b){b=b||this.get_wrapper(),b.trigger("close").trigger("close.fndtn.offcanvas"),b.removeClass(a)},click_toggle_class:function(a,b){a.preventDefault();var c=this.get_wrapper(a);this.toggle(b,c)},click_remove_class:function(a,b){a.preventDefault();var c=this.get_wrapper(a);this.hide(b,c)},get_settings:function(a){var b=this.S(a.target).closest("["+this.attr_name()+"]");return b.data(this.attr_name(!0)+"-init")||this.settings},get_wrapper:function(a){var b=this.S(a?a.target:this.scope).closest(".off-canvas-wrap");return 0===b.length&&(b=this.S(".off-canvas-wrap")),b},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";var e=function(){},f=function(e,f){if(e.hasClass(f.slides_container_class))return this;var j,k,l,m,n,o,p=this,q=e,r=0,s=!1;p.slides=function(){return q.children(f.slide_selector)
},p.slides().first().addClass(f.active_slide_class),p.update_slide_number=function(b){f.slide_number&&(k.find("span:first").text(parseInt(b)+1),k.find("span:last").text(p.slides().length)),f.bullets&&(l.children().removeClass(f.bullets_active_class),a(l.children().get(b)).addClass(f.bullets_active_class))},p.update_active_link=function(b){var c=a('[data-orbit-link="'+p.slides().eq(b).attr("data-orbit-slide")+'"]');c.siblings().removeClass(f.bullets_active_class),c.addClass(f.bullets_active_class)},p.build_markup=function(){q.wrap('<div class="'+f.container_class+'"></div>'),j=q.parent(),q.addClass(f.slides_container_class),f.stack_on_small&&j.addClass(f.stack_on_small_class),f.navigation_arrows&&(j.append(a('<a href="#"><span></span></a>').addClass(f.prev_class)),j.append(a('<a href="#"><span></span></a>').addClass(f.next_class))),f.timer&&(m=a("<div>").addClass(f.timer_container_class),m.append("<span>"),m.append(a("<div>").addClass(f.timer_progress_class)),m.addClass(f.timer_paused_class),j.append(m)),f.slide_number&&(k=a("<div>").addClass(f.slide_number_class),k.append("<span></span> "+f.slide_number_text+" <span></span>"),j.append(k)),f.bullets&&(l=a("<ol>").addClass(f.bullets_container_class),j.append(l),l.wrap('<div class="orbit-bullets-container"></div>'),p.slides().each(function(b){var c=a("<li>").attr("data-orbit-slide",b).on("click",p.link_bullet);l.append(c)}))},p._goto=function(b,c){if(b===r)return!1;"object"==typeof o&&o.restart();var d=p.slides(),e="next";if(s=!0,r>b&&(e="prev"),b>=d.length){if(!f.circular)return!1;b=0}else if(0>b){if(!f.circular)return!1;b=d.length-1}var g=a(d.get(r)),h=a(d.get(b));g.css("zIndex",2),g.removeClass(f.active_slide_class),h.css("zIndex",4).addClass(f.active_slide_class),q.trigger("before-slide-change.fndtn.orbit"),f.before_slide_change(),p.update_active_link(b);var i=function(){var a=function(){r=b,s=!1,c===!0&&(o=p.create_timer(),o.start()),p.update_slide_number(r),q.trigger("after-slide-change.fndtn.orbit",[{slide_number:r,total_slides:d.length}]),f.after_slide_change(r,d.length)};q.outerHeight()!=h.outerHeight()&&f.variable_height?q.animate({height:h.outerHeight()},250,"linear",a):a()};if(1===d.length)return i(),!1;var j=function(){"next"===e&&n.next(g,h,i),"prev"===e&&n.prev(g,h,i)};h.outerHeight()>q.outerHeight()&&f.variable_height?q.animate({height:h.outerHeight()},250,"linear",j):j()},p.next=function(a){a.stopImmediatePropagation(),a.preventDefault(),p._goto(r+1)},p.prev=function(a){a.stopImmediatePropagation(),a.preventDefault(),p._goto(r-1)},p.link_custom=function(b){b.preventDefault();var c=a(this).attr("data-orbit-link");if("string"==typeof c&&""!=(c=a.trim(c))){var d=j.find("[data-orbit-slide="+c+"]");-1!=d.index()&&p._goto(d.index())}},p.link_bullet=function(){var b=a(this).attr("data-orbit-slide");if("string"==typeof b&&""!=(b=a.trim(b)))if(isNaN(parseInt(b))){var c=j.find("[data-orbit-slide="+b+"]");-1!=c.index()&&p._goto(c.index()+1)}else p._goto(parseInt(b))},p.timer_callback=function(){p._goto(r+1,!0)},p.compute_dimensions=function(){var b=a(p.slides().get(r)),c=b.outerHeight();f.variable_height||p.slides().each(function(){a(this).outerHeight()>c&&(c=a(this).outerHeight())}),q.height(c)},p.create_timer=function(){var a=new g(j.find("."+f.timer_container_class),f,p.timer_callback);return a},p.stop_timer=function(){"object"==typeof o&&o.stop()},p.toggle_timer=function(){var a=j.find("."+f.timer_container_class);a.hasClass(f.timer_paused_class)?("undefined"==typeof o&&(o=p.create_timer()),o.start()):"object"==typeof o&&o.stop()},p.init=function(){p.build_markup(),f.timer&&(o=p.create_timer(),Foundation.utils.image_loaded(this.slides().children("img"),o.start)),n=new i(f,q),"slide"===f.animation&&(n=new h(f,q)),j.on("click","."+f.next_class,p.next),j.on("click","."+f.prev_class,p.prev),f.next_on_click&&j.on("click","."+f.slides_container_class+" [data-orbit-slide]",p.link_bullet),j.on("click",p.toggle_timer),f.swipe&&j.on("touchstart.fndtn.orbit",function(a){a.touches||(a=a.originalEvent);var b={start_page_x:a.touches[0].pageX,start_page_y:a.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:d};j.data("swipe-transition",b),a.stopPropagation()}).on("touchmove.fndtn.orbit",function(a){if(a.touches||(a=a.originalEvent),!(a.touches.length>1||a.scale&&1!==a.scale)){var b=j.data("swipe-transition");if("undefined"==typeof b&&(b={}),b.delta_x=a.touches[0].pageX-b.start_page_x,"undefined"==typeof b.is_scrolling&&(b.is_scrolling=!!(b.is_scrolling||Math.abs(b.delta_x)<Math.abs(a.touches[0].pageY-b.start_page_y))),!b.is_scrolling&&!b.active){a.preventDefault();var c=b.delta_x<0?r+1:r-1;b.active=!0,p._goto(c)}}}).on("touchend.fndtn.orbit",function(a){j.data("swipe-transition",{}),a.stopPropagation()}),j.on("mouseenter.fndtn.orbit",function(){f.timer&&f.pause_on_hover&&p.stop_timer()}).on("mouseleave.fndtn.orbit",function(){f.timer&&f.resume_on_mouseout&&o.start()}),a(c).on("click","[data-orbit-link]",p.link_custom),a(b).on("load resize",p.compute_dimensions),Foundation.utils.image_loaded(this.slides().children("img"),p.compute_dimensions),Foundation.utils.image_loaded(this.slides().children("img"),function(){j.prev("."+f.preloader_class).css("display","none"),p.update_slide_number(0),p.update_active_link(0),q.trigger("ready.fndtn.orbit")})},p.init()},g=function(a,b,c){var d,e,f=this,g=b.timer_speed,h=a.find("."+b.timer_progress_class),i=-1;this.update_progress=function(a){var b=h.clone();b.attr("style",""),b.css("width",a+"%"),h.replaceWith(b),h=b},this.restart=function(){clearTimeout(e),a.addClass(b.timer_paused_class),i=-1,f.update_progress(0)},this.start=function(){return a.hasClass(b.timer_paused_class)?(i=-1===i?g:i,a.removeClass(b.timer_paused_class),d=(new Date).getTime(),h.animate({width:"100%"},i,"linear"),e=setTimeout(function(){f.restart(),c()},i),void a.trigger("timer-started.fndtn.orbit")):!0},this.stop=function(){if(a.hasClass(b.timer_paused_class))return!0;clearTimeout(e),a.addClass(b.timer_paused_class);var c=(new Date).getTime();i-=c-d;var h=100-i/g*100;f.update_progress(h),a.trigger("timer-stopped.fndtn.orbit")}},h=function(b){var c=b.animation_speed,d=1===a("html[dir=rtl]").length,e=d?"marginRight":"marginLeft",f={};f[e]="0%",this.next=function(a,b,d){a.animate({marginLeft:"-100%"},c),b.animate(f,c,function(){a.css(e,"100%"),d()})},this.prev=function(a,b,d){a.animate({marginLeft:"100%"},c),b.css(e,"-100%"),b.animate(f,c,function(){a.css(e,"100%"),d()})}},i=function(b){{var c=b.animation_speed;1===a("html[dir=rtl]").length}this.next=function(a,b,d){b.css({margin:"0%",opacity:"0.01"}),b.animate({opacity:"1"},c,"linear",function(){a.css("margin","100%"),d()})},this.prev=function(a,b,d){b.css({margin:"0%",opacity:"0.01"}),b.animate({opacity:"1"},c,"linear",function(){a.css("margin","100%"),d()})}};Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"5.5.1",settings:{animation:"slide",timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,next_on_click:!0,animation_speed:500,stack_on_small:!1,navigation_arrows:!0,slide_number:!0,slide_number_text:"of",container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",preloader_class:"preloader",slide_selector:"*",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:!0,circular:!0,timer:!0,variable_height:!1,swipe:!0,before_slide_change:e,after_slide_change:e},init:function(a,b,c){this.bindings(b,c)},events:function(a){var b=new f(this.S(a),this.S(a).data("orbit-init"));this.S(a).data(this.name+"-instance",b)},reflow:function(){var a=this;if(a.S(a.scope).is("[data-orbit]")){var b=a.S(a.scope),c=b.data(a.name+"-instance");c.compute_dimensions()}else a.S("[data-orbit]",a.scope).each(function(b,c){var d=a.S(c),e=(a.data_options(d),d.data(a.name+"-instance"));e.compute_dimensions()})}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";function e(a){var b=/fade/i.test(a),c=/pop/i.test(a);return{animate:b||c,pop:c,fade:b}}Foundation.libs.reveal={name:"reveal",version:"5.5.1",locked:!1,settings:{animation:"fadeAndPop",animation_speed:250,close_on_background_click:!0,close_on_esc:!0,dismiss_modal_class:"close-reveal-modal",multiple_opened:!1,bg_class:"reveal-modal-bg",root_element:"body",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:a(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(b,c,d){a.extend(!0,this.settings,c,d),this.bindings(c,d)},events:function(){var a=this,b=a.S;return b(this.scope).off(".reveal").on("click.fndtn.reveal","["+this.add_namespace("data-reveal-id")+"]:not([disabled])",function(c){if(c.preventDefault(),!a.locked){var d=b(this),e=d.data(a.data_attr("reveal-ajax"));if(a.locked=!0,"undefined"==typeof e)a.open.call(a,d);else{var f=e===!0?d.attr("href"):e;a.open.call(a,d,{url:f})}}}),b(c).on("click.fndtn.reveal",this.close_targets(),function(c){if(c.preventDefault(),!a.locked){var d=b("["+a.attr_name()+"].open").data(a.attr_name(!0)+"-init")||a.settings,e=b(c.target)[0]===b("."+d.bg_class)[0];if(e){if(!d.close_on_background_click)return;c.stopPropagation()}a.locked=!0,a.close.call(a,e?b("["+a.attr_name()+"].open"):b(this).closest("["+a.attr_name()+"]"))}}),b("["+a.attr_name()+"]",this.scope).length>0?b(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video):b(this.scope).on("open.fndtn.reveal","["+a.attr_name()+"]",this.settings.open).on("opened.fndtn.reveal","["+a.attr_name()+"]",this.settings.opened).on("opened.fndtn.reveal","["+a.attr_name()+"]",this.open_video).on("close.fndtn.reveal","["+a.attr_name()+"]",this.settings.close).on("closed.fndtn.reveal","["+a.attr_name()+"]",this.settings.closed).on("closed.fndtn.reveal","["+a.attr_name()+"]",this.close_video),!0},key_up_on:function(){var a=this;return a.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal",function(b){var c=a.S("["+a.attr_name()+"].open"),d=c.data(a.attr_name(!0)+"-init")||a.settings;d&&27===b.which&&d.close_on_esc&&!a.locked&&a.close.call(a,c)}),!0},key_up_off:function(){return this.S("body").off("keyup.fndtn.reveal"),!0},open:function(c,d){var e,f=this;c?"undefined"!=typeof c.selector?e=f.S("#"+c.data(f.data_attr("reveal-id"))).first():(e=f.S(this.scope),d=c):e=f.S(this.scope);var g=e.data(f.attr_name(!0)+"-init");if(g=g||this.settings,e.hasClass("open")&&c.attr("data-reveal-id")==e.attr("id"))return f.close(e);if(!e.hasClass("open")){var h=f.S("["+f.attr_name()+"].open");if("undefined"==typeof e.data("css-top")&&e.data("css-top",parseInt(e.css("top"),10)).data("offset",this.cache_offset(e)),this.key_up_on(e),e.on("open.fndtn.reveal").trigger("open.fndtn.reveal"),h.length<1&&this.toggle_bg(e,!0),"string"==typeof d&&(d={url:d}),"undefined"!=typeof d&&d.url){var i="undefined"!=typeof d.success?d.success:null;a.extend(d,{success:function(b,c,d){if(a.isFunction(i)){var j=i(b,c,d);"string"==typeof j&&(b=j)}e.html(b),f.S(e).foundation("section","reflow"),f.S(e).children().foundation(),h.length>0&&(g.multiple_opened?this.to_back(h):this.hide(h,g.css.close)),f.show(e,g.css.open)}}),a.ajax(d)}else h.length>0&&(g.multiple_opened?this.to_back(h):this.hide(h,g.css.close)),this.show(e,g.css.open)}f.S(b).trigger("resize")},close:function(b){var b=b&&b.length?b:this.S(this.scope),c=this.S("["+this.attr_name()+"].open"),d=b.data(this.attr_name(!0)+"-init")||this.settings;c.length>0&&(this.locked=!0,this.key_up_off(b),b.trigger("close").trigger("close.fndtn.reveal"),(d.multiple_opened&&1===c.length||!d.multiple_opened||b.length>1)&&(this.toggle_bg(b,!1),this.to_front(b)),d.multiple_opened?(this.hide(b,d.css.close,d),this.to_front(a(a.makeArray(c).reverse()[1]))):this.hide(c,d.css.close,d))},close_targets:function(){var a="."+this.settings.dismiss_modal_class;return this.settings.close_on_background_click?a+", ."+this.settings.bg_class:a},toggle_bg:function(b,c){0===this.S("."+this.settings.bg_class).length&&(this.settings.bg=a("<div />",{"class":this.settings.bg_class}).appendTo("body").hide());var e=this.settings.bg.filter(":visible").length>0;c!=e&&((c==d?e:!c)?this.hide(this.settings.bg):this.show(this.settings.bg))},show:function(c,d){if(d){var f=c.data(this.attr_name(!0)+"-init")||this.settings,g=f.root_element;if(0===c.parent(g).length){var h=c.wrap('<div style="display: none;" />').parent();c.on("closed.fndtn.reveal.wrapped",function(){c.detach().appendTo(h),c.unwrap().unbind("closed.fndtn.reveal.wrapped")}),c.detach().appendTo(g)}var i=e(f.animation);if(i.animate||(this.locked=!1),i.pop){d.top=a(b).scrollTop()-c.data("offset")+"px";var j={top:a(b).scrollTop()+c.data("css-top")+"px",opacity:1};return setTimeout(function(){return c.css(d).animate(j,f.animation_speed,"linear",function(){this.locked=!1,c.trigger("opened").trigger("opened.fndtn.reveal")}.bind(this)).addClass("open")}.bind(this),f.animation_speed/2)}if(i.fade){d.top=a(b).scrollTop()+c.data("css-top")+"px";var j={opacity:1};return setTimeout(function(){return c.css(d).animate(j,f.animation_speed,"linear",function(){this.locked=!1,c.trigger("opened").trigger("opened.fndtn.reveal")}.bind(this)).addClass("open")}.bind(this),f.animation_speed/2)}return c.css(d).show().css({opacity:1}).addClass("open").trigger("opened").trigger("opened.fndtn.reveal")}var f=this.settings;return e(f.animation).fade?c.fadeIn(f.animation_speed/2):(this.locked=!1,c.show())},to_back:function(a){a.addClass("toback")},to_front:function(a){a.removeClass("toback")},hide:function(c,d){if(d){var f=c.data(this.attr_name(!0)+"-init");f=f||this.settings;var g=e(f.animation);if(g.animate||(this.locked=!1),g.pop){var h={top:-a(b).scrollTop()-c.data("offset")+"px",opacity:0};return setTimeout(function(){return c.animate(h,f.animation_speed,"linear",function(){this.locked=!1,c.css(d).trigger("closed").trigger("closed.fndtn.reveal")}.bind(this)).removeClass("open")}.bind(this),f.animation_speed/2)}if(g.fade){var h={opacity:0};return setTimeout(function(){return c.animate(h,f.animation_speed,"linear",function(){this.locked=!1,c.css(d).trigger("closed").trigger("closed.fndtn.reveal")}.bind(this)).removeClass("open")}.bind(this),f.animation_speed/2)}return c.hide().css(d).removeClass("open").trigger("closed").trigger("closed.fndtn.reveal")}var f=this.settings;return e(f.animation).fade?c.fadeOut(f.animation_speed/2):c.hide()},close_video:function(b){var c=a(".flex-video",b.target),d=a("iframe",c);d.length>0&&(d.attr("data-src",d[0].src),d.attr("src",d.attr("src")),c.hide())},open_video:function(b){var c=a(".flex-video",b.target),e=c.find("iframe");if(e.length>0){var f=e.attr("data-src");if("string"==typeof f)e[0].src=e.attr("data-src");else{var g=e[0].src;e[0].src=d,e[0].src=g}c.show()}},data_attr:function(a){return this.namespace.length>0?this.namespace+"-"+a:a},cache_offset:function(a){var b=a.show().height()+parseInt(a.css("top"),10);return a.hide(),b},off:function(){a(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(jQuery,window,window.document),function(a,b){"use strict";Foundation.libs.slider={name:"slider",version:"5.5.1",settings:{start:0,end:100,step:1,precision:null,initial:null,display_selector:"",vertical:!1,trigger_input_change:!1,on_change:function(){}},cache:{},init:function(a,b,c){Foundation.inherit(this,"throttle"),this.bindings(b,c),this.reflow()},events:function(){var c=this;a(this.scope).off(".slider").on("mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider","["+c.attr_name()+"]:not(.disabled, [disabled]) .range-slider-handle",function(b){c.cache.active||(b.preventDefault(),c.set_active_slider(a(b.target)))}).on("mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider",function(d){if(c.cache.active)if(d.preventDefault(),a.data(c.cache.active[0],"settings").vertical){var e=0;d.pageY||(e=b.scrollY),c.calculate_position(c.cache.active,c.get_cursor_position(d,"y")+e)}else c.calculate_position(c.cache.active,c.get_cursor_position(d,"x"))}).on("mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider",function(){c.remove_active_slider()}).on("change.fndtn.slider",function(){c.settings.on_change()}),c.S(b).on("resize.fndtn.slider",c.throttle(function(){c.reflow()},300))},get_cursor_position:function(a,b){var c,d="page"+b.toUpperCase(),e="client"+b.toUpperCase();return"undefined"!=typeof a[d]?c=a[d]:"undefined"!=typeof a.originalEvent[e]?c=a.originalEvent[e]:a.originalEvent.touches&&a.originalEvent.touches[0]&&"undefined"!=typeof a.originalEvent.touches[0][e]?c=a.originalEvent.touches[0][e]:a.currentPoint&&"undefined"!=typeof a.currentPoint[b]&&(c=a.currentPoint[b]),c},set_active_slider:function(a){this.cache.active=a},remove_active_slider:function(){this.cache.active=null},calculate_position:function(b,c){var d=this,e=a.data(b[0],"settings"),f=(a.data(b[0],"handle_l"),a.data(b[0],"handle_o"),a.data(b[0],"bar_l")),g=a.data(b[0],"bar_o");requestAnimationFrame(function(){var a;a=Foundation.rtl&&!e.vertical?d.limit_to((g+f-c)/f,0,1):d.limit_to((c-g)/f,0,1),a=e.vertical?1-a:a;var h=d.normalized_value(a,e.start,e.end,e.step,e.precision);d.set_ui(b,h)})},set_ui:function(b,c){var d=a.data(b[0],"settings"),e=a.data(b[0],"handle_l"),f=a.data(b[0],"bar_l"),g=this.normalized_percentage(c,d.start,d.end),h=g*(f-e)-1,i=100*g,j=b.parent(),k=b.parent().children("input[type=hidden]");Foundation.rtl&&!d.vertical&&(h=-h),h=d.vertical?-h+f-e+1:h,this.set_translate(b,h,d.vertical),d.vertical?b.siblings(".range-slider-active-segment").css("height",i+"%"):b.siblings(".range-slider-active-segment").css("width",i+"%"),j.attr(this.attr_name(),c).trigger("change").trigger("change.fndtn.slider"),k.val(c),d.trigger_input_change&&k.trigger("change"),b[0].hasAttribute("aria-valuemin")||b.attr({"aria-valuemin":d.start,"aria-valuemax":d.end}),b.attr("aria-valuenow",c),""!=d.display_selector&&a(d.display_selector).each(function(){this.hasOwnProperty("value")?a(this).val(c):a(this).text(c)})},normalized_percentage:function(a,b,c){return Math.min(1,(a-b)/(c-b))},normalized_value:function(a,b,c,d,e){var f=c-b,g=a*f,h=(g-g%d)/d,i=g%d,j=i>=.5*d?d:0;return(h*d+j+b).toFixed(e)},set_translate:function(b,c,d){d?a(b).css("-webkit-transform","translateY("+c+"px)").css("-moz-transform","translateY("+c+"px)").css("-ms-transform","translateY("+c+"px)").css("-o-transform","translateY("+c+"px)").css("transform","translateY("+c+"px)"):a(b).css("-webkit-transform","translateX("+c+"px)").css("-moz-transform","translateX("+c+"px)").css("-ms-transform","translateX("+c+"px)").css("-o-transform","translateX("+c+"px)").css("transform","translateX("+c+"px)")},limit_to:function(a,b,c){return Math.min(Math.max(a,b),c)},initialize_settings:function(b){var c,d=a.extend({},this.settings,this.data_options(a(b).parent()));null===d.precision&&(c=(""+d.step).match(/\.([\d]*)/),d.precision=c&&c[1]?c[1].length:0),d.vertical?(a.data(b,"bar_o",a(b).parent().offset().top),a.data(b,"bar_l",a(b).parent().outerHeight()),a.data(b,"handle_o",a(b).offset().top),a.data(b,"handle_l",a(b).outerHeight())):(a.data(b,"bar_o",a(b).parent().offset().left),a.data(b,"bar_l",a(b).parent().outerWidth()),a.data(b,"handle_o",a(b).offset().left),a.data(b,"handle_l",a(b).outerWidth())),a.data(b,"bar",a(b).parent()),a.data(b,"settings",d)},set_initial_position:function(b){var c=a.data(b.children(".range-slider-handle")[0],"settings"),d="number"!=typeof c.initial||isNaN(c.initial)?Math.floor(.5*(c.end-c.start)/c.step)*c.step+c.start:c.initial,e=b.children(".range-slider-handle");this.set_ui(e,d)},set_value:function(b){var c=this;a("["+c.attr_name()+"]",this.scope).each(function(){a(this).attr(c.attr_name(),b)}),a(this.scope).attr(c.attr_name())&&a(this.scope).attr(c.attr_name(),b),c.reflow()},reflow:function(){var b=this;b.S("["+this.attr_name()+"]").each(function(){var c=a(this).children(".range-slider-handle")[0],d=a(this).attr(b.attr_name());b.initialize_settings(c),d?b.set_ui(a(c),parseFloat(d)):b.set_initial_position(a(this))})}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.tab={name:"tab",version:"5.5.1",settings:{active_class:"active",callback:function(){},deep_linking:!1,scroll_to_content:!0,is_hover:!1},default_tab_hashes:[],init:function(a,c,d){var e=this,f=this.S;this.bindings(c,d),e.entry_location=b.location.href,this.handle_location_hash_change(),f("["+this.attr_name()+"] > .active > a",this.scope).each(function(){e.default_tab_hashes.push(this.hash)})},events:function(){var a=this,c=this.S,d=function(b){var d=c(this).closest("["+a.attr_name()+"]").data(a.attr_name(!0)+"-init");(!d.is_hover||Modernizr.touch)&&(b.preventDefault(),b.stopPropagation(),a.toggle_active_tab(c(this).parent()))};c(this.scope).off(".tab").on("focus.fndtn.tab","["+this.attr_name()+"] > * > a",d).on("click.fndtn.tab","["+this.attr_name()+"] > * > a",d).on("mouseenter.fndtn.tab","["+this.attr_name()+"] > * > a",function(){var b=c(this).closest("["+a.attr_name()+"]").data(a.attr_name(!0)+"-init");b.is_hover&&a.toggle_active_tab(c(this).parent())}),c(b).on("hashchange.fndtn.tab",function(b){b.preventDefault(),a.handle_location_hash_change()})},handle_location_hash_change:function(){var b=this,c=this.S;c("["+this.attr_name()+"]",this.scope).each(function(){var e=c(this).data(b.attr_name(!0)+"-init");if(e.deep_linking){var f;if(f=e.scroll_to_content?b.scope.location.hash:b.scope.location.hash.replace("fndtn-",""),""!=f){var g=c(f);if(g.hasClass("content")&&g.parent().hasClass("tabs-content"))b.toggle_active_tab(a("["+b.attr_name()+"] > * > a[href="+f+"]").parent());else{var h=g.closest(".content").attr("id");h!=d&&b.toggle_active_tab(a("["+b.attr_name()+"] > * > a[href=#"+h+"]").parent(),f)}}else for(var i=0;i<b.default_tab_hashes.length;i++)b.toggle_active_tab(a("["+b.attr_name()+"] > * > a[href="+b.default_tab_hashes[i]+"]").parent())}})},toggle_active_tab:function(e,f){var g=this,h=g.S,i=e.closest("["+this.attr_name()+"]"),j=e.find("a"),k=e.children("a").first(),l="#"+k.attr("href").split("#")[1],m=h(l),n=e.siblings(),o=i.data(this.attr_name(!0)+"-init"),p=function(b){var d,e=a(this),f=a(this).parents("li").prev().children('[role="tab"]'),g=a(this).parents("li").next().children('[role="tab"]');switch(b.keyCode){case 37:d=f;break;case 39:d=g;break;default:d=!1}d.length&&(e.attr({tabindex:"-1","aria-selected":null}),d.attr({tabindex:"0","aria-selected":!0}).focus()),a('[role="tabpanel"]').attr("aria-hidden","true"),a("#"+a(c.activeElement).attr("href").substring(1)).attr("aria-hidden",null)},q=function(a){var c=b.location.href===g.entry_location,d=o.scroll_to_content?g.default_tab_hashes[0]:c?b.location.hash:"fndtn-"+g.default_tab_hashes[0].replace("#","");c&&a===d||(b.location.hash=a)};h(this).data(this.data_attr("tab-content"))&&(l="#"+h(this).data(this.data_attr("tab-content")).split("#")[1],m=h(l)),o.deep_linking&&(o.scroll_to_content?(q(f||l),f==d||f==l?e.parent()[0].scrollIntoView():h(l)[0].scrollIntoView()):q(f!=d?"fndtn-"+f.replace("#",""):"fndtn-"+l.replace("#",""))),e.addClass(o.active_class).triggerHandler("opened"),j.attr({"aria-selected":"true",tabindex:0}),n.removeClass(o.active_class),n.find("a").attr({"aria-selected":"false",tabindex:-1}),m.siblings().removeClass(o.active_class).attr({"aria-hidden":"true",tabindex:-1}),m.addClass(o.active_class).attr("aria-hidden","false").removeAttr("tabindex"),o.callback(e),m.triggerHandler("toggled",[e]),i.triggerHandler("toggled",[m]),j.off("keydown").on("keydown",p)},data_attr:function(a){return this.namespace.length>0?this.namespace+"-"+a:a},off:function(){},reflow:function(){}}}(jQuery,window,window.document),function(a,b){"use strict";Foundation.libs.tooltip={name:"tooltip",version:"5.5.1",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:!1,hover_delay:200,show_on:"all",tip_template:function(a,b){return'<span data-selector="'+a+'" id="'+a+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'" role="tooltip">'+b+'<span class="nub"></span></span>'}},cache:{},init:function(a,b,c){Foundation.inherit(this,"random_str"),this.bindings(b,c)},should_show:function(b){var c=a.extend({},this.settings,this.data_options(b));return"all"===c.show_on?!0:this.small()&&"small"===c.show_on?!0:this.medium()&&"medium"===c.show_on?!0:this.large()&&"large"===c.show_on?!0:!1},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},events:function(b){var c=this,d=c.S;c.create(this.S(b)),a(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]",function(b){var e=d(this),f=a.extend({},c.settings,c.data_options(e)),g=!1;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(b.type)&&d(b.target).is("a"))return!1;if(/mouse/i.test(b.type)&&c.ie_touch(b))return!1;if(e.hasClass("open"))Modernizr.touch&&/touchstart|MSPointerDown/i.test(b.type)&&b.preventDefault(),c.hide(e);else{if(f.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(b.type))return;!f.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(b.type)&&(b.preventDefault(),d(f.tooltip_class+".open").hide(),g=!0),/enter|over/i.test(b.type)?this.timer=setTimeout(function(){c.showTip(e)}.bind(this),c.settings.hover_delay):"mouseout"===b.type||"mouseleave"===b.type?(clearTimeout(this.timer),c.hide(e)):c.showTip(e)}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(b){return/mouse/i.test(b.type)&&c.ie_touch(b)?!1:void(("touch"!=a(this).data("tooltip-open-event-type")||"mouseleave"!=b.type)&&("mouse"==a(this).data("tooltip-open-event-type")&&/MSPointerDown|touchstart/i.test(b.type)?c.convert_to_touch(a(this)):c.hide(a(this))))}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(){c.hide(d(this))})},ie_touch:function(){return!1},showTip:function(a){var b=this.getTip(a);return this.should_show(a,b)?this.show(a):void 0},getTip:function(b){var c=this.selector(b),d=a.extend({},this.settings,this.data_options(b)),e=null;return c&&(e=this.S('span[data-selector="'+c+'"]'+d.tooltip_class)),"object"==typeof e?e:!1},selector:function(a){var b=a.attr("id"),c=a.attr(this.attr_name())||a.attr("data-selector");return(b&&b.length<1||!b)&&"string"!=typeof c&&(c=this.random_str(6),a.attr("data-selector",c).attr("aria-describedby",c)),b&&b.length>0?b:c},create:function(c){var d=this,e=a.extend({},this.settings,this.data_options(c)),f=this.settings.tip_template;"string"==typeof e.tip_template&&b.hasOwnProperty(e.tip_template)&&(f=b[e.tip_template]);var g=a(f(this.selector(c),a("<div></div>").html(c.attr("title")).html())),h=this.inheritable_classes(c);g.addClass(h).appendTo(e.append_to),Modernizr.touch&&(g.append('<span class="tap-to-close">'+e.touch_close_text+"</span>"),g.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(){d.hide(c)})),c.removeAttr("title").attr("title","")},reposition:function(b,c,d){var e,f,g,h,i;if(c.css("visibility","hidden").show(),e=b.data("width"),f=c.children(".nub"),g=f.outerHeight(),h=f.outerHeight(),c.css(this.small()?{width:"100%"}:{width:e?e:"auto"}),i=function(a,b,c,d,e){return a.css({top:b?b:"auto",bottom:d?d:"auto",left:e?e:"auto",right:c?c:"auto"}).end()},i(c,b.offset().top+b.outerHeight()+10,"auto","auto",b.offset().left),this.small())i(c,b.offset().top+b.outerHeight()+10,"auto","auto",12.5,a(this.scope).width()),c.addClass("tip-override"),i(f,-g,"auto","auto",b.offset().left);else{var j=b.offset().left;Foundation.rtl&&(f.addClass("rtl"),j=b.offset().left+b.outerWidth()-c.outerWidth()),i(c,b.offset().top+b.outerHeight()+10,"auto","auto",j),c.removeClass("tip-override"),d&&d.indexOf("tip-top")>-1?(Foundation.rtl&&f.addClass("rtl"),i(c,b.offset().top-c.outerHeight(),"auto","auto",j).removeClass("tip-override")):d&&d.indexOf("tip-left")>-1?(i(c,b.offset().top+b.outerHeight()/2-c.outerHeight()/2,"auto","auto",b.offset().left-c.outerWidth()-g).removeClass("tip-override"),f.removeClass("rtl")):d&&d.indexOf("tip-right")>-1&&(i(c,b.offset().top+b.outerHeight()/2-c.outerHeight()/2,"auto","auto",b.offset().left+b.outerWidth()+g).removeClass("tip-override"),f.removeClass("rtl"))}c.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},inheritable_classes:function(b){var c=a.extend({},this.settings,this.data_options(b)),d=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(c.additional_inheritable_classes),e=b.attr("class"),f=e?a.map(e.split(" "),function(b){return-1!==a.inArray(b,d)?b:void 0}).join(" "):"";return a.trim(f)},convert_to_touch:function(b){var c=this,d=c.getTip(b),e=a.extend({},c.settings,c.data_options(b));0===d.find(".tap-to-close").length&&(d.append('<span class="tap-to-close">'+e.touch_close_text+"</span>"),d.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(){c.hide(b)})),b.data("tooltip-open-event-type","touch")},show:function(a){var b=this.getTip(a);"touch"==a.data("tooltip-open-event-type")&&this.convert_to_touch(a),this.reposition(a,b,a.attr("class")),a.addClass("open"),b.fadeIn(150)},hide:function(a){var b=this.getTip(a);b.fadeOut(150,function(){b.find(".tap-to-close").remove(),b.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"),a.removeClass("open")})},off:function(){var b=this;this.S(this.scope).off(".fndtn.tooltip"),this.S(this.settings.tooltip_class).each(function(c){a("["+b.attr_name()+"]").eq(c).attr("title",a(this).text())}).remove()},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c){"use strict";Foundation.libs.topbar={name:"topbar",version:"5.5.1",settings:{index:0,sticky_class:"sticky",custom_back_text:!0,back_text:"Back",mobile_show_parent_link:!0,is_hover:!0,scrolltop:!0,sticky_on:"all"},init:function(b,c,d){Foundation.inherit(this,"add_custom_rule register_media throttle");var e=this;e.register_media("topbar","foundation-mq-topbar"),this.bindings(c,d),e.S("["+this.attr_name()+"]",this.scope).each(function(){{var b=a(this),c=b.data(e.attr_name(!0)+"-init");e.S("section, .top-bar-section",this)}b.data("index",0);var d=b.parent();d.hasClass("fixed")||e.is_sticky(b,d,c)?(e.settings.sticky_class=c.sticky_class,e.settings.sticky_topbar=b,b.data("height",d.outerHeight()),b.data("stickyoffset",d.offset().top)):b.data("height",b.outerHeight()),c.assembled||e.assemble(b),c.is_hover?e.S(".has-dropdown",b).addClass("not-click"):e.S(".has-dropdown",b).removeClass("not-click"),e.add_custom_rule(".f-topbar-fixed { padding-top: "+b.data("height")+"px }"),d.hasClass("fixed")&&e.S("body").addClass("f-topbar-fixed")})},is_sticky:function(a,b,c){var d=b.hasClass(c.sticky_class),e=matchMedia(Foundation.media_queries.small).matches,f=matchMedia(Foundation.media_queries.medium).matches,g=matchMedia(Foundation.media_queries.large).matches;return d&&"all"===c.sticky_on?!0:d&&this.small()&&-1!==c.sticky_on.indexOf("small")&&e&&!f&&!g?!0:d&&this.medium()&&-1!==c.sticky_on.indexOf("medium")&&e&&f&&!g?!0:d&&this.large()&&-1!==c.sticky_on.indexOf("large")&&e&&f&&g?!0:d&&navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?!0:!1},toggle:function(c){var d,e=this;d=c?e.S(c).closest("["+this.attr_name()+"]"):e.S("["+this.attr_name()+"]");
var f=d.data(this.attr_name(!0)+"-init"),g=e.S("section, .top-bar-section",d);e.breakpoint()&&(e.rtl?(g.css({right:"0%"}),a(">.name",g).css({right:"100%"})):(g.css({left:"0%"}),a(">.name",g).css({left:"100%"})),e.S("li.moved",g).removeClass("moved"),d.data("index",0),d.toggleClass("expanded").css("height","")),f.scrolltop?d.hasClass("expanded")?d.parent().hasClass("fixed")&&(f.scrolltop?(d.parent().removeClass("fixed"),d.addClass("fixed"),e.S("body").removeClass("f-topbar-fixed"),b.scrollTo(0,0)):d.parent().removeClass("expanded")):d.hasClass("fixed")&&(d.parent().addClass("fixed"),d.removeClass("fixed"),e.S("body").addClass("f-topbar-fixed")):(e.is_sticky(d,d.parent(),f)&&d.parent().addClass("fixed"),d.parent().hasClass("fixed")&&(d.hasClass("expanded")?(d.addClass("fixed"),d.parent().addClass("expanded"),e.S("body").addClass("f-topbar-fixed")):(d.removeClass("fixed"),d.parent().removeClass("expanded"),e.update_sticky_positioning())))},timer:null,events:function(){var c=this,d=this.S;d(this.scope).off(".topbar").on("click.fndtn.topbar","["+this.attr_name()+"] .toggle-topbar",function(a){a.preventDefault(),c.toggle(this)}).on("click.fndtn.topbar",'.top-bar .top-bar-section li a[href^="#"],['+this.attr_name()+'] .top-bar-section li a[href^="#"]',function(){var b=a(this).closest("li");!c.breakpoint()||b.hasClass("back")||b.hasClass("has-dropdown")||c.toggle()}).on("click.fndtn.topbar","["+this.attr_name()+"] li.has-dropdown",function(b){var e=d(this),f=d(b.target),g=e.closest("["+c.attr_name()+"]"),h=g.data(c.attr_name(!0)+"-init");return f.data("revealId")?void c.toggle():void(c.breakpoint()||(!h.is_hover||Modernizr.touch)&&(b.stopImmediatePropagation(),e.hasClass("hover")?(e.removeClass("hover").find("li").removeClass("hover"),e.parents("li.hover").removeClass("hover")):(e.addClass("hover"),a(e).siblings().removeClass("hover"),"A"===f[0].nodeName&&f.parent().hasClass("has-dropdown")&&b.preventDefault())))}).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown>a",function(a){if(c.breakpoint()){a.preventDefault();var b=d(this),e=b.closest("["+c.attr_name()+"]"),f=e.find("section, .top-bar-section"),g=(b.next(".dropdown").outerHeight(),b.closest("li"));e.data("index",e.data("index")+1),g.addClass("moved"),c.rtl?(f.css({right:-(100*e.data("index"))+"%"}),f.find(">.name").css({right:100*e.data("index")+"%"})):(f.css({left:-(100*e.data("index"))+"%"}),f.find(">.name").css({left:100*e.data("index")+"%"})),e.css("height",b.siblings("ul").outerHeight(!0)+e.data("height"))}}),d(b).off(".topbar").on("resize.fndtn.topbar",c.throttle(function(){c.resize.call(c)},50)).trigger("resize").trigger("resize.fndtn.topbar").load(function(){d(this).trigger("resize.fndtn.topbar")}),d("body").off(".topbar").on("click.fndtn.topbar",function(a){var b=d(a.target).closest("li").closest("li.hover");b.length>0||d("["+c.attr_name()+"] li.hover").removeClass("hover")}),d(this.scope).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown .back",function(a){a.preventDefault();var b=d(this),e=b.closest("["+c.attr_name()+"]"),f=e.find("section, .top-bar-section"),g=(e.data(c.attr_name(!0)+"-init"),b.closest("li.moved")),h=g.parent();e.data("index",e.data("index")-1),c.rtl?(f.css({right:-(100*e.data("index"))+"%"}),f.find(">.name").css({right:100*e.data("index")+"%"})):(f.css({left:-(100*e.data("index"))+"%"}),f.find(">.name").css({left:100*e.data("index")+"%"})),0===e.data("index")?e.css("height",""):e.css("height",h.outerHeight(!0)+e.data("height")),setTimeout(function(){g.removeClass("moved")},300)}),d(this.scope).find(".dropdown a").focus(function(){a(this).parents(".has-dropdown").addClass("hover")}).blur(function(){a(this).parents(".has-dropdown").removeClass("hover")})},resize:function(){var a=this;a.S("["+this.attr_name()+"]").each(function(){var b,d=a.S(this),e=d.data(a.attr_name(!0)+"-init"),f=d.parent("."+a.settings.sticky_class);if(!a.breakpoint()){var g=d.hasClass("expanded");d.css("height","").removeClass("expanded").find("li").removeClass("hover"),g&&a.toggle(d)}a.is_sticky(d,f,e)&&(f.hasClass("fixed")?(f.removeClass("fixed"),b=f.offset().top,a.S(c.body).hasClass("f-topbar-fixed")&&(b-=d.data("height")),d.data("stickyoffset",b),f.addClass("fixed")):(b=f.offset().top,d.data("stickyoffset",b)))})},breakpoint:function(){return!matchMedia(Foundation.media_queries.topbar).matches},small:function(){return matchMedia(Foundation.media_queries.small).matches},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},assemble:function(b){var c=this,d=b.data(this.attr_name(!0)+"-init"),e=c.S("section, .top-bar-section",b);e.detach(),c.S(".has-dropdown>a",e).each(function(){var b,e=c.S(this),f=e.siblings(".dropdown"),g=e.attr("href");f.find(".title.back").length||(b=a(1==d.mobile_show_parent_link&&g?'<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-large-up"><a class="parent-link js-generated" href="'+g+'">'+e.html()+"</a></li>":'<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>'),a("h5>a",b).html(1==d.custom_back_text?d.back_text:"&laquo; "+e.html()),f.prepend(b))}),e.appendTo(b),this.sticky(),this.assembled(b)},assembled:function(b){b.data(this.attr_name(!0),a.extend({},b.data(this.attr_name(!0)),{assembled:!0}))},height:function(b){var c=0,d=this;return a("> li",b).each(function(){c+=d.S(this).outerHeight(!0)}),c},sticky:function(){var a=this;this.S(b).on("scroll",function(){a.update_sticky_positioning()})},update_sticky_positioning:function(){var a="."+this.settings.sticky_class,c=this.S(b),d=this;if(d.settings.sticky_topbar&&d.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(),this.settings)){var e=this.settings.sticky_topbar.data("stickyoffset");d.S(a).hasClass("expanded")||(c.scrollTop()>e?d.S(a).hasClass("fixed")||(d.S(a).addClass("fixed"),d.S("body").addClass("f-topbar-fixed")):c.scrollTop()<=e&&d.S(a).hasClass("fixed")&&(d.S(a).removeClass("fixed"),d.S("body").removeClass("f-topbar-fixed")))}},off:function(){this.S(this.scope).off(".fndtn.topbar"),this.S(b).off(".fndtn.topbar")},reflow:function(){}}}(jQuery,window,window.document);
/*!
  hey, [be]Lazy.js - v1.3.1 - 2015.02.01 
  A lazy loading and multi-serving image script
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
;(function(root, blazy) {
	if (typeof define === 'function' && define.amd) {
        // AMD. Register bLazy as an anonymous module
        define(blazy);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node. 
		module.exports = blazy();
	} else {
        // Browser globals. Register bLazy on window
        root.Blazy = blazy();
	}
})(this, function () {
	'use strict';
	
	//vars
	var source, options, viewport, images, count, isRetina, destroyed;
	//throttle vars
	var validateT, saveViewportOffsetT;
	
	// constructor
	function Blazy(settings) {
		//IE7- fallback for missing querySelectorAll support
		if (!document.querySelectorAll) {
			var s=document.createStyleSheet();
			document.querySelectorAll = function(r, c, i, j, a) {
				a=document.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
				for (i=r.length; i--;) {
					s.addRule(r[i], 'k:v');
					for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
						s.removeRule(0);
				}
				return c;
			};
		}
		//init vars
		destroyed 				= true;
		images 					= [];
		viewport				= {};
		//options
		options 				= settings 				|| {};
		options.error	 		= options.error 		|| false;
		options.offset			= options.offset 		|| 100;
		options.success			= options.success 		|| false;
	  	options.selector 		= options.selector 		|| '.b-lazy';
		options.separator 		= options.separator 	|| '|';
		options.container		= options.container 	?  document.querySelectorAll(options.container) : false;
		options.errorClass 		= options.errorClass 	|| 'b-error';
		options.breakpoints		= options.breakpoints	|| false;
		options.successClass 	= options.successClass 	|| 'b-loaded';
		options.src = source 	= options.src			|| 'data-src';
		isRetina				= window.devicePixelRatio > 1;
		viewport.top 			= 0 - options.offset;
		viewport.left 			= 0 - options.offset;
		//throttle, ensures that we don't call the functions too often
		validateT				= throttle(validate, 25); 
		saveViewportOffsetT			= throttle(saveViewportOffset, 50);

		saveViewportOffset();	
				
		//handle multi-served image src
		each(options.breakpoints, function(object){
			if(object.width >= window.screen.width) {
				source = object.src;
				return false;
			}
		});
		
		// start lazy load
		initialize();	
  	}
	
	/* public functions
	************************************/
	Blazy.prototype.revalidate = function() {
 		initialize();
   	};
	Blazy.prototype.load = function(element, force){
		if(!isElementLoaded(element)) loadImage(element, force);
	};
	Blazy.prototype.destroy = function(){
		if(options.container){
			each(options.container, function(object){
				unbindEvent(object, 'scroll', validateT);
			});
		}
		unbindEvent(window, 'scroll', validateT);
		unbindEvent(window, 'resize', validateT);
		unbindEvent(window, 'resize', saveViewportOffsetT);
		count = 0;
		images.length = 0;
		destroyed = true;
	};
	
	/* private helper functions
	************************************/
	function initialize(){
		// First we create an array of images to lazy load
		createImageArray(options.selector);
		// Then we bind resize and scroll events if not already binded
		if(destroyed) {
			destroyed = false;
			if(options.container) {
	 			each(options.container, function(object){
	 				bindEvent(object, 'scroll', validateT);
	 			});
	 		}
			bindEvent(window, 'resize', saveViewportOffsetT);
			bindEvent(window, 'resize', validateT);
	 		bindEvent(window, 'scroll', validateT);
		}
		// And finally, we start to lazy load. Should bLazy ensure domready?
		validate();	
	}
	
	function validate() {
		for(var i = 0; i<count; i++){
			var image = images[i];
 			if(elementInView(image) || isElementLoaded(image)) {
				Blazy.prototype.load(image);
 				images.splice(i, 1);
 				count--;
 				i--;
 			} 
 		}
		if(count === 0) {
			Blazy.prototype.destroy();
		}
	}
	
	function loadImage(ele, force){
		// if element is visible
		if(force || (ele.offsetWidth > 0 && ele.offsetHeight > 0)) {
			var dataSrc = ele.getAttribute(source) || ele.getAttribute(options.src); // fallback to default data-src
			if(dataSrc) {
				var dataSrcSplitted = dataSrc.split(options.separator);
				var src = dataSrcSplitted[isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
				var img = new Image();
				// cleanup markup, remove data source attributes
				each(options.breakpoints, function(object){
					ele.removeAttribute(object.src);
				});
				ele.removeAttribute(options.src);
				img.onerror = function() {
					if(options.error) options.error(ele, "invalid");
					ele.className = ele.className + ' ' + options.errorClass;
				}; 
				img.onload = function() {
					// Is element an image or should we add the src as a background image?
			      		ele.nodeName.toLowerCase() === 'img' ? ele.src = src : ele.style.backgroundImage = 'url("' + src + '")';	
					ele.className = ele.className + ' ' + options.successClass;	
					if(options.success) options.success(ele);
				};
				img.src = src; //preload image
			} else {
				if(options.error) options.error(ele, "missing");
				ele.className = ele.className + ' ' + options.errorClass;
			}
		}
	 }
			
	function elementInView(ele) {
		var rect = ele.getBoundingClientRect();
		
		return (
			// Intersection
			rect.right >= viewport.left
			&& rect.bottom >= viewport.top
			&& rect.left <= viewport.right
			&& rect.top <= viewport.bottom
		 );
	 }
	 
	 function isElementLoaded(ele) {
		 return (' ' + ele.className + ' ').indexOf(' ' + options.successClass + ' ') !== -1;
	 }
	 
	 function createImageArray(selector) {
 		var nodelist 	= document.querySelectorAll(selector);
 		count 			= nodelist.length;
 		//converting nodelist to array
 		for(var i = count; i--; images.unshift(nodelist[i])){}
	 }
	 
	 function saveViewportOffset(){
		 viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + options.offset;
		 viewport.right = (window.innerWidth || document.documentElement.clientWidth) + options.offset;
	 }
	 
	 function bindEvent(ele, type, fn) {
		 if (ele.attachEvent) {
         		ele.attachEvent && ele.attachEvent('on' + type, fn);
       	 	} else {
         	       ele.addEventListener(type, fn, false);
       		}
	 }
	 
	 function unbindEvent(ele, type, fn) {
		 if (ele.detachEvent) {
         		ele.detachEvent && ele.detachEvent('on' + type, fn);
       	 	} else {
         	       ele.removeEventListener(type, fn, false);
       		}
	 }
	 
	 function each(object, fn){
 		if(object && fn) {
 			var l = object.length;
 			for(var i = 0; i<l && fn(object[i], i) !== false; i++){}
 		}
	 }
	 
	 function throttle(fn, minDelay) {
     		 var lastCall = 0;
		 return function() {
			 var now = +new Date();
         		 if (now - lastCall < minDelay) {
           			 return;
			 }
         		 lastCall = now;
         		 fn.apply(images, arguments);
       		 };
	 }
  	
	 return Blazy;
});

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

$(document).ready(function() {

    // Hide the directory navigation
    // $('.division-directory').hide();


    // Show/Hide the directory navigation on-click
    $('.directory-toggle').click(function() {
        $(this).toggleClass("active");
        $('.division-directory').toggleClass("active");

        var state = $(this).attr('aria-expanded') == 'false' ? true : false;
        $(this).attr('aria-expanded', state);

        var stateHidden = $('#collapsible-0').attr('aria-hidden') == 'false' ? true : false;
        $('#collapsible-0').attr('aria-hidden', stateHidden);


        return false;
    });


    // For small screens - show/hide the search on-click
    $('.search-toggle').click(function() {
        $(this).toggleClass('active');
        $('.division-search').slideToggle();

        var state = $(this).attr('aria-expanded') == 'false' ? true : false;
        $(this).attr('aria-expanded', state);

        var stateHidden = $('#collapsible-1').attr('aria-hidden') == 'false' ? true : false;
        $('#collapsible-1').attr('aria-hidden', stateHidden);
        
        return false;
    });


});
// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var bLazy = new Blazy();

  $(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $("#content").fitVids();
  });
function GetLocation(address) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'address': address }, function (results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
	    //ParseLocation(results[0].geometry.location);
	    return results[0].geometry.location;
	  } else {
	    alert('error: ' + status);
	  }
	});
}
  
function initialize() {
  
    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
	    zoom: 15,
	    scrollwheel: false,
	    draggable: true,
	    panControl: false,
	    center: new google.maps.LatLng(55.6468, 37.581),
	    mapTypeControlOptions: {
	      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	    }
	  };

	jQuery('#mini-map').each(function(index, element) {
		var name = jQuery(this).data("title");
		var lat = jQuery(this).data("lat");
		var lng = jQuery(this).data("lng");
		var address = jQuery(this).data("address");
		var venueLatLng;
		var venue = this;

		if (lat && lng) {
			var place = new google.maps.LatLng(lat, lng);
			mapOptions['center'] = place;
			//var myOptions = {zoom: 16, center: place, mapTypeId: google.maps.MapTypeId.ROADMAP };
	   		var map = new google.maps.Map(document.getElementById("mini-map"),mapOptions);
	   		var geomarker = new google.maps.Marker({ map: map, position: place });
		    map.mapTypes.set('map_style', styledMap);
		    map.setMapTypeId('map_style');
		} else {
	    	var geocoder = new google.maps.Geocoder();
	  		geocoder.geocode({ 'address': address }, function (results, status) {
		        if (status == google.maps.GeocoderStatus.OK) {
			        place = results[0].geometry.location;
			        mapOptions['center'] = place;
			        var map = new google.maps.Map(document.getElementById("mini-map"),mapOptions);
			        var geomarker = new google.maps.Marker({ map: map, position: place });  
					map.mapTypes.set('map_style', styledMap);
					map.setMapTypeId('map_style');
		      	}
		    });
	    }
	});
}

window.onload = initialize();
// all map styles
var styles = [	 

    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#d3d3d3"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c252b"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0a090a"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#787878"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#3f3f3f"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#676767"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d77167"
            },
            {
                "lightness": 17
            }
        ]
    }
];
/*!
* Metro JS for jQuery
* http://drewgreenwell.com/ 
* For details and usage info see: http://drewgreenwell.com/projects/metrojs
Copyright (C) 2013, Drew Greenwell
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(n){var r,f,e,o;n.fn.metrojs={capabilities:null,checkCapabilities:function(t,i){return(n.fn.metrojs.capabilities==null||typeof i!="undefined"&&i==!0)&&(n.fn.metrojs.capabilities=new n.fn.metrojs.MetroModernizr(t)),n.fn.metrojs.capabilities}};r=n.fn.metrojs;f=window.console;typeof f!="object"&&(f={},f.log=function(){},f.error=function(){});e=typeof n.error=="function"?n.error:f.error;o=99e3;n.fn.liveTile=function(t){var r,i;if(u[t]){for(r=[],i=1;i<=arguments.length;i++)r[i-1]=arguments[i];return u[t].apply(this,r)}return typeof t!="object"&&t?(n.error("Method "+t+" does not exist on jQuery.liveTile"),null):u.init.apply(this,arguments)};n.fn.liveTile.contentModules={modules:[],addContentModule:function(n,t){this.modules instanceof Array||(this.modules=[]);this.modules.push(t)},hasContentModule:function(n){if(typeof n=="undefined"||!(this.modules instanceof Array))return-1;for(var t=0;t<this.modules.length;t++)if(typeof this.modules[t].moduleName!="undefined"&&this.modules[t].moduleName==n)return t;return-1}};n.fn.liveTile.defaults={mode:"slide",speed:500,initDelay:-1,delay:5e3,stops:"100%",stack:!1,direction:"vertical",animationDirection:"forward",tileSelector:">div,>li,>p,>img,>a",tileFaceSelector:">div,>li,>p,>img,>a",ignoreDataAttributes:!1,click:null,link:"",newWindow:!1,bounce:!1,bounceDirections:"all",bounceFollowsMove:!0,pauseOnHover:!1,pauseOnHoverEvent:"both",playOnHover:!1,playOnHoverEvent:"both",onHoverDelay:0,onHoverOutDelay:200,repeatCount:-1,appendBack:!0,alwaysTrigger:!1,flipListOnHover:!1,flipListOnHoverEvent:"mouseout",noHAflipOpacity:"1",haTransFunc:"ease",noHaTransFunc:"linear",currentIndex:0,startNow:!0,useModernizr:typeof Modernizr!="undefined",useHardwareAccel:!0,useTranslate:!0,faces:{$front:null,$back:null},animationStarting:function(){},animationComplete:function(){},triggerDelay:function(){return Math.random()*3e3},swap:"",swapFront:"-",swapBack:"-",contentModules:[],rebindMessage:"tile data is missing. Are you missing a call to rebind or destroy? You may also be able to avoid this error by calling stop or pause"};var u={init:function(u){var f=n.extend({},n.fn.liveTile.defaults,u);return r.checkCapabilities(f),i.getBrowserPrefix(),n.fn.liveTile.contentModules.hasContentModule("image")==-1&&n.fn.liveTile.contentModules.addContentModule("image",s.imageSwap),n.fn.liveTile.contentModules.hasContentModule("html")==-1&&n.fn.liveTile.contentModules.addContentModule("html",s.htmlSwap),n(this).each(function(i,r){var e=n(r),u=t.initTileData(e,f),o;u.faces=t.prepTile(e,u);u.fade=function(n){t.fade(e,n)};u.slide=function(n){t.slide(e,n)};u.carousel=function(n){t.carousel(e,n)};u.flip=function(n){t.flip(e,n)};u.flipList=function(n){t.flipList(e,n)};o={fade:u.fade,slide:u.slide,carousel:u.carousel,flip:u.flip,"flip-list":u.flipList};u.doAction=function(n){var t=o[u.mode];typeof t=="function"&&(t(n),u.hasRun=!0);n==u.timer.repeatCount&&(u.runEvents=!1)};u.timer=new n.fn.metrojs.TileTimer(u.delay,u.doAction,u.repeatCount);e.data("LiveTile",u);(u.mode!=="flip-list"||u.flipListOnHover==!1)&&(u.pauseOnHover?t.bindPauseOnHover(e):u.playOnHover&&t.bindPlayOnHover(e,u));(u.link.length>0||typeof u.click=="function")&&e.css({cursor:"pointer"}).bind("click.liveTile",function(n){var t=!0;typeof u.click=="function"&&(t=u.click(e,u)||!1);t&&u.link.length>0&&(n.preventDefault(),u.newWindow?window.open(u.link):window.location=u.link)});t.bindBounce(e,u);u.startNow&&u.mode!="none"&&(u.runEvents=!0,u.timer.start(u.initDelay))})},goto:function(t){var i,r=typeof t,u;if(r==="undefined"&&(i={index:-99,delay:0,autoAniDirection:!1}),r!=="number"&&isNaN(t))if(r==="string")if(t=="next")i={index:-99,delay:0};else if(t.indexOf("prev")===0)i={index:-100,delay:0};else return n.error(t+' is not a recognized action for .liveTile("goto")'),n(this);else r==="object"&&(typeof t.delay=="undefined"&&(t.delay=0),u=typeof t.index,u==="undefined"?t.index=0:u==="string"&&(t.index==="next"?t.index=-99:t.index.indexOf("prev")===0&&(t.index=-100)),i=t);else i={index:parseInt(t,10),delay:0};return n(this).each(function(t,r){var o=n(r),u=o.data("LiveTile"),h=o.data("metrojs.tile"),f=i.index,s,e;if(h.animating===!0)return n(this);if(u.mode==="carousel"){if(s=u.faces.$listTiles.filter(".active"),e=u.faces.$listTiles.index(s),f===-100?((typeof i.autoAniDirection=="undefined"||i.autoAniDirection==!0)&&(u.tempValues.animationDirection=typeof i.animationDirection=="undefined"?"backward":i.animationDirection),f=e===0?u.faces.$listTiles.length-1:e-1):f===-99&&((typeof i.autoAniDirection=="undefined"||i.autoAniDirection==!0)&&(u.tempValues.animationDirection=typeof i.animationDirection=="undefined"?"forward":i.animationDirection),f=e+1),e==f)return;typeof i.direction!="undefined"&&(u.tempValues.direction=i.direction);typeof i.animationDirection!="undefined"&&(u.tempValues.animationDirection=i.animationDirection);u.currentIndex=f==0?u.faces.$listTiles.length:f-1}else u.currentIndex=f;u.runEvents=!0;u.timer.start(i.delay>=0?i.delay:u.delay)})},play:function(t){var i,r=typeof t;return r==="undefined"?i={delay:-1}:r==="number"?i={delay:t}:r==="object"&&(typeof t.delay=="undefined"&&(t.delay=-1),i=t),n(this).each(function(t,r){var f=n(r),u=f.data("LiveTile");u.runEvents=!0;i.delay<0&&!u.hasRun&&(i.delay=u.initDelay);u.timer.start(i.delay>=0?i.delay:u.delay)})},animate:function(){return n(this).each(function(t,i){var r=n(i),u=r.data("LiveTile");u.doAction()})},stop:function(){return n(this).each(function(t,i){var u=n(i),r=u.data("LiveTile");r.hasRun=!1;r.runEvents=!1;r.timer.stop();window.clearTimeout(r.eventTimeout);window.clearTimeout(r.flCompleteTimeout);window.clearTimeout(r.completeTimeout);r.mode==="flip-list"&&r.faces.$listTiles.each(function(t,i){var r=n(i).data("metrojs.tile");window.clearTimeout(r.eventTimeout);window.clearTimeout(r.flCompleteTimeout);window.clearTimeout(r.completeTimeout)})})},pause:function(){return n(this).each(function(t,i){var u=n(i),r=u.data("LiveTile");r.timer.pause();r.runEvents=!1;window.clearTimeout(r.eventTimeout);window.clearTimeout(r.flCompleteTimeout);window.clearTimeout(r.completeTimeout);r.mode==="flip-list"&&r.faces.$listTiles.each(function(t,i){var r=n(i).data("metrojs.tile");window.clearTimeout(r.eventTimeout);window.clearTimeout(r.flCompleteTimeout);window.clearTimeout(r.completeTimeout)})})},restart:function(t){var i,r=typeof t;return r==="undefined"?i={delay:-1}:r==="number"?i={delay:t}:r==="object"&&(typeof t.delay=="undefined"&&(t.delay=-1),i=t),n(this).each(function(t,r){var f=n(r),u=f.data("LiveTile");i.delay<0&&!u.hasRun&&(i.delay=u.initDelay);u.hasRun=!1;u.runEvents=!0;u.timer.restart(i.delay>=0?i.delay:u.delay)})},rebind:function(t){return n(this).each(function(n,i){typeof t!="undefined"?(typeof t.timer!="undefined"&&t.timer!=null&&t.timer.stop(),t.hasRun=!1,u.init.apply(i,[t])):u.init.apply(i,[{}])})},destroy:function(r){var f=typeof r,u;return f==="undefined"?u={removeCss:!1}:f==="boolean"?u={removeCss:r}:f==="object"&&(typeof r.removeCss=="undefined"&&(r.removeCss=!1),u=r),n(this).each(function(r,f){var o=n(f),e=o.data("LiveTile"),s;typeof e!="undefined"&&(o.unbind(".liveTile"),s=i.appendStyleProperties({margin:"",cursor:""},["transform","transition"],["",""]),e.timer.stop(),window.clearTimeout(e.eventTimeout),window.clearTimeout(e.flCompleteTimeout),window.clearTimeout(e.completeTimeout),e.faces.$listTiles!=null&&e.faces.$listTiles.each(function(i,r){var f=n(r),o,h;e.mode==="flip-list"?(o=f.data("metrojs.tile"),window.clearTimeout(o.eventTimeout),window.clearTimeout(o.flCompleteTimeout),window.clearTimeout(o.completeTimeout)):e.mode==="carousel"&&(h=e.listData[i],h.bounce&&t.unbindMsBounce(f,h));u.removeCss?(f.removeClass("ha"),f.find(e.tileFaceSelector).unbind(".liveTile").removeClass("bounce flip-front flip-back ha slide slide-front slide-back").css(s)):f.find(e.tileFaceSelector).unbind(".liveTile");f.removeData("metrojs.tile")}).unbind(".liveTile"),e.faces.$front!=null&&u.removeCss&&e.faces.$front.removeClass("flip-front flip-back ha slide slide-front slide-back").css(s),e.faces.$back!=null&&u.removeCss&&e.faces.$back.removeClass("flip-front flip-back ha slide slide-front slide-back").css(s),e.bounce&&t.unbindMsBounce(o,e),e.playOnHover&&t.unbindMsPlayOnHover(o,e),e.pauseOnhover&&t.unbindMsPauseOnHover(o,e),o.removeClass("ha"),o.removeData("LiveTile"),o.removeData("metrojs.tile"),e=null)})}},t={dataAtr:function(n,t,i){return typeof n.attr("data-"+t)!="undefined"?n.attr("data-"+t):i},dataMethod:function(n,t,i){return typeof n.data(t)!="undefined"?n.data(t):i},getDataOrDefault:null,initTileData:function(i,u){var s=u.ignoreDataAttributes==!1,f=null,e,v,o,a;this.getDataOrDefault==null&&(this.getDataOrDefault=r.capabilities.isOldJQuery?this.dataAtr:this.dataMethod);f=s?{speed:this.getDataOrDefault(i,"speed",u.speed),delay:this.getDataOrDefault(i,"delay",u.delay),stops:this.getDataOrDefault(i,"stops",u.stops),stack:this.getDataOrDefault(i,"stack",u.stack),mode:this.getDataOrDefault(i,"mode",u.mode),direction:this.getDataOrDefault(i,"direction",u.direction),useHardwareAccel:this.getDataOrDefault(i,"ha",u.useHardwareAccel),repeatCount:this.getDataOrDefault(i,"repeat",u.repeatCount),swap:this.getDataOrDefault(i,"swap",u.swap),appendBack:this.getDataOrDefault(i,"appendback",u.appendBack),currentIndex:this.getDataOrDefault(i,"start-index",u.currentIndex),animationDirection:this.getDataOrDefault(i,"ani-direction",u.animationDirection),startNow:this.getDataOrDefault(i,"start-now",u.startNow),tileSelector:this.getDataOrDefault(i,"tile-selector",u.tileSelector),tileFaceSelector:this.getDataOrDefault(i,"face-selector",u.tileFaceSelector),bounce:this.getDataOrDefault(i,"bounce",u.bounce),bounceDirections:this.getDataOrDefault(i,"bounce-dir",u.bounceDirections),bounceFollowsMove:this.getDataOrDefault(i,"bounce-follows",u.bounceFollowsMove),click:this.getDataOrDefault(i,"click",u.click),link:this.getDataOrDefault(i,"link",u.link),newWindow:this.getDataOrDefault(i,"new-window",u.newWindow),alwaysTrigger:this.getDataOrDefault(i,"always-trigger",u.alwaysTrigger),flipListOnHover:this.getDataOrDefault(i,"flip-onhover",u.flipListOnHover),pauseOnHover:this.getDataOrDefault(i,"pause-onhover",u.pauseOnHover),playOnHover:this.getDataOrDefault(i,"play-onhover",u.playOnHover),onHoverDelay:this.getDataOrDefault(i,"hover-delay",u.onHoverDelay),onHoverOutDelay:this.getDataOrDefault(i,"hoverout-delay",u.onHoverOutDelay),noHAflipOpacity:this.getDataOrDefault(i,"flip-opacity",u.noHAflipOpacity),useTranslate:this.getDataOrDefault(i,"use-translate",u.useTranslate),runEvents:!1,isReversed:!1,loopCount:0,contentModules:[],listData:[],height:i.height(),width:i.width(),tempValues:{}}:n.extend(!0,{runEvents:!1,isReversed:!1,loopCount:0,contentModules:[],listData:[],height:i.height(),width:i.width(),tempValues:{}},u);f.useTranslate=f.useTranslate&&f.useHardwareAccel&&r.capabilities.canTransform&&r.capabilities.canTransition;f.margin=f.direction==="vertical"?f.height/2:f.width/2;f.stops=typeof u.stops=="object"&&u.stops instanceof Array?u.stops:(""+f.stops).split(",");f.stops.length===1&&f.stops.push("0px");var h=f.swap instanceof Array?f.swap:f.swap.replace(" ","").split(","),c=s?this.getDataOrDefault(i,"swap-front",u.swapFront):u.swapFront,l=s?this.getDataOrDefault(i,"swap-back",u.swapBack):u.swapBack;for(f.swapFront=c instanceof Array?c:c==="-"?h:c.replace(" ","").split(","),f.swapBack=l instanceof Array?l:l==="-"?h:l.replace(" ","").split(","),e=0;e<f.swapFront.length;e++)f.swapFront[e].length>0&&n.inArray(f.swapFront[e],h)===-1&&h.push(f.swapFront[e]);for(e=0;e<f.swapBack.length;e++)f.swapBack[e].length>0&&n.inArray(f.swapBack[e],h)===-1&&h.push(f.swapBack[e]);for(f.swap=h,e=0;e<h.length;e++)h[e].length>0&&(v=n.fn.liveTile.contentModules.hasContentModule(h[e]),v>-1&&f.contentModules.push(n.fn.liveTile.contentModules.modules[v]));for(f.initDelay=s?this.getDataOrDefault(i,"initdelay",u.initDelay):u.initDelay,f.delay<-1?f.delay=u.triggerDelay(1):f.delay<0&&(f.delay=3500+Math.random()*4501),f.initDelay<0&&(f.initDelay=f.delay),o={},e=0;e<f.contentModules.length;e++)n.extend(o,f.contentModules[e].data);for(n.extend(o,u,f),o.mode==="flip-list"?(a=i.find(o.tileSelector).not(".tile-title"),a.each(function(i,r){var u=n(r),f={direction:s?t.getDataOrDefault(u,"direction",o.direction):o.direction,newWindow:s?t.getDataOrDefault(u,"new-window",!1):!1,link:s?t.getDataOrDefault(u,"link",""):"",faces:{$front:null,$back:null},height:u.height(),width:u.width(),isReversed:!1};f.margin=f.direction==="vertical"?f.height/2:f.width/2;o.listData.push(f)})):o.mode==="carousel"&&(o.stack=!0,a=i.find(o.tileSelector).not(".tile-title"),a.each(function(i,r){var u=n(r),f={bounce:s?t.getDataOrDefault(u,"bounce",!1):!1,bounceDirections:s?t.getDataOrDefault(u,"bounce-dir","all"):"all",link:s?t.getDataOrDefault(u,"link",""):"",newWindow:s?t.getDataOrDefault(u,"new-window",!1):!1,animationDirection:s?t.getDataOrDefault(u,"ani-direction",""):"",direction:s?t.getDataOrDefault(u,"direction",""):""};o.listData.push(f)})),e=0;e<f.contentModules.length;e++)typeof o.contentModules[e].initData=="function"&&o.contentModules[e].initData(o,i);return f=null,o},prepTile:function(u,f){var e,c,l,s,h,a,v,y;u.addClass(f.mode);e={$tileFaces:null,$listTiles:null,$front:null,$back:null};switch(f.mode){case"fade":e.$tileFaces=u.find(f.tileFaceSelector).not(".tile-title");e.$front=f.faces.$front!=null&&f.faces.$front.length>0?f.faces.$front.addClass("fade-front"):e.$tileFaces.filter(":first").addClass("fade-front");e.$back=f.faces.$back!=null&&f.faces.$back.length>0?f.faces.$back.addClass("fade-back"):e.$tileFaces.length>1?e.$tileFaces.filter(":last").addClass("fade-back"):f.appendBack?n('<div class="fade-back"><\/div>').appendTo(u):n("<div><\/div>");break;case"slide":e.$tileFaces=u.find(f.tileFaceSelector).not(".tile-title");e.$front=f.faces.$front!=null&&f.faces.$front.length>0?f.faces.$front.addClass("slide-front"):e.$tileFaces.filter(":first").addClass("slide-front");e.$back=f.faces.$back!=null&&f.faces.$back.length>0?f.faces.$back.addClass("slide-back"):e.$tileFaces.length>1?e.$tileFaces.filter(":last").addClass("slide-back"):f.appendBack?n('<div class="slide-back"><\/div>').appendTo(u):n("<div><\/div>");f.stack==!0&&(f.direction==="vertical"?(a="top",v="translate(0%, -100%) translateZ(0)"):(a="left",v="translate(-100%, 0%) translateZ(0)"),s={},f.useTranslate?i.appendStyleProperties(s,["transform"],[v]):s[a]="-100%",e.$back.css(s));u.data("metrojs.tile",{animating:!1});r.capabilities.canTransition&&f.useHardwareAccel&&(u.addClass("ha"),e.$front.addClass("ha"),e.$back.addClass("ha"));break;case"carousel":e.$listTiles=u.find(f.tileSelector).not(".tile-title");y=e.$listTiles.length;u.data("metrojs.tile",{animating:!1});f.currentIndex=Math.min(f.currentIndex,y-1);e.$listTiles.each(function(u,e){var s=n(e).addClass("slide"),o=f.listData[u],c=typeof o.animationDirection=="string"&&o.animationDirection.length>0?o.animationDirection:f.animationDirection,l=typeof o.direction=="string"&&o.direction.length>0?o.direction:f.direction;u==f.currentIndex?s.addClass("active"):c==="forward"?l==="vertical"?(h=f.useTranslate?i.appendStyleProperties({},["transform"],["translate(0%, 100%) translateZ(0)"]):{left:"0%",top:"100%"},s.css(h)):(h=f.useTranslate?i.appendStyleProperties({},["transform"],["translate(100%, 0%) translateZ(0)"]):{left:"100%",top:"0%"},s.css(h)):c==="backward"&&(l==="vertical"?(h=f.useTranslate?i.appendStyleProperties({},["transform"],["translate(0%, -100%) translateZ(0)"]):{left:"0%",top:"-100%"},s.css(h)):(h=f.useTranslate?i.appendStyleProperties({},["transform"],["translate(-100%, 0%) translateZ(0)"]):{left:"-100%",top:"0%"},s.css(h)));t.bindLink(s,o);f.useHardwareAccel&&r.capabilities.canTransition&&t.bindBounce(s,o);s=null;o=null});r.capabilities.canFlip3d&&f.useHardwareAccel&&(u.addClass("ha"),e.$listTiles.addClass("ha"));break;case"flip-list":e.$listTiles=u.find(f.tileSelector).not(".tile-title");e.$listTiles.each(function(u,e){var h=n(e).addClass("tile-"+(u+1)),y=h.find(f.tileFaceSelector).filter(":first").addClass("flip-front").css({margin:"0px"}),a,v,p,w;h.find(f.tileFaceSelector).length===1&&f.appendBack==!0&&h.append("<div><\/div>");a=h.find(f.tileFaceSelector).filter(":last").addClass("flip-back").css({margin:"0px"});f.listData[u].faces.$front=y;f.listData[u].faces.$back=a;h.data("metrojs.tile",{animating:!1,count:1,completeTimeout:null,flCompleteTimeout:null,index:u});v=h.data("metrojs.tile");r.capabilities.canFlip3d&&f.useHardwareAccel?(h.addClass("ha"),y.addClass("ha"),a.addClass("ha"),c=f.listData[u].direction==="vertical"?"rotateX(180deg)":"rotateY(180deg)",s=i.appendStyleProperties({},["transform"],[c]),a.css(s)):(l=f.listData[u].direction==="vertical"?{height:"100%",width:"100%",marginTop:"0px",opacity:"1"}:{height:"100%",width:"100%",marginLeft:"0px",opacity:"1"},s=f.listData[u].direction==="vertical"?{height:"0px",width:"100%",marginTop:f.listData[u].margin+"px",opacity:f.noHAflipOpacity}:{height:"100%",width:"0px",marginLeft:f.listData[u].margin+"px",opacity:f.noHAflipOpacity},y.css(l),a.css(s));p=function(){v.count++;v.count>=o&&(v.count=1)};f.flipListOnHover&&(w=f.flipListOnHoverEvent+".liveTile",y.bind(w,function(){t.flip(h,v.count,f,p)}),a.bind(w,function(){t.flip(h,v.count,f,p)}));f.listData[u].link.length>0&&h.css({cursor:"pointer"}).bind("click.liveTile",function(){f.listData[u].newWindow?window.open(f.listData[u].link):window.location=f.listData[u].link})});break;case"flip":e.$tileFaces=u.find(f.tileFaceSelector).not(".tile-title");e.$front=f.faces.$front!=null&&f.faces.$front.length>0?f.faces.$front.addClass("flip-front"):e.$tileFaces.filter(":first").addClass("flip-front");e.$back=f.faces.$back!=null&&f.faces.$back.length>0?f.faces.$back.addClass("flip-back"):e.$tileFaces.length>1?e.$tileFaces.filter(":last").addClass("flip-back"):f.appendBack?n('<div class="flip-back"><\/div>').appendTo(u):n("<div><\/div>");u.data("metrojs.tile",{animating:!1});r.capabilities.canFlip3d&&f.useHardwareAccel?(u.addClass("ha"),e.$front.addClass("ha"),e.$back.addClass("ha"),c=f.direction==="vertical"?"rotateX(180deg)":"rotateY(180deg)",s=i.appendStyleProperties({},["transform"],[c]),e.$back.css(s)):(l=f.direction==="vertical"?{height:"100%",width:"100%",marginTop:"0px",opacity:"1"}:{height:"100%",width:"100%",marginLeft:"0px",opacity:"1"},s=f.direction==="vertical"?{height:"0%",width:"100%",marginTop:f.margin+"px",opacity:"0"}:{height:"100%",width:"0%",marginLeft:f.margin+"px",opacity:"0"},e.$front.css(l),e.$back.css(s))}return e},bindPauseOnHover:function(t){(function(){var i=t.data("LiveTile"),f=!1,u=!1,e=i.pauseOnHoverEvent=="both"||i.pauseOnHoverEvent=="mouseover"||i.pauseOnHoverEvent=="mouseenter",o=i.pauseOnHoverEvent=="both"||i.pauseOnHoverEvent=="mouseout"||i.pauseOnHoverEvent=="mouseleave";i.pOnHoverMethods={pause:function(){i.timer.pause();i.mode==="flip-list"&&i.faces.$listTiles.each(function(t,i){window.clearTimeout(n(i).data("metrojs.tile").completeTimeout)})},over:function(){f||u||i.runEvents&&(u=!0,i.eventTimeout=window.setTimeout(function(){u=!1;o&&(f=!0);i.pOnHoverMethods.pause()},i.onHoverDelay))},out:function(){if(u){window.clearTimeout(i.eventTimeout);u=!1;return}if(e){if(!f&&!u)return;i.runEvents&&i.timer.start(i.hasRun?i.delay:i.initDelay)}else i.pOnHoverMethods.pause();f=!1}};r.capabilities.canTouch?window.navigator.msPointerEnabled?(e&&t[0].addEventListener("MSPointerOver",i.pOnHoverMethods.over,!1),o&&t[0].addEventListener("MSPointerOut",i.pOnHoverMethods.out,!1)):(e&&t.bind("touchstart.liveTile",i.pOnHoverMethods.over),o&&t.bind("touchend.liveTile",i.pOnHoverMethods.out)):(e&&t.bind("mouseover.liveTile",i.pOnHoverMethods.over),o&&t.bind("mouseout.liveTile",i.pOnHoverMethods.out))})()},unbindMsPauseOnHover:function(n,t){typeof t.pOnHoverMethods!="undefined"&&window.navigator.msPointerEnabled&&(n[0].removeEventListener("MSPointerOver",t.pOnHoverMethods.over,!1),n[0].removeEventListener("MSPointerOut",t.pOnHoverMethods.out,!1))},bindPlayOnHover:function(n,t){(function(){var f=!1,i=!1,e=t.playOnHoverEvent=="both"||t.playOnHoverEvent=="mouseover"||t.playOnHoverEvent=="mouseenter",o=t.playOnHoverEvent=="both"||t.playOnHoverEvent=="mouseout"||t.playOnHoverEvent=="mouseleave";t.onHoverMethods={over:function(){if(!f&&!i&&(!t.bounce||t.bounceMethods.down=="no")){var r=t.mode=="flip"||(t.startNow?!t.isReversed:t.isReversed);window.clearTimeout(t.eventTimeout);(t.runEvents&&r||!t.hasRun)&&(i=!0,t.eventTimeout=window.setTimeout(function(){i=!1;o&&(f=!0);u.play.apply(n[0],[0])},t.onHoverDelay))}},out:function(){if(i){window.clearTimeout(t.eventTimeout);i=!1;return}(!e||f||i)&&(window.clearTimeout(t.eventTimeout),t.eventTimeout=window.setTimeout(function(){var i=t.mode=="flip"||(t.startNow?t.isReversed:!t.isReversed);t.runEvents&&i&&u.play.apply(n[0],[0]);f=!1},t.speed+t.onHoverOutDelay))}};r.capabilities.canTouch?window.navigator.msPointerEnabled?(e&&n[0].addEventListener("MSPointerDown",t.onHoverMethods.over,!1),o&&n.bind("mouseleave.liveTile",t.onHoverMethods.out)):(e&&n.bind("touchstart.liveTile",t.onHoverMethods.over),o&&n.bind("touchend.liveTile",t.onHoverMethods.out)):(e&&n.bind("mouseenter.liveTile",t.onHoverMethods.over),o&&n.bind("mouseleave.liveTile",t.onHoverMethods.out))})()},unbindMsPlayOnHover:function(n,t){typeof t.onHoverMethods!="undefined"&&window.navigator.msPointerEnabled&&n[0].removeEventListener("MSPointerDown",t.onHoverMethods.over,!1)},bindBounce:function(t,u){u.bounce&&(t.addClass("bounce"),t.addClass("noselect"),function(){u.bounceMethods={down:"no",threshold:30,zeroPos:{x:0,y:0},eventPos:{x:0,y:0},inTilePos:{x:0,y:0},pointPos:{x:0,y:0},regions:{c:[0,0],tl:[-1,-1],tr:[1,-1],bl:[-1,1],br:[1,1],t:[null,-1],r:[1,null],b:[null,1],l:[-1,null]},targets:{all:["c","t","r","b","l","tl","tr","bl","br"],edges:["c","t","r","b","l"],corners:["c","tl","tr","bl","br"]},hitTest:function(t,i,f,e){var k=u.bounceMethods.regions,h=u.bounceMethods.targets[f],l=0,c=null,y=null,p={hit:[0,0],name:"c"},s,o;if(r.capabilities.isOldAndroid||!r.capabilities.canTransition)return p;typeof h=="undefined"&&(typeof f=="string"&&(h=f.split(",")),n.isArray(h)&&n.inArray("c")==-1&&(e=0,p=null));for(var d=t.width(),g=t.height(),a=[d*e,g*e],w=i.x-d*.5,b=i.y-g*.5,v=[w>0?Math.abs(w)<=a[0]?0:1:Math.abs(w)<=a[0]?0:-1,b>0?Math.abs(b)<=a[1]?0:1:Math.abs(b)<=a[1]?0:-1];l<h.length;l++){if(c!=null)return c;if(s=h[l],o=k[s],s=="*")return s=h[l+1],{region:k[s],name:s};v[0]==o[0]&&v[1]==o[1]?c={hit:o,name:s}:(v[0]==o[0]||o[0]==null)&&(v[1]==o[1]||o[1]==null)&&(y={hit:o,name:s})}return c!=null?c:y!=null?y:p},bounceDown:function(r){var o,s,h;if(r.target.tagName!="A"||n(r).is(".bounce")){var f=r.originalEvent&&r.originalEvent.touches?r.originalEvent.touches[0]:r,e=t.offset(),c=window.pageXOffset,l=window.pageYOffset;u.bounceMethods.pointPos={x:f.pageX,y:f.pageY};u.bounceMethods.inTilePos={x:f.pageX-e.left,y:f.pageY-e.top};u.$tileParent||(u.$tileParent=t.parent());o=u.$tileParent.offset();u.bounceMethods.eventPos={x:e.left-o.left+t.width()/2,y:e.top-o.top+t.height()/2};s=u.bounceMethods.hitTest(t,u.bounceMethods.inTilePos,u.bounceDirections,.25);s==null?u.bounceMethods.down="no":(window.navigator.msPointerEnabled?(document.addEventListener("MSPointerUp",u.bounceMethods.bounceUp,!1),t[0].addEventListener("MSPointerUp",u.bounceMethods.bounceUp,!1),document.addEventListener("MSPointerCancel",u.bounceMethods.bounceUp,!1),u.bounceFollowsMove&&t[0].addEventListener("MSPointerMove",u.bounceMethods.bounceMove,!1)):(n(document).bind("mouseup.liveTile, touchend.liveTile, touchcancel.liveTile, dragstart.liveTile",u.bounceMethods.bounceUp),u.bounceFollowsMove&&(t.bind("touchmove.liveTile",u.bounceMethods.bounceMove),t.bind("mousemove.liveTile",u.bounceMethods.bounceMove))),h="bounce-"+s.name,t.addClass(h),u.bounceMethods.down=h,u.bounceMethods.downPcss=i.appendStyleProperties({},["perspective-origin"],[u.bounceMethods.eventPos.x+"px "+u.bounceMethods.eventPos.y+"px"]),u.$tileParent.css(u.bounceMethods.downPcss))}},bounceUp:function(){u.bounceMethods.down!="no"&&(u.bounceMethods.unBounce(),window.navigator.msPointerEnabled?(document.removeEventListener("MSPointerUp",u.bounceMethods.bounceUp,!1),t[0].removeEventListener("MSPointerUp",u.bounceMethods.bounceUp,!1),document.removeEventListener("MSPointerCancel",u.bounceMethods.bounceUp,!1),u.bounceFollowsMove&&t[0].removeEventListener("MSPointerMove",u.bounceMethods.bounceMove,!1)):n(document).unbind("mouseup.liveTile, touchend.liveTile, touchcancel.liveTile, dragstart.liveTile",u.bounceMethods.bounceUp),u.bounceFollowsMove&&(t.unbind("touchmove.liveTile",u.bounceMethods.bounceMove),t.unbind("mousemove.liveTile",u.bounceMethods.bounceMove)))},bounceMove:function(n){var i;if(u.bounceMethods.down!="no"){var r=n.originalEvent&&n.originalEvent.touches?n.originalEvent.touches[0]:n,f=Math.abs(r.pageX-u.bounceMethods.pointPos.x),e=Math.abs(r.pageY-u.bounceMethods.pointPos.y);(f>u.bounceMethods.threshold||e>u.bounceMethods.threshold)&&(i=u.bounceMethods.down,u.bounceMethods.bounceDown(n),i!=u.bounceMethods.down&&t.removeClass(i))}},unBounce:function(){if(t.removeClass(u.bounceMethods.down),typeof u.bounceMethods.downPcss=="object")u.bounceMethods.downPcss=i.appendStyleProperties({},["perspective-origin","perspective-origin-x","perspective-origin-y"],["","",""]),window.setTimeout(function(){u.$tileParent.css(u.bounceMethods.downPcss)},200);u.bounceMethods.down="no";u.bounceMethods.inTilePos=u.bounceMethods.zeroPos;u.bounceMethods.eventPos=u.bounceMethods.zeroPos}};window.navigator.msPointerEnabled?t[0].addEventListener("MSPointerDown",u.bounceMethods.bounceDown,!1):r.capabilities.canTouch?t.bind("touchstart.liveTile",u.bounceMethods.bounceDown):t.bind("mousedown.liveTile",u.bounceMethods.bounceDown)}())},unbindMsBounce:function(n,t){t.bounce&&window.navigator.msPointerEnabled&&(n[0].removeEventListener("MSPointerDown",t.bounceMethods.bounceDown,!1),n[0].removeEventListener("MSPointerCancel",t.bounceMethods.bounceUp,!1),n[0].removeEventListener("MSPointerOut",t.bounceMethods.bounceUp,!1))},bindLink:function(t,i){i.link.length>0&&t.css({cursor:"pointer"}).bind("click.liveTile",function(t){(t.target.tagName!="A"||n(t).is(".live-tile,.slide,.flip"))&&(i.newWindow?window.open(i.link):window.location=i.link)})},runContenModules:function(n,t,i,r){for(var f,u=0;u<n.contentModules.length;u++)f=n.contentModules[u],typeof f.action=="function"&&f.action(n,t,i,r)},fade:function(i,r,u){var f=typeof u=="object"?u:i.data("LiveTile"),c=function(){(f.timer.repeatCount>0||f.timer.repeatCount==-1)&&f.timer.count!=f.timer.repeatCount&&f.timer.start(f.delay)},o,s,h;if(typeof f=="undefined"){e(n.fn.liveTile.defaults.rebindMessage);return}if(!f.faces.$front.is(":animated")){if(f.timer.pause(),o=f.loopCount+1,f.isReversed=o%2==0,s=f.animationStarting.call(i[0],f,f.faces.$front,f.faces.$back),typeof s!="undefined"&&s==!1){c();return}f.loopCount=o;h=function(){c();t.runContenModules(f,f.faces.$front,f.faces.$back);f.animationComplete.call(i[0],f,f.faces.$front,f.faces.$back)};f.isReversed?f.faces.$front.fadeIn(f.speed,f.noHaTransFunc,h):f.faces.$front.fadeOut(f.speed,f.noHaTransFunc,h)}},slide:function(u,f,o,s,h){var c=typeof o=="object"?o:u.data("LiveTile"),l=u.data("metrojs.tile"),tt,it,w,ut,d,g,ft,nt,st,ht;if(typeof c=="undefined"){e(n.fn.liveTile.defaults.rebindMessage);return}if(l.animating==!0||u.is(":animated")){c=null;l=null;return}if(tt=function(){(c.timer.repeatCount>0||c.timer.repeatCount==-1)&&c.timer.count!=c.timer.repeatCount&&c.timer.start(c.delay)},c.mode!=="carousel"){if(c.isReversed=c.currentIndex%2!=0,c.timer.pause(),it=c.animationStarting.call(u[0],c,c.faces.$front,c.faces.$back),typeof it!="undefined"&&it==!1){tt();return}c.loopCount=c.loopCount+1}else c.isReversed=!0;w=typeof c.tempValues.direction=="string"&&c.tempValues.direction.length>0?c.tempValues.direction:c.direction;c.tempValues.direction=null;var a={},v={},ct=typeof s=="undefined"?c.currentIndex:s,y=n.trim(c.stops[Math.min(ct,c.stops.length-1)]),et=y.indexOf("px"),p=0,b=0,lt=w==="vertical"?c.height:c.width,rt=w==="vertical"?"top":"left",k=c.stack==!0,ot=function(){typeof h=="undefined"?(c.currentIndex=c.currentIndex+1,c.currentIndex>c.stops.length-1&&(c.currentIndex=0)):h();c.mode!="carousel"&&tt();t.runContenModules(c,c.faces.$front,c.faces.$back,c.currentIndex);c.animationComplete.call(u[0],c,c.faces.$front,c.faces.$back);c=null;l=null};if(et>0?(b=parseInt(y.substring(0,et),10),p=b-lt+"px"):(b=parseInt(y.replace("%",""),10),p=b-100+"%"),r.capabilities.canTransition&&c.useHardwareAccel){if(typeof l.animating!="undefined"&&l.animating==!0)return;l.animating=!0;ut=["transition-property","transition-duration","transition-timing-function"];d=[c.useTranslate?"transform":rt,c.speed+"ms",c.haTransFunc];d[i.browserPrefix+"transition-property"]=i.browserPrefix+"transform";a=i.appendStyleProperties(a,ut,d);v=i.appendStyleProperties(v,ut,d);g=w==="vertical";ft=g?"top":"left";c.useTranslate?(nt=g?"translate(0%, "+y+")":"translate("+y+", 0%)",a=i.appendStyleProperties(a,["transform"],[nt+"translateZ(0)"]),k&&(nt=g?"translate(0%, "+p+")":"translate("+p+", 0%)",v=i.appendStyleProperties(v,["transform"],[nt+"translateZ(0)"]))):(a[ft]=y,k&&(v[ft]=p));c.faces.$front.css(a);k&&c.faces.$back.css(v);window.clearTimeout(c.completeTimeout);c.completeTimeout=window.setTimeout(function(){l.animating=!1;ot()},c.speed)}else a[rt]=y,v[rt]=p,l.animating=!0,st=c.faces.$front.stop(),ht=c.faces.$back.stop(),st.animate(a,c.speed,c.noHaTransFunc,function(){l.animating=!1;ot()}),k&&ht.animate(v,c.speed,c.noHaTransFunc,function(){})},carousel:function(u,f){var o=u.data("LiveTile"),a,b,tt,v,c,d,s,y,w;if(typeof o=="undefined"){e(n.fn.liveTile.defaults.rebindMessage);return}if(a=u.data("metrojs.tile"),a.animating==!0||o.faces.$listTiles.length<=1){a=null;return}b=function(){(o.timer.repeatCount>0||o.timer.repeatCount==-1)&&o.timer.count!=o.timer.repeatCount&&o.timer.start(o.delay)};o.timer.pause();var h=o.faces.$listTiles.filter(".active"),k=o.faces.$listTiles.index(h),g=o.currentIndex,nt=g!=k?g:k,p=nt+1>=o.faces.$listTiles.length?0:nt+1,l=o.listData[p];if(k==p){a=null;h=null;return}if(tt=typeof o.tempValues.animationDirection=="string"&&o.tempValues.animationDirection.length>0?o.tempValues.animationDirection:typeof l.animationDirection=="string"&&l.animationDirection.length>0?l.animationDirection:o.animationDirection,o.tempValues.animationDirection=null,typeof o.tempValues.direction=="string"&&o.tempValues.direction.length>0?v=o.tempValues.direction:typeof l.direction=="string"&&l.direction.length>0?(v=l.direction,o.tempValues.direction=v):v=o.direction,c=o.faces.$listTiles.eq(p),d=o.animationStarting.call(u[0],o,h,c),typeof d!="undefined"&&d==!1){b();return}o.loopCount=o.loopCount+1;s=i.appendStyleProperties({},["transition-duration"],["0s"]);y=v==="vertical";tt==="backward"?(o.useTranslate&&r.capabilities.canTransition?(w=y?"translate(0%, -100%)":"translate(-100%, 0%)",s=i.appendStyleProperties(s,["transform"],[w+" translateZ(0)"]),o.stops=["100%"]):(y?(s.top="-100%",s.left="0%"):(s.top="0%",s.left="-100%"),o.stops=["100%"]),o.faces.$front=h,o.faces.$back=c):(o.useTranslate&&r.capabilities.canTransition?(w=y?"translate(0%, 100%)":"translate(100%, 0%)",s=i.appendStyleProperties(s,["transform"],[w+" translateZ(0)"])):y?(s.top="100%",s.left="0%"):(s.top="0%",s.left="100%"),o.faces.$front=c,o.faces.$back=h,o.stops=["0%"]);c.css(s);window.setTimeout(function(){h.removeClass("active");c.addClass("active");t.slide(u,f,o,0,function(){o.currentIndex=p;a=null;h=null;c=null;b()})},150)},flip:function(u,f,o,s){var a=u.data("metrojs.tile"),h,nt,ft,tt,it;if(typeof a!="undefined"&&a.animating==!0){a=null;return}if(h=typeof o=="object"?o:u.data("LiveTile"),typeof h=="undefined"){e(n.fn.liveTile.defaults.rebindMessage);return}var c,l,w,g,rt,ut,k=typeof s=="undefined",v=0,y,d=function(){(h.timer.repeatCount>0||h.timer.repeatCount==-1)&&h.timer.count!=h.timer.repeatCount&&h.timer.start(h.delay)};if(k){if(h.timer.pause(),nt=h.loopCount+1,y=nt%2==0,h.isReversed=y,c=h.faces.$front,l=h.faces.$back,ft=y?[h,l,c]:[h,c,l],tt=h.animationStarting.apply(u[0],ft),typeof tt!="undefined"&&tt==!1){d();return}w=h.direction;height=h.height;width=h.width;margin=h.margin;h.loopCount=nt}else y=f%2==0,v=a.index,c=h.listData[v].faces.$front,l=h.listData[v].faces.$back,h.listData[v].isReversed=y,w=h.listData[v].direction,height=h.listData[v].height,width=h.listData[v].width,margin=h.listData[v].margin;if(r.capabilities.canFlip3d&&h.useHardwareAccel){g=y?"360deg":"180deg";rt=w==="vertical"?"rotateX("+g+")":"rotateY("+g+")";ut=i.appendStyleProperties({},["transform","transition"],[rt,"all "+h.speed+"ms "+h.haTransFunc+" 0s"]);var et=y?"540deg":"360deg",ht=w==="vertical"?"rotateX("+et+")":"rotateY("+et+")",ct=i.appendStyleProperties({},["transform","transition"],[ht,"all "+h.speed+"ms "+h.haTransFunc+" 0s"]);c.css(ut);l.css(ct);it=function(){a.animating=!1;var n,r;y?(n=w==="vertical"?"rotateX(0deg)":"rotateY(0deg)",r=i.appendStyleProperties({},["transform","transition"],[n,"all 0s "+h.haTransFunc+" 0s"]),c.css(r),t.runContenModules(h,c,l,v),k?(d(),h.animationComplete.call(u[0],h,c,l)):s(h,c,l),c=null,l=null,h=null,a=null):(t.runContenModules(h,l,c,v),k?(d(),h.animationComplete.call(u[0],h,l,c)):s(h,l,c))};h.mode==="flip-list"?(window.clearTimeout(h.listData[v].completeTimeout),h.listData[v].completeTimeout=window.setTimeout(it,h.speed)):(window.clearTimeout(h.completeTimeout),h.completeTimeout=window.setTimeout(it,h.speed))}else{var p=h.speed/2,ot=w==="vertical"?{height:"0px",width:"100%",marginTop:margin+"px",opacity:h.noHAflipOpacity}:{height:"100%",width:"0px",marginLeft:margin+"px",opacity:h.noHAflipOpacity},st=w==="vertical"?{height:"100%",width:"100%",marginTop:"0px",opacity:"1"}:{height:"100%",width:"100%",marginLeft:"0px",opacity:"1"},b;y?(a.animating=!0,l.stop().animate(ot,{duration:p}),b=function(){a.animating=!1;c.stop().animate(st,{duration:p,complete:function(){t.runContenModules(h,c,l,v);k?(d(),h.animationComplete.call(u[0],h,c,l)):s(h,c,l);a=null;c=null;l=null}})},h.mode==="flip-list"?(window.clearTimeout(h.listData[a.index].completeTimeout),h.listData[a.index].completeTimeout=window.setTimeout(b,p)):(window.clearTimeout(h.completeTimeout),h.completeTimeout=window.setTimeout(b,p))):(a.animating=!0,c.stop().animate(ot,{duration:p}),b=function(){a.animating=!1;l.stop().animate(st,{duration:p,complete:function(){t.runContenModules(h,l,c,v);k?(d(),h.animationComplete.call(u[0],h,l,c)):s(h,l,c);c=null;l=null;h=null;a=null}})},h.mode==="flip-list"?(window.clearTimeout(h.listData[a.index].completeTimeout),h.listData[a.index].completeTimeout=window.setTimeout(b,p)):(window.clearTimeout(h.completeTimeout),h.completeTimeout=window.setTimeout(b,p)))}},flipList:function(i){var r=i.data("LiveTile"),u=r.speed,s=!1,h=function(){(r.timer.repeatCount>0||r.timer.repeatCount==-1)&&r.timer.count!=r.timer.repeatCount&&r.timer.start(r.delay)},f;if(typeof r=="undefined"){e(n.fn.liveTile.defaults.rebindMessage);return}if(r.timer.pause(),f=r.animationStarting.call(i[0],r,null,null),typeof f!="undefined"&&f==!1){h();return}r.loopCount=r.loopCount+1;r.faces.$listTiles.each(function(i,f){var h=n(f),e=h.data("metrojs.tile"),a=r.triggerDelay(i),l=r.speed+Math.max(a,0),c=r.alwaysTrigger;c||(c=Math.random()*351>150?!0:!1);c&&(s=!0,u=Math.max(l+r.speed,u),window.clearTimeout(e.flCompleteTimeout),e.flCompleteTimeout=window.setTimeout(function(){t.flip(h,e.count,r,function(){e.count++;e.count>=o&&(e.count=1);h=null;e=null})},l))});s&&(window.clearTimeout(r.flCompleteTimeout),r.flCompleteTimeout=window.setTimeout(function(){t.runContenModules(r,null,null,-1);r.animationComplete.call(i[0],r,null,null);h()},u+r.speed))}},i={stylePrefixes:"Webkit Moz O ms Khtml ".split(" "),domPrefixes:"-webkit- -moz- -o- -ms- -khtml- ".split(" "),browserPrefix:null,appendStyleProperties:function(t,i,r){for(var u=0;u<=i.length-1;u++)t[n.trim(this.browserPrefix+i[u])]=r[u],t[n.trim(i[u])]=r[u];return t},applyStyleValue:function(t,i,r){return t[n.trim(this.browserPrefix+i)]=r,t[i]=r,t},getBrowserPrefix:function(){var t,n;if(this.browserPrefix==null){for(t="",n=0;n<=this.domPrefixes.length-1;n++)typeof document.body.style[this.domPrefixes[n]+"transform"]!="undefined"&&(t=this.domPrefixes[n]);return this.browserPrefix=t}return this.browserPrefix},shuffleArray:function(n){for(var t=[];n.length;)t.push(n.splice(Math.random()*n.length,1));while(t.length)n.push(t.pop());return n}},s={moduleName:"custom",customSwap:{data:{customDoSwapFront:function(){return!1},customDoSwapBack:function(){return!1},customGetContent:function(){return null}},initData:function(t){var i={};i.doSwapFront=n.inArray("custom",t.swapFront)>-1&&t.customDoSwapFront();i.doSwapBack=n.inArray("custom",t.swapBack)>-1&&t.customDoSwapBack();t.customSwap=typeof t.customSwap!="undefined"?n.extend(i,t.customSwap):i},action:function(){}},htmlSwap:{moduleName:"html",data:{frontContent:[],frontIsRandom:!0,frontIsInGrid:!1,backContent:[],backIsRandom:!0,backIsInGrid:!1},initData:function(i,r){var u={backBag:[],backIndex:0,backStaticIndex:0,backStaticRndm:-1,prevBackIndex:-1,frontBag:[],frontIndex:0,frontStaticIndex:0,frontStaticRndm:-1,prevFrontIndex:-1};i.ignoreDataAttributes?(u.frontIsRandom=i.frontIsRandom,u.frontIsInGrid=i.frontIsInGrid,u.backIsRandom=i.backIsRandom,u.backIsInGrid=i.backIsInGrid):(u.frontIsRandom=t.getDataOrDefault(r,"front-israndom",i.frontIsRandom),u.frontIsInGrid=t.getDataOrDefault(r,"front-isingrid",i.frontIsInGrid),u.backIsRandom=t.getDataOrDefault(r,"back-israndom",i.backIsRandom),u.backIsInGrid=t.getDataOrDefault(r,"back-isingrid",i.backIsInGrid));u.doSwapFront=n.inArray("html",i.swapFront)>-1&&i.frontContent instanceof Array&&i.frontContent.length>0;u.doSwapBack=n.inArray("html",i.swapBack)>-1&&i.backContent instanceof Array&&i.backContent.length>0;i.htmlSwap=typeof i.htmlSwap!="undefined"?n.extend(u,i.htmlSwap):u;i.htmlSwap.doSwapFront&&(i.htmlSwap.frontBag=this.prepBag(i.htmlSwap.frontBag,i.frontContent,i.htmlSwap.prevFrontIndex),i.htmlSwap.frontStaticRndm=i.htmlSwap.frontBag.pop());i.htmlSwap.doSwapBack&&(i.htmlSwap.backBag=this.prepBag(i.htmlSwap.backBag,i.backContent,i.htmlSwap.prevBackIndex),i.htmlSwap.backStaticRndm=i.htmlSwap.backBag.pop())},prepBag:function(n,t,r){var f,u;for(n=n||[],f=0,u=0;u<t.length;u++)(u!=r||n.length===1)&&(n[f]=u,f++);return i.shuffleArray(n)},getFrontSwapIndex:function(n){var t=0;return n.htmlSwap.frontIsRandom?(n.htmlSwap.frontBag.length===0&&(n.htmlSwap.frontBag=this.prepBag(n.htmlSwap.frontBag,n.frontContent,n.htmlSwap.prevFrontIndex)),t=n.htmlSwap.frontIsInGrid?n.htmlSwap.frontStaticRndm:n.htmlSwap.frontBag.pop()):t=n.htmlSwap.frontIsInGrid?n.htmlSwap.frontStaticIndex:n.htmlSwap.frontIndex,t},getBackSwapIndex:function(n){var t=0;return n.htmlSwap.backIsRandom?(n.htmlSwap.backBag.length===0&&(n.htmlSwap.backBag=this.prepBag(n.htmlSwap.backBag,n.backContent,n.htmlSwap.prevBackIndex)),t=n.htmlSwap.backIsInGrid?n.htmlSwap.backStaticRndm:n.htmlSwap.backBag.pop()):t=n.htmlSwap.backIsInGrid?n.htmlSwap.backStaticIndex:n.htmlSwap.backIndex,t},action:function(n,t,i,r){if(n.htmlSwap.doSwapFront||n.htmlSwap.doSwapBack){var f=n.mode==="flip-list",u=0,e=f?n.listData[Math.max(r,0)].isReversed:n.isReversed;if(f&&r==-1){e?n.htmlSwap.doSwapBack&&(n.htmlSwap.backBag.length===0&&(n.htmlSwap.backBag=this.prepBag(n.htmlSwap.backBag,n.backContent,n.htmlSwap.backStaticRndm)),n.htmlSwap.backStaticRndm=n.htmlSwap.backBag.pop(),n.htmlSwap.backStaticIndex++,n.htmlSwap.backStaticIndex>=n.backContent.length&&(n.htmlSwap.backStaticIndex=0)):n.htmlSwap.doSwapFront&&(n.htmlSwap.frontBag.length===0&&(n.htmlSwap.frontBag=this.prepBag(n.htmlSwap.frontBag,n.frontContent,n.htmlSwap.frontStaticRndm)),n.htmlSwap.frontStaticRndm=n.htmlSwap.frontBag.pop(),n.htmlSwap.frontStaticIndex++,n.htmlSwap.frontStaticIndex>=n.frontContent.length&&(n.htmlSwap.frontStaticIndex=0));return}if(e){if(!n.htmlSwap.doSwapBack)return;u=this.getBackSwapIndex(n);n.htmlSwap.prevBackIndex=u;i.html(n.backContent[n.htmlSwap.backIndex]);n.htmlSwap.backIndex++;n.htmlSwap.backIndex>=n.backContent.length&&(n.htmlSwap.backIndex=0);f||(n.htmlSwap.backStaticIndex++,n.htmlSwap.backStaticIndex>=n.backContent.length&&(n.htmlSwap.backStaticIndex=0))}else{if(!n.htmlSwap.doSwapFront)return;u=this.getFrontSwapIndex(n);n.htmlSwap.prevFrontIndex=u;n.mode==="slide"?n.startNow?i.html(n.frontContent[u]):t.html(n.frontContent[u]):i.html(n.frontContent[u]);n.htmlSwap.frontIndex++;n.htmlSwap.frontIndex>=n.frontContent.length&&(n.htmlSwap.frontIndex=0);f||(n.htmlSwap.frontStaticIndex++,n.htmlSwap.frontStaticIndex>=n.frontContent.length&&(n.htmlSwap.frontStaticIndex=0))}}}},imageSwap:{moduleName:"image",data:{preloadImages:!1,imageCssSelector:">img,>a>img",fadeSwap:!1,frontImages:[],frontIsRandom:!0,frontIsBackgroundImage:!1,frontIsInGrid:!1,backImages:null,backIsRandom:!0,backIsBackgroundImage:!1,backIsInGrid:!1},initData:function(i,r){var u={backBag:[],backIndex:0,backStaticIndex:0,backStaticRndm:-1,frontBag:[],frontIndex:0,frontStaticIndex:0,frontStaticRndm:-1,prevBackIndex:-1,prevFrontIndex:-1},f=i.ignoreDataAttributes;f?(u.imageCssSelector=t.getDataOrDefault(r,"image-css",i.imageCssSelector),u.fadeSwap=t.getDataOrDefault(r,"fadeswap",i.fadeSwap),u.frontIsRandom=t.getDataOrDefault(r,"front-israndom",i.frontIsRandom),u.frontIsInGrid=t.getDataOrDefault(r,"front-isingrid",i.frontIsInGrid),u.frontIsBackgroundImage=t.getDataOrDefault(r,"front-isbg",i.frontIsBackgroundImage),u.backIsRandom=t.getDataOrDefault(r,"back-israndom",i.backIsRandom),u.backIsInGrid=t.getDataOrDefault(r,"back-isingrid",i.backIsInGrid),u.backIsBackgroundImage=t.getDataOrDefault(r,"back-isbg",i.backIsBackgroundImage),u.doSwapFront=n.inArray("image",i.swapFront)>-1&&i.frontImages instanceof Array&&i.frontImages.length>0,u.doSwapBack=n.inArray("image",i.swapBack)>-1&&i.backImages instanceof Array&&i.backImages.length>0,u.alwaysSwapFront=t.getDataOrDefault(r,"front-alwaysswap",i.alwaysSwapFront),u.alwaysSwapBack=t.getDataOrDefault(r,"back-alwaysswap",i.alwaysSwapBack)):(u.imageCssSelector=i.imageCssSelector,u.fadeSwap=i.fadeSwap,u.frontIsRandom=i.frontIsRandom,u.frontIsInGrid=i.frontIsInGrid,u.frontIsBackgroundImage=i.frontIsBackgroundImage,u.backIsRandom=i.backIsRandom,u.backIsInGrid=i.backIsInGrid,u.backIsBackgroundImage=i.backIsBackgroundImage,u.doSwapFront=n.inArray("image",i.swapFront)>-1&&i.frontImages instanceof Array&&i.frontImages.length>0,u.doSwapBack=n.inArray("image",i.swapBack)>-1&&i.backImages instanceof Array&&i.backImages.length>0,u.alwaysSwapFront=i.alwaysSwapFront,u.alwaysSwapBack=i.alwaysSwapBack);i.imgSwap=typeof i.imgSwap!="undefined"?n.extend(u,i.imgSwap):u;i.imgSwap.doSwapFront&&(i.imgSwap.frontBag=this.prepBag(i.imgSwap.frontBag,i.frontImages,i.imgSwap.prevFrontIndex),i.imgSwap.frontStaticRndm=i.imgSwap.frontBag.pop(),i.preloadImages&&n(i.frontImages).metrojs.preloadImages(function(){}));i.imgSwap.doSwapBack&&(i.imgSwap.backBag=this.prepBag(i.imgSwap.backBag,i.backImages,i.imgSwap.prevBackIndex),i.imgSwap.backStaticRndm=i.imgSwap.backBag.pop(),i.preloadImages&&n(i.backImages).metrojs.preloadImages(function(){}))},prepBag:function(n,t,r){var f,u;for(n=n||[],f=0,u=0;u<t.length;u++)(u!=r||t.length===1)&&(n[f]=u,f++);return i.shuffleArray(n)},getFrontSwapIndex:function(n){var t=0;return n.imgSwap.frontIsRandom?(n.imgSwap.frontBag.length===0&&(n.imgSwap.frontBag=this.prepBag(n.imgSwap.frontBag,n.frontImages,n.imgSwap.prevFrontIndex)),t=n.imgSwap.frontIsInGrid?n.imgSwap.frontStaticRndm:n.imgSwap.frontBag.pop()):t=n.imgSwap.frontIsInGrid?n.imgSwap.frontStaticIndex:n.imgSwap.frontIndex,t},getBackSwapIndex:function(n){var t=0;return n.imgSwap.backIsRandom?(n.imgSwap.backBag.length===0&&(n.imgSwap.backBag=this.prepBag(n.imgSwap.backBag,n.backImages,n.imgSwap.prevBackIndex)),t=n.imgSwap.backIsInGrid?n.imgSwap.backStaticRndm:n.imgSwap.backBag.pop()):t=n.imgSwap.backIsInGrid?n.imgSwap.backStaticIndex:n.imgSwap.backIndex,t},setImageProperties:function(t,i,r){var f={},u={};typeof i.src!="undefined"&&(r?f.backgroundImage="url('"+i.src+"')":u.src=i.src);typeof i.alt!="undefined"&&(u.alt=i.alt);typeof i.css=="object"?t.css(n.extend(f,i.css)):t.css(f);typeof i.attr=="object"?t.attr(n.extend(u,i.attr)):t.attr(u)},action:function(n,t,i,r){var c,f,l,e;if(n.imgSwap.doSwapFront||n.imgSwap.doSwapBack){var o=n.mode==="flip-list",a=n.mode=="slide",u=0,h=o?n.listData[Math.max(r,0)].isReversed:n.isReversed;if(o&&r==-1){(n.alwaysSwapFront||!h)&&n.imgSwap.doSwapFront&&(n.imgSwap.frontBag.length===0&&(n.imgSwap.frontBag=this.prepBag(n.imgSwap.frontBag,n.frontImages,n.imgSwap.frontStaticRndm)),n.imgSwap.frontStaticRndm=n.imgSwap.frontBag.pop(),n.imgSwap.frontStaticIndex++,n.imgSwap.frontStaticIndex>=n.frontImages.length&&(n.imgSwap.frontStaticIndex=0));(n.alwaysSwapBack||h)&&n.imgSwap.doSwapBack&&(n.imgSwap.backBag.length===0&&(n.imgSwap.backBag=this.prepBag(n.imgSwap.backBag,n.backImages,n.imgSwap.backStaticRndm)),n.imgSwap.backStaticRndm=n.imgSwap.backBag.pop(),n.imgSwap.backStaticIndex++,n.imgSwap.backStaticIndex>=n.backImages.length&&(n.imgSwap.backStaticIndex=0));return}if(n.alwaysSwapFront||!h){if(!n.imgSwap.doSwapFront)return;u=this.getFrontSwapIndex(n);n.imgSwap.prevFrontIndex=u;c=n.mode==="slide"?t:i;f=c.find(n.imgSwap.imageCssSelector);l=typeof n.frontImages[u]=="object"?n.frontImages[u]:{src:n.frontImages[u]};e=function(t){var i=n.imgSwap.frontIsBackgroundImage;typeof t=="function"&&(i?window.setTimeout(t,100):f[0].onload=t);s.imageSwap.setImageProperties(f,l,i)};n.fadeSwap?f.fadeOut(function(){e(function(){f.fadeIn()})}):e();n.imgSwap.frontIndex++;n.imgSwap.frontIndex>=n.frontImages.length&&(n.imgSwap.frontIndex=0);o||(n.imgSwap.frontStaticIndex++,n.imgSwap.frontStaticIndex>=n.frontImages.length&&(n.imgSwap.frontStaticIndex=0))}if(n.alwaysSwapBack||h){if(!n.imgSwap.doSwapBack)return;u=this.getBackSwapIndex(n);n.imgSwap.prevBackIndex=u;c=i;f=c.find(n.imgSwap.imageCssSelector);l=typeof n.backImages[u]=="object"?n.backImages[u]:{src:n.backImages[u]};e=function(){s.imageSwap.setImageProperties(f,l,n.imgSwap.backIsBackgroundImage)};n.fadeSwap?f.fadeOut(function(){e(function(){f.fadeIn()})}):e();n.imgSwap.backIndex++;n.imgSwap.backIndex>=n.backImages.length&&(n.imgSwap.backIndex=0);o||(n.imgSwap.backStaticIndex++,n.imgSwap.backStaticIndex>=n.backImages.length&&(n.imgSwap.backStaticIndex=0))}}}}};n.fn.metrojs.TileTimer=function(n,t,i){this.timerId=null;this.interval=n;this.action=t;this.count=0;this.repeatCount=typeof i=="undefined"?0:i;this.start=function(t){window.clearTimeout(this.timerId);var i=this;this.timerId=window.setTimeout(function(){i.tick.call(i,n)},t)};this.tick=function(n){this.action(this.count+1);this.count++;this.count>=o&&(this.count=0);(this.repeatCount>0||this.repeatCount==-1)&&(this.count!=this.repeatCount?this.start(n):this.stop())};this.stop=function(){this.timerId=window.clearTimeout(this.timerId);this.reset()};this.resume=function(){(this.repeatCount>0||this.repeatCount==-1)&&this.count!=this.repeatCount&&this.start(n)};this.pause=function(){this.timerId=window.clearTimeout(this.timerId)};this.reset=function(){this.count=0};this.restart=function(n){this.stop();this.start(n)}};jQuery.fn.metrojs.theme={loadDefaultTheme:function(n){var t,i,r;typeof n=="undefined"||n==null?n=jQuery.fn.metrojs.theme.defaults:(t=jQuery.fn.metrojs.theme.defaults,jQuery.extend(t,n),n=t);i=typeof localStorage!="undefined";r=function(n){return typeof window.localStorage[n]!="undefined"&&window.localStorage[n]!=null};!i||r("Metro.JS.AccentColor")&&r("Metro.JS.BaseAccentColor")?i?(n.accentColor=window.localStorage["Metro.JS.AccentColor"],n.baseTheme=window.localStorage["Metro.JS.BaseAccentColor"],jQuery(n.accentCssSelector).addClass(n.accentColor).data("accent",n.accentColor),jQuery(n.baseThemeCssSelector).addClass(n.baseTheme),typeof n.loaded=="function"&&n.loaded(n.baseTheme,n.accentColor)):(jQuery(n.accentCssSelector).addClass(n.accentColor).data("accent",n.accentColor),jQuery(n.baseThemeCssSelector).addClass(n.baseTheme),typeof n.loaded=="function"&&n.loaded(n.baseTheme,n.accentColor),typeof n.preloadAltBaseTheme!="undefined"&&n.preloadAltBaseTheme&&jQuery([n.baseTheme=="dark"?n.metroLightUrl:n.metroDarkUrl]).metrojs.preloadImages(function(){})):(window.localStorage["Metro.JS.AccentColor"]=n.accentColor,window.localStorage["Metro.JS.BaseAccentColor"]=n.baseTheme,jQuery(n.accentCssSelector).addClass(n.accentColor).data("accent",n.accentColor),jQuery(n.baseThemeCssSelector).addClass(n.baseTheme),typeof n.loaded=="function"&&n.loaded(n.baseTheme,n.accentColor),typeof n.preloadAltBaseTheme!="undefined"&&n.preloadAltBaseTheme&&jQuery([n.baseTheme=="dark"?n.metroLightUrl:n.metroDarkUrl]).metrojs.preloadImages(function(){}))},applyTheme:function(n,t,i){var e,r,u,f;typeof i=="undefined"||i==null?i=jQuery.fn.metrojs.theme.defaults:(e=jQuery.fn.metrojs.theme.defaults,i=jQuery.extend({},e,i));typeof n!="undefined"&&n!=null&&(typeof localStorage!="undefined"&&(window.localStorage["Metro.JS.BaseAccentColor"]=n),r=jQuery(i.baseThemeCssSelector),r.length>0&&(n=="dark"?r.addClass("dark").removeClass("light"):n=="light"&&r.addClass("light").removeClass("dark")));typeof t!="undefined"&&t!=null&&(typeof localStorage!="undefined"&&(window.localStorage["Metro.JS.AccentColor"]=t),u=jQuery(i.accentCssSelector),u.length>0&&(f=!1,u.each(function(){var i,n;jQuery(this).addClass(t);i=jQuery(this).data("accent");i!=t&&(n=jQuery(this).attr("class").replace(i,""),n=n.replace(/(\s)+/," "),jQuery(this).attr("class",n),jQuery(this).data("accent",t),f=!0)}),f&&typeof i.accentPicked=="function"&&i.accentPicked(t)))},appendAccentColors:function(t){var r,i;typeof t=="undefined"||t==null?t=jQuery.fn.metrojs.theme.defaults:(r=jQuery.fn.metrojs.theme.defaults,t=jQuery.extend({},r,t));var u="",f=t.accentColors,e=t.accentListTemplate;for(i=0;i<f.length;i++)u+=e.replace(/\{0\}/g,f[i]);n(u).appendTo(t.accentListContainer)},appendBaseThemes:function(t){var r,i;typeof t=="undefined"||t==null?t=jQuery.fn.metrojs.theme.defaults:(r=jQuery.fn.metrojs.theme.defaults,t=jQuery.extend({},r,t));var u="",f=t.baseThemes,e=t.baseThemeListTemplate;for(i=0;i<f.length;i++)u+=e.replace(/\{0\}/g,f[i]);n(u).appendTo(t.baseThemeListContainer)},defaults:{baseThemeCssSelector:"body",accentCssSelector:".tiles",accentColor:"blue",baseTheme:"dark",accentColors:["amber","blue","brown","cobalt","crimson","cyan","magenta","lime","indigo","green","emerald","mango","mauve","olive","orange","pink","red","sienna","steel","teal","violet","yellow"],baseThemes:["light","dark"],accentListTemplate:"<li><a href='javascript:;' title='{0}' class='accent {0}'><\/a><\/li>",accentListContainer:"ul.theme-options,.theme-options>ul",baseThemeListTemplate:"<li><a href='javascript:;' title='{0}' class='accent {0}'><\/a><\/li>",baseThemeListContainer:"ul.base-theme-options,.base-theme-options>ul"}};n.fn.metrojs.preloadImages=function(t){var i=n(this).toArray(),r=n("<img style='display:none;' />").appendTo("body");n(this).each(function(){var n=this;typeof this=="object"&&(n=this.src);r.attr({src:n}).load(function(){for(var n=0;n<i.length;n++)i[n]==element&&i.splice(n,1);i.length==0&&t()})});r.remove()};n.fn.metrojs.MetroModernizr=function(t){if(typeof t=="undefined"&&(t={useHardwareAccel:!0,useModernizr:typeof Modernizr!="undefined"}),this.isOldJQuery=/^1\.[0123]/.test(n.fn.jquery),this.isOldAndroid=function(){var t,i;try{if(t=navigator.userAgent,t.indexOf("Android")>=0&&(i=parseFloat(t.slice(t.indexOf("Android")+8)),i<2.3))return!0}catch(r){n.error(r)}return!1}(),this.canTransform=!1,this.canTransition=!1,this.canTransform3d=!1,this.canAnimate=!1,this.canTouch=!1,this.canFlip3d=t.useHardwareAccel,t.useHardwareAccel==!0)if(t.useModernizr==!1)if(typeof MetroModernizr!="undefined")this.canTransform=window.MetroModernizr.canTransform,this.canTransition=window.MetroModernizr.canTransition,this.canTransform3d=window.MetroModernizr.canTransform3d,this.canAnimate=window.MetroModernizr.canAnimate,this.canTouch=window.MetroModernizr.canTouch;else{window.MetroModernizr={};var i="metromodernizr",r=document.documentElement,e=document.head||document.getElementsByTagName("head")[0],u=document.createElement(i),o=u.style,s=" -webkit- -moz- -o- -ms- ".split(" "),l="Webkit Moz O ms Khtml".split(" "),f=function(n,t){for(var i in n)if(o[n[i]]!==undefined&&(!t||t(n[i],u)))return!0},h=function(n,t){var i=n.charAt(0).toUpperCase()+n.substr(1),r=(n+" "+l.join(i+" ")+i).split(" ");return!!f(r,t)},a=function(){var n=!!f(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);return n&&"webkitPerspective"in r.style&&(n=c(["@media (",s.join("transform-3d),("),i,")","{#metromodernizr{left:9px;position:absolute;height:3px;}}"].join(""),function(n){return n.offsetHeight===3&&n.offsetLeft===9})),n},c=function(n,t){var f=document.createElement("style"),u=document.createElement("div"),o;return f.textContent=n,e.appendChild(f),u.id=i,r.appendChild(u),o=t(u),f.parentNode.removeChild(f),u.parentNode.removeChild(u),!!o},v=function(){return canTouch="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch||typeof window.navigator.msMaxTouchPoints!="undefined"&&window.navigator.msMaxTouchPoints>0||c(["@media (",s.join("touch-enabled),("),i,")","{#metromodernizr{top:9px;position:absolute}}"].join(""),function(n){return n.offsetTop===9})};this.canTransform=!!f(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"]);this.canTransition=h("transitionProperty");this.canTransform3d=a();this.canAnimate=h("animationName");this.canTouch=v();window.MetroModernizr.canTransform=this.canTransform;window.MetroModernizr.canTransition=this.canTransition;window.MetroModernizr.canTransform3d=this.canTransform3d;window.MetroModernizr.canAnimate=this.canAnimate;window.MetroModernizr.canTouch=this.canTouch;r=null;e=null;u=null;o=null}else this.canTransform=n("html").hasClass("csstransforms"),this.canTransition=n("html").hasClass("csstransitions"),this.canTransform3d=n("html").hasClass("csstransforms3d"),this.canAnimate=n("html").hasClass("cssanimations"),this.canTouch=n("html").hasClass("touch")||typeof window.navigator.msMaxTouchPoints!="undefined"&&window.navigator.msMaxTouchPoints>0;this.canFlip3d=this.canFlip3d&&this.canAnimate&&this.canTransform&&this.canTransform3d}})(jQuery);
var markerArray = [];
var infowindow = new google.maps.InfoWindow({
	content: "holding...",
	maxWidth: 340
	});	
var iowaCity = new google.maps.LatLng(41.661736, -91.540017);
var	countVenue = 0;
var venueFromMe = {};
var venueCount = jQuery("#venuesWithEvents section").length;


function makeMarker(options){
   var pushPin = new google.maps.Marker({map:map});
   pushPin.setOptions(options);
   google.maps.event.addListener(pushPin, 'click', function(){
     infoWindow.setOptions(options);
     infoWindow.open(map, pushPin);
   });
   markerArray.push(pushPin);
   return pushPin;
}

function pinAndDist(initLocal, venueLatLng, venue) {
	var venueDistance = google.maps.geometry.spherical.computeDistanceBetween(initLocal, venueLatLng);	
	var venueID = venue.id;
	var venueName = jQuery('#' + venueID).data("title");
	var venueLink = jQuery('#' + venueID).data("link");
		venueFromMe[venueID] = venueDistance;		
	var marker = new google.maps.Marker({
			position: venueLatLng,
			map: map
		});				    
	var eventsHere = [];
	var eventsHereString = '';
	var eventBubbleString = '';
	
	eventsHere.push("<a class='button tag' href='" + venueLink + "'>" + venueName + "</a>");
	
	jQuery(venue).children('div').each(function(index, Element) {
		var eventTitle = jQuery(this).data('title');
		var eventImage = jQuery(this).data('image');
		var eventCancel = jQuery(this).data('cancel');
		var eventLink = jQuery(this).data('link');
		var eventCost = jQuery(this).data('cost');
		var startDate = jQuery(this).data('startdate');
		var startTime = jQuery(this).data('starttime');	

		var eventStringSeg = 
		"<div> <h3> <a href='" + eventLink + "'>" + eventTitle + "</a> </h3> <ul class='infobox-list'>" + 
			"<li>" + startDate + ", " + startTime + ((eventCost  !== "") ? ", Cost: " + eventCost : "") + "</li>" 
			+ "</ul></div>";
				
		eventsHere.push(eventStringSeg);
	});
	
	eventsHereString = eventsHere.join(' ');
	eventBubbleString = 
		"<div class='event_bubble'>" +
		eventsHereString +
		"</div>";

    google.maps.event.addListener(marker, 'click', function () {
  		infowindow.setContent(eventBubbleString);
  		infowindow.open(map, this);	
  		//infowindow.maxWidth(200);
	});
	
	if(countVenue == venueCount) {
		var nearestVenues = [];
		for (var venueID in venueFromMe) {
			nearestVenues.push([venueID, venueFromMe[venueID]])
		}	
		nearestVenues.sort(function(a,b) {return a[1] - b[1]})
		for (var v=0; v < nearestVenues.length; v++) {
			//console.log('sorting...');
			var vid = nearestVenues[v];
			jQuery("#venuesWithEvents").append( jQuery("#" + vid) );
		}
	}		
}

function venueGen(initLocal, callback) {			
	jQuery('.venue').each(function(index, element) {
		var title = jQuery(this).data("title");
		var lat = jQuery(this).data("lat");
		var lng = jQuery(this).data("lng");
		var address = jQuery(this).data("address");
		var venueLatLng;
		var venueDistance;
		var venue = this;
		
		if(lat && lng) {
			countVenue = ++countVenue;
			venueLatLng = new google.maps.LatLng(lat, lng);
			callback(initLocal, venueLatLng, venue);
		} else {
			geocoder.geocode( { 'address': address}, function(results, status) {
				countVenue = ++countVenue;
				if (status == google.maps.GeocoderStatus.OK) {
					venueLatLng = results[0].geometry.location;
					callback(initLocal, venueLatLng, venue);
				}				
			});
		}			
	});	
}

function getInitLocal(callback) {
	var initialLocation;
	//DON'T CHANGE IDs in NearMePage.ss
	if(navigator.geolocation) {
		//console.log("Browser DOES support Geolocation");
	    var browserSupportFlag = true;
	    navigator.geolocation.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			//initialLocation = new google.maps.LatLng(41.664468, -91.535157)
			var distanceFromInitialLocation = google.maps.geometry.spherical.computeDistanceBetween(initialLocation,iowaCity);	
			// If the current position is too far away from Iowa City, just default to centering around Iowa City	
			if (distanceFromInitialLocation < 32186.9) {
				map.setCenter(initialLocation);
				var image = 'themes/afterclass2/images/position-indicator.png';
				var initalMarker = new google.maps.Marker({
					position: initialLocation,
					map: map,
					icon: image
				});  
				initalMarker.setMap(map);
				//$('#mapStart').prepend("Your location is indicated on the map with this icon: ");
				//$('#mapStart').append("<img src='themes/afterclass2/images/position-indicator.png' />");
				//$('#mapMark').prepend("To see nearby, upcoming events, touch a marker: ");
				//$('#mapMark').append("<img src='themes/afterclass2/images/marker.png' />");
			} else {
				$('#mapLoaded').text("You're too far away from Iowa City. Here are events in Iowa City");
			}
			callback(initialLocation, pinAndDist);								  
	    }, function() {
	      handleNoGeolocation(browserSupportFlag);
	    });	     
	} else {
		// Browser does not support Geolocation
		//console.log("Browser doesn't support Geolocation");
	    browserSupportFlag = false;
	    var initialLocation = handleNoGeolocation(browserSupportFlag);
	}	
}

function genMap() {
	// map generation
	// Create an array of styles.
	
	var geocoder = new google.maps.Geocoder();	
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
    var mapcanvas = document.createElement('div');	
		mapcanvas.id = 'mapcanvas';
		mapcanvas.class = 'map-canvas';
		mapcanvas.style.width = '100%';	
	jQuery('.NearMePage .map-container').append(mapcanvas);
	var nearMeMapOptions = {
	    zoom: 15,
	    center: iowaCity,
	    panControl: false,
	    mapTypeControl: false,
	    //navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
	    disableDefaultUI: false,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    streetViewControl: false,
	    zoomControlOptions: {
    		position: google.maps.ControlPosition.LEFT_BOTTOM
  		}
	};
	map = new google.maps.Map(document.getElementById("mapcanvas"), nearMeMapOptions);
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
	getInitLocal(venueGen);
	
}

function handleNoGeolocation(errorFlag) {   	
	initialLocation = iowaCity;
    map.setCenter(initialLocation);
    $('#status').text("Your location couldn't be detected. Showing events in Iowa City.");
    return initialLocation;
}  

function error(msg) {
  var s = document.querySelector('#status');
  s.innerHTML = typeof msg == 'string' ? msg : "failed";
  s.className = 'fail';
}

$(document).ready(function() {
	if( $('.NearMePage .map-container').length ){
		genMap();
	}
});

/*
function niceFade() {
	$(this).css('background-image', 'none');
};

$(".tile-bg-image").click( function() {
	$(this).flip({
		bgColor: '#ffffff',
		direction: 'rl',
		speed: 250,
		content: 'testing new content',
		color: '#fff',
		//fontSize: 20,
		onAnimation: niceFade()

	});
});

*/

var $tiles = $(".live-tile").liveTile({ 
    playOnHover:true,
    repeatCount: 0,
    delay: 0,
    startNow:false 
});

