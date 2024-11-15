/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 907:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(755);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./node_modules/inputmask/dist/inputmask.js
var inputmask = __webpack_require__(382);
// EXTERNAL MODULE: ./node_modules/swiper/swiper.mjs + 1 modules
var swiper_swiper = __webpack_require__(652);
// EXTERNAL MODULE: ./node_modules/swiper/modules/index.mjs + 26 modules
var modules = __webpack_require__(11);
;// CONCATENATED MODULE: ./src/js/utils/constants.js
const rem = function (rem) {
  if (window.innerWidth > 768) {
    return 0.005208335 * window.innerWidth * rem;
  } else {
    // где 375 это ширина мобильной версии макета
    return 100 / 375 * (0.05 * window.innerWidth) * rem;
  }
};
let bodyLockStatus = true;
let bodyUnlock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  let body = document.querySelector('body');
  if (bodyLockStatus) {
    setTimeout(() => {
      body.style.paddingRight = '0px';
      // document.querySelector('header').style.paddingRight = '0px';
      document.documentElement.classList.remove('lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
let bodyLock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  let body = document.querySelector('body');
  if (bodyLockStatus) {
    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
    let scrollWith = getScrollbarWidth();
    body.style.paddingRight = `${scrollWith}px`;
    // document.querySelector('header').style.paddingRight = `${scrollWith}px`
    document.documentElement.classList.add('lock');
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};

// smooth behavior ============================================================
const _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideUpDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};
const _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideDownDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};
const _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
// EXTERNAL MODULE: ./node_modules/@fancyapps/ui/dist/index.esm.js
var index_esm = __webpack_require__(252);
// EXTERNAL MODULE: ./node_modules/wow.js/dist/wow.js
var dist_wow = __webpack_require__(630);
var wow_default = /*#__PURE__*/__webpack_require__.n(dist_wow);
;// CONCATENATED MODULE: ./src/js/utils/Marquee.js
class Marquee {
  constructor(container) {
    this._container = typeof container == 'string' ? document.querySelector(container) : container;
    this._list = this._container.querySelector('.marquee');
    this._slides = Array.from(this._list.children);
    this._duplicateSlides();
  }
  _duplicateSlides() {
    /*  
    const duplicateCount = 10
    for (let i = 0; i < duplicateCount; i++) {
       this._slides.forEach(slide => {
           const clone = slide.cloneNode(true);
           echo.push(clone)
           this._list.append(clone);
       });
    } */
    // this._list.style.transition = `transform 1s`
    let lastSlide = this._list.lastElementChild,
      step = 0,
      lastAppendSlide = 0,
      lastSlideNode = this._slides[lastAppendSlide],
      ww = window.innerWidth - 10;
    setInterval(() => {
      step = step + 0.2;
      this._list.style.transform = `translateX(-${step}px)`;
      if (lastSlide.getBoundingClientRect().left < ww) {
        lastAppendSlide++;
        lastSlide = this._list.lastElementChild;
        lastSlideNode = this._list.childNodes[lastAppendSlide];
        this._list.append(lastSlideNode.cloneNode(true));
      }
    }, 0);
  }
}
;// CONCATENATED MODULE: ./src/js/dev/zatz.js









jquery_default()(function () {
  initSwipers();
  initFancybox();
  initHeadingText();
  initWow();
  initMarque();
});
function initSwipers() {
  const swiper = document.querySelector('.achivments');
  if (swiper) {
    new swiper_swiper/* default */.Z(swiper.querySelector('.swiper'), {
      modules: [modules/* EffectCreative */.gI],
      loop: false,
      effect: 'creative',
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: rem(3),
      initialSlide: 2,
      slideToClickedSlide: true,
      creativeEffect: {
        prev: {
          opacity: 0.5,
          translate: ["-75%", 30, -300]
        },
        next: {
          opacity: 0.5,
          translate: ["75%", 30, -300]
        },
        limitProgress: 2
      }
      /*  breakpoints: {
           768: {
               slidesPerView: 1,
               slidesPerGroup: 1,
              }
       }, */
    });
  }
}

function initFancybox() {
  const anytarget = document.querySelector('[data-fancybox]');
  if (!anytarget) return;
  index_esm/* Fancybox */.KR.bind('[data-fancybox]', {
    Thumbs: false,
    width: 'auto',
    Toolbar: {
      display: {
        right: ["close"]
      }
    }
  });
}
function initHeadingText() {
  const container = document.querySelector('#headingText');
  if (!container) return;
  const target = container.querySelector('#headingTextData'),
    array = container.querySelector('.heading__text-list').textContent.split('/');
  print(0, 0);
  function print(word, letter) {
    if (array[word][letter]) {
      target.textContent = target.textContent + array[word][letter];
      setTimeout(() => {
        print(word, letter + 1);
      }, 500 + letter);
    } else {
      if (target.textContent) {
        setTimeout(() => {
          target.textContent = target.textContent.slice(0, -1);
          print(word, -1);
        }, 200);
      } else if (!target.textContent) {
        if (array[word + 1]) {
          setTimeout(() => {
            print(word + 1, 0);
          }, 500);
        } else {
          setTimeout(() => {
            print(0, 0);
          }, 500);
        }
        return;
      }
    }
  }
}
function initWow() {
  const wow = new (wow_default())({
    boxClass: "wow",
    animateClass: "animate__animated",
    offset: 150,
    mobile: false,
    live: true
  });
  wow.init();
}
function initMarque() {
  const container = document.querySelectorAll('.partners__list');
  if (!container) return;
  container.forEach(c => [new Marquee(c)]);
}
function achivActions() {}
;// CONCATENATED MODULE: ./src/index.js




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_example"] = self["webpackChunkwebpack_example"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [588], function() { return __webpack_require__(907); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDN0JBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5Qzs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUEsOENBQThDOztXQUU5QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLG1DQUFtQztXQUNwRTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFbERBO1VBQ0E7VUFDQTtVQUNBLCtFQUErRSxrQ0FBa0M7VUFDakgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9NYXJxdWVlLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy9kZXYvemF0ei5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IFx0Y29uc3QgcmVtID0gZnVuY3Rpb24gKHJlbSkge1xyXG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xyXG4gICAgcmV0dXJuIDAuMDA1MjA4MzM1ICogd2luZG93LmlubmVyV2lkdGggKiByZW07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vINCz0LTQtSAzNzUg0Y3RgtC+INGI0LjRgNC40L3QsCDQvNC+0LHQuNC70YzQvdC+0Lkg0LLQtdGA0YHQuNC4INC80LDQutC10YLQsFxyXG4gICAgcmV0dXJuICgxMDAgLyAzNzUpICogKDAuMDUgKiB3aW5kb3cuaW5uZXJXaWR0aCkgKiByZW07XHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG5leHBvcnQgbGV0IGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcclxuXHJcbmV4cG9ydCBsZXQgYm9keVVubG9jayA9IChkZWxheSA9IDUwMCkgPT4ge1xyXG4gIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gIGlmIChib2R5TG9ja1N0YXR1cykge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzBweCc7XHJcbiAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLnN0eWxlLnBhZGRpbmdSaWdodCA9ICcwcHgnO1xyXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbG9jaycpO1xyXG4gICAgfSwgZGVsYXkpO1xyXG4gICAgYm9keUxvY2tTdGF0dXMgPSBmYWxzZTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgbGV0IGJvZHlMb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XHJcbiAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XHJcbiAgICBjb25zdCBnZXRTY3JvbGxiYXJXaWR0aCA9ICgpID0+IHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgbGV0IHNjcm9sbFdpdGggPSBnZXRTY3JvbGxiYXJXaWR0aCgpO1xyXG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtzY3JvbGxXaXRofXB4YDtcclxuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3Njcm9sbFdpdGh9cHhgXHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9jaycpO1xyXG4gICAgYm9keUxvY2tTdGF0dXMgPSBmYWxzZTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gc21vb3RoIGJlaGF2aW9yID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5leHBvcnQgY29uc3QgX3NsaWRlVXAgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XHJcbiAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ19zbGlkZScpO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XHJcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5vZmZzZXRIZWlnaHR9cHhgO1xyXG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IHNob3dtb3JlID8gYCR7c2hvd21vcmV9cHhgIDogYDBweGA7XHJcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ1RvcCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0YXJnZXQuaGlkZGVuID0gIXNob3dtb3JlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAhc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpIDogbnVsbDtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLXRvcCcpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcclxuICAgICAgIXNob3dtb3JlID8gdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpIDogbnVsbDtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnX3NsaWRlJyk7XHJcbiAgICAgIC8vIGNyZWF0ZSBldmVudFxyXG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2xpZGVVcERvbmUnLCB7XHJcbiAgICAgICAgICBkZXRhaWw6IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSwgZHVyYXRpb24pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IF9zbGlkZURvd24gPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XHJcbiAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ19zbGlkZScpO1xyXG4gICAgdGFyZ2V0LmhpZGRlbiA9IHRhcmdldC5oaWRkZW4gPyBmYWxzZSA6IG51bGw7XHJcbiAgICBzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xyXG4gICAgbGV0IGhlaWdodCA9IHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBzaG93bW9yZSA/IGAke3Nob3dtb3JlfXB4YCA6IGAwcHhgO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcclxuICAgIHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gJ2hlaWdodCwgbWFyZ2luLCBwYWRkaW5nJztcclxuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XHJcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLXRvcCcpO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0Jyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnX3NsaWRlJyk7XHJcbiAgICAgIC8vIGNyZWF0ZSBldmVudFxyXG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2xpZGVEb3duRG9uZScsIHtcclxuICAgICAgICAgIGRldGFpbDoge1xyXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgX3NsaWRlVG9nZ2xlID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDApID0+IHtcclxuICBpZiAodGFyZ2V0LmhpZGRlbikge1xyXG4gICAgcmV0dXJuIF9zbGlkZURvd24odGFyZ2V0LCBkdXJhdGlvbik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBfc2xpZGVVcCh0YXJnZXQsIGR1cmF0aW9uKTtcclxuICB9XHJcbn07XHJcbiIsIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFycXVlZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIgPSB0eXBlb2YgY29udGFpbmVyID09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpIDogY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IHRoaXMuX2NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubWFycXVlZScpXHJcbiAgICAgICAgdGhpcy5fc2xpZGVzID0gQXJyYXkuZnJvbSh0aGlzLl9saXN0LmNoaWxkcmVuKVxyXG4gICAgICAgIHRoaXMuX2R1cGxpY2F0ZVNsaWRlcygpXHJcbiAgICB9XHJcbiAgICBfZHVwbGljYXRlU2xpZGVzKCkge1xyXG4gICAgICAgIC8qICBcclxuICAgICAgIGNvbnN0IGR1cGxpY2F0ZUNvdW50ID0gMTBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGR1cGxpY2F0ZUNvdW50OyBpKyspIHtcclxuICAgICAgICAgICB0aGlzLl9zbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gc2xpZGUuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICBlY2hvLnB1c2goY2xvbmUpXHJcbiAgICAgICAgICAgICAgIHRoaXMuX2xpc3QuYXBwZW5kKGNsb25lKTtcclxuICAgICAgICAgICB9KTtcclxuICAgICAgIH0gKi9cclxuICAgICAgIC8vIHRoaXMuX2xpc3Quc3R5bGUudHJhbnNpdGlvbiA9IGB0cmFuc2Zvcm0gMXNgXHJcbiAgICAgICAgbGV0IGxhc3RTbGlkZSA9IHRoaXMuX2xpc3QubGFzdEVsZW1lbnRDaGlsZCxcclxuICAgICAgICAgICAgc3RlcCA9IDAsXHJcbiAgICAgICAgICAgIGxhc3RBcHBlbmRTbGlkZSA9IDAsXHJcbiAgICAgICAgICAgIGxhc3RTbGlkZU5vZGUgPSB0aGlzLl9zbGlkZXNbbGFzdEFwcGVuZFNsaWRlXSxcclxuICAgICAgICAgICAgd3cgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDEwXHJcblxyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAgKyAwLjJcclxuICAgICAgICAgICAgdGhpcy5fbGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzdGVwfXB4KWBcclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0U2xpZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCA8IHd3KSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0QXBwZW5kU2xpZGUrK1xyXG4gICAgICAgICAgICAgICAgbGFzdFNsaWRlID0gdGhpcy5fbGlzdC5sYXN0RWxlbWVudENoaWxkXHJcbiAgICAgICAgICAgICAgICBsYXN0U2xpZGVOb2RlID0gdGhpcy5fbGlzdC5jaGlsZE5vZGVzW2xhc3RBcHBlbmRTbGlkZV1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3QuYXBwZW5kKGxhc3RTbGlkZU5vZGUuY2xvbmVOb2RlKHRydWUpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCAwKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL0Zvcm0nXHJcbmltcG9ydCBJbnB1dG1hc2sgZnJvbSAnaW5wdXRtYXNrJ1xyXG5pbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlcic7XHJcbmltcG9ydCB7IE5hdmlnYXRpb24sIFBhZ2luYXRpb24sIEdyaWQsIEF1dG9wbGF5LCBFZmZlY3RDcmVhdGl2ZSB9IGZyb20gJ3N3aXBlci9tb2R1bGVzJztcclxuaW1wb3J0IHsgcmVtIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJ1xyXG5pbXBvcnQgeyBGYW5jeWJveCB9IGZyb20gXCJAZmFuY3lhcHBzL3VpXCI7XHJcbmltcG9ydCBXT1cgZnJvbSAnd293LmpzJztcclxuaW1wb3J0IE1hcnF1ZWUgZnJvbSAnLi4vdXRpbHMvTWFycXVlZSc7XHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBpbml0U3dpcGVycygpXHJcbiAgICBpbml0RmFuY3lib3goKVxyXG4gICAgaW5pdEhlYWRpbmdUZXh0KClcclxuICAgIGluaXRXb3coKVxyXG4gICAgaW5pdE1hcnF1ZSgpXHJcblxyXG59KVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRTd2lwZXJzKCkge1xyXG4gICAgY29uc3Qgc3dpcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjaGl2bWVudHMnKVxyXG4gICAgaWYgKHN3aXBlcikge1xyXG4gICAgICAgIG5ldyBTd2lwZXIoc3dpcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXInKSwge1xyXG4gICAgICAgICAgICBtb2R1bGVzOiBbRWZmZWN0Q3JlYXRpdmVdLFxyXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgZWZmZWN0OiAnY3JlYXRpdmUnLFxyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiByZW0oMyksXHJcbiAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMixcclxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgY3JlYXRpdmVFZmZlY3Q6IHtcclxuICAgICAgICAgICAgICAgIHByZXY6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlOiBbXCItNzUlXCIsIDMwLCAtMzAwXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogW1wiNzUlXCIsIDMwLCAtMzAwXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsaW1pdFByb2dyZXNzOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcclxuIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0sICovXHJcblxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0RmFuY3lib3goKSB7XHJcbiAgICBjb25zdCBhbnl0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYW5jeWJveF0nKVxyXG4gICAgaWYgKCFhbnl0YXJnZXQpIHJldHVyblxyXG5cclxuICAgIEZhbmN5Ym94LmJpbmQoJ1tkYXRhLWZhbmN5Ym94XScsIHtcclxuICAgICAgICBUaHVtYnM6IGZhbHNlLFxyXG4gICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgVG9vbGJhcjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IFtcImNsb3NlXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdEhlYWRpbmdUZXh0KCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlYWRpbmdUZXh0JylcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgdGFyZ2V0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNoZWFkaW5nVGV4dERhdGEnKSxcclxuICAgICAgICBhcnJheSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaGVhZGluZ19fdGV4dC1saXN0JykudGV4dENvbnRlbnQuc3BsaXQoJy8nKVxyXG5cclxuXHJcblxyXG4gICAgcHJpbnQoMCwgMClcclxuICAgIGZ1bmN0aW9uIHByaW50KHdvcmQsIGxldHRlcikge1xyXG5cclxuICAgICAgICBpZiAoYXJyYXlbd29yZF1bbGV0dGVyXSkge1xyXG4gICAgICAgICAgICB0YXJnZXQudGV4dENvbnRlbnQgPSB0YXJnZXQudGV4dENvbnRlbnQgKyBhcnJheVt3b3JkXVtsZXR0ZXJdXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJpbnQod29yZCwgbGV0dGVyICsgMSlcclxuICAgICAgICAgICAgfSwgNTAwICsgbGV0dGVyKTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQudGV4dENvbnRlbnQgPSB0YXJnZXQudGV4dENvbnRlbnQuc2xpY2UoMCwgLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnQod29yZCwgLTEpXHJcbiAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0YXJnZXQudGV4dENvbnRlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbd29yZCArIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KHdvcmQgKyAxLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludCgwLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0V293KCkge1xyXG4gICAgY29uc3Qgd293ID0gbmV3IFdPVyh7XHJcbiAgICAgICAgYm94Q2xhc3M6IFwid293XCIsXHJcbiAgICAgICAgYW5pbWF0ZUNsYXNzOiBcImFuaW1hdGVfX2FuaW1hdGVkXCIsXHJcbiAgICAgICAgb2Zmc2V0OiAxNTAsXHJcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcclxuICAgICAgICBsaXZlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICB3b3cuaW5pdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0TWFycXVlKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhcnRuZXJzX19saXN0JylcclxuICAgIGlmICghY29udGFpbmVyKSByZXR1cm5cclxuICAgIGNvbnRhaW5lci5mb3JFYWNoKChjKSA9PiBbXHJcbiAgICAgICAgbmV3IE1hcnF1ZWUoYylcclxuXHJcbiAgICBdKVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYWNoaXZBY3Rpb25zKCkge1xyXG5cclxufVxyXG4iLCJpbXBvcnQgJy4vaW5kZXguc2Nzcyc7XHJcblxyXG5pbXBvcnQgJy4vanMvY29tcG9uZW50cy9oZWFkZXIuanMnXHJcblxyXG5pbXBvcnQgJy4vanMvZGV2L3phdHouanMnO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdDE3OTogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3dlYnBhY2tfZXhhbXBsZVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt3ZWJwYWNrX2V4YW1wbGVcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFs1ODhdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oOTA3KTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsicmVtIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImJvZHlMb2NrU3RhdHVzIiwiYm9keVVubG9jayIsImRlbGF5IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNldFRpbWVvdXQiLCJzdHlsZSIsInBhZGRpbmdSaWdodCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImJvZHlMb2NrIiwiZ2V0U2Nyb2xsYmFyV2lkdGgiLCJjbGllbnRXaWR0aCIsInNjcm9sbFdpdGgiLCJhZGQiLCJfc2xpZGVVcCIsInRhcmdldCIsImR1cmF0aW9uIiwic2hvd21vcmUiLCJjb250YWlucyIsInRyYW5zaXRpb25Qcm9wZXJ0eSIsInRyYW5zaXRpb25EdXJhdGlvbiIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsIm92ZXJmbG93IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJoaWRkZW4iLCJyZW1vdmVQcm9wZXJ0eSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsIl9zbGlkZURvd24iLCJfc2xpZGVUb2dnbGUiLCJNYXJxdWVlIiwiY29uc3RydWN0b3IiLCJjb250YWluZXIiLCJfY29udGFpbmVyIiwiX2xpc3QiLCJfc2xpZGVzIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGRyZW4iLCJfZHVwbGljYXRlU2xpZGVzIiwibGFzdFNsaWRlIiwibGFzdEVsZW1lbnRDaGlsZCIsInN0ZXAiLCJsYXN0QXBwZW5kU2xpZGUiLCJsYXN0U2xpZGVOb2RlIiwid3ciLCJzZXRJbnRlcnZhbCIsInRyYW5zZm9ybSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJjaGlsZE5vZGVzIiwiYXBwZW5kIiwiY2xvbmVOb2RlIiwiJCIsIkZvcm0iLCJJbnB1dG1hc2siLCJTd2lwZXIiLCJOYXZpZ2F0aW9uIiwiUGFnaW5hdGlvbiIsIkdyaWQiLCJBdXRvcGxheSIsIkVmZmVjdENyZWF0aXZlIiwiRmFuY3lib3giLCJXT1ciLCJpbml0U3dpcGVycyIsImluaXRGYW5jeWJveCIsImluaXRIZWFkaW5nVGV4dCIsImluaXRXb3ciLCJpbml0TWFycXVlIiwic3dpcGVyIiwibW9kdWxlcyIsImxvb3AiLCJlZmZlY3QiLCJzbGlkZXNQZXJWaWV3IiwiY2VudGVyZWRTbGlkZXMiLCJzcGFjZUJldHdlZW4iLCJpbml0aWFsU2xpZGUiLCJzbGlkZVRvQ2xpY2tlZFNsaWRlIiwiY3JlYXRpdmVFZmZlY3QiLCJwcmV2Iiwib3BhY2l0eSIsInRyYW5zbGF0ZSIsIm5leHQiLCJsaW1pdFByb2dyZXNzIiwiYW55dGFyZ2V0IiwiYmluZCIsIlRodW1icyIsIndpZHRoIiwiVG9vbGJhciIsImRpc3BsYXkiLCJyaWdodCIsImFycmF5IiwidGV4dENvbnRlbnQiLCJzcGxpdCIsInByaW50Iiwid29yZCIsImxldHRlciIsInNsaWNlIiwid293IiwiYm94Q2xhc3MiLCJhbmltYXRlQ2xhc3MiLCJvZmZzZXQiLCJtb2JpbGUiLCJsaXZlIiwiaW5pdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYyIsImFjaGl2QWN0aW9ucyJdLCJzb3VyY2VSb290IjoiIn0=