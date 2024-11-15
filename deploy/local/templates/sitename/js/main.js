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
  /**
   * 
   * @param {DomElement | string} container 
   * @param {number} timing 
   * @param {boolean} reverse 
   */
  constructor(container, timing) {
    let reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    this._container = typeof container == 'string' ? document.querySelector(container) : container;
    this._timing = timing; //second
    this._isReverse = reverse;
    this._list = this._container.querySelector('.marquee');
    this._slides = Array.from(this._list.children);
    this._duplicateSlides();
    this._maxTranslate = this._list.lastElementChild.getBoundingClientRect().left - this._container.getBoundingClientRect().width;
    this._addSliding();
  }
  _duplicateSlides() {
    const ww = window.innerWidth,
      lastElPos = this._list.lastElementChild.getBoundingClientRect().left,
      minWidth = this._container.getBoundingClientRect().width * 4,
      addCount = Math.ceil(minWidth / lastElPos);
    for (let i = 0; addCount + 1 > i; i++) {
      this._slides.forEach(e => [this._list.append(e.cloneNode(true))]);
    }
  }
  _addSliding() {
    if (this._isReverse) {
      this._list.style.transform = `translateX(-${this._maxTranslate}px)`;
      this._list.getBoundingClientRect();
    }
    this._sliding();
  }
  _sliding() {
    this._list.style.transition = `transform ${this._timing}s linear`;
    if (this._isReverse) {
      this._list.style.transform = `translateX(0px)`;
    } else {
      this._list.style.transform = `translateX(-${this._maxTranslate}px)`;
    }
    setTimeout(() => {
      console.log('timing');
      this._list.style.transition = `transform 0s linear`;
      if (this._isReverse) {
        this._list.style.transform = `translateX(-${this._maxTranslate}px)`;
      } else {
        this._list.style.transform = `translateX(0px)`;
      }
      this._list.getBoundingClientRect(); // Этот вызов заставляет браузер применить изменения
      // Запускаем анимацию заново
      requestAnimationFrame(() => this._sliding());
    }, this._timing * 1000);
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
    aspectRatio: true,
    on: {
      ready: fancybox => {
        // Показываем прелоадер перед загрузкой
        console.log('ready');
      },
      load: fancybox => {
        // Скрываем прелоадер после загрузки
        console.log('load');
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
  container.forEach(c => [new Marquee(c, 180)]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvTWFycXVlZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvZGV2L3phdHouanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBcdGNvbnN0IHJlbSA9IGZ1bmN0aW9uIChyZW0pIHtcclxuICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcclxuICAgIHJldHVybiAwLjAwNTIwODMzNSAqIHdpbmRvdy5pbm5lcldpZHRoICogcmVtO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyDQs9C00LUgMzc1INGN0YLQviDRiNC40YDQuNC90LAg0LzQvtCx0LjQu9GM0L3QvtC5INCy0LXRgNGB0LjQuCDQvNCw0LrQtdGC0LBcclxuICAgIHJldHVybiAoMTAwIC8gMzc1KSAqICgwLjA1ICogd2luZG93LmlubmVyV2lkdGgpICogcmVtO1xyXG4gIH1cclxuICBcclxufVxyXG5cclxuZXhwb3J0IGxldCBib2R5TG9ja1N0YXR1cyA9IHRydWU7XHJcblxyXG5leHBvcnQgbGV0IGJvZHlVbmxvY2sgPSAoZGVsYXkgPSA1MDApID0+IHtcclxuICBsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICBpZiAoYm9keUxvY2tTdGF0dXMpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcwcHgnO1xyXG4gICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMHB4JztcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2xvY2snKTtcclxuICAgIH0sIGRlbGF5KTtcclxuICAgIGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgYm9keUxvY2tTdGF0dXMgPSB0cnVlO1xyXG4gICAgfSwgZGVsYXkpO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGxldCBib2R5TG9jayA9IChkZWxheSA9IDUwMCkgPT4ge1xyXG4gIGxldCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gIGlmIChib2R5TG9ja1N0YXR1cykge1xyXG4gICAgY29uc3QgZ2V0U2Nyb2xsYmFyV2lkdGggPSAoKSA9PiB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgIGxldCBzY3JvbGxXaXRoID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKTtcclxuICAgIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7c2Nyb2xsV2l0aH1weGA7XHJcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtzY3JvbGxXaXRofXB4YFxyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvY2snKTtcclxuICAgIGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgYm9keUxvY2tTdGF0dXMgPSB0cnVlO1xyXG4gICAgfSwgZGVsYXkpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIHNtb290aCBiZWhhdmlvciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuZXhwb3J0IGNvbnN0IF9zbGlkZVVwID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDAsIHNob3dtb3JlID0gMCkgPT4ge1xyXG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcclxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdfc2xpZGUnKTtcclxuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXQub2Zmc2V0SGVpZ2h0fXB4YDtcclxuICAgIHRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBzaG93bW9yZSA/IGAke3Nob3dtb3JlfXB4YCA6IGAwcHhgO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdCb3R0b20gPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGFyZ2V0LmhpZGRlbiA9ICFzaG93bW9yZSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgIXNob3dtb3JlID8gdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKSA6IG51bGw7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy10b3AnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tYm90dG9tJyk7XHJcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKSA6IG51bGw7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xyXG4gICAgICAvLyBjcmVhdGUgZXZlbnRcclxuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NsaWRlVXBEb25lJywge1xyXG4gICAgICAgICAgZGV0YWlsOiB7XHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH0sIGR1cmF0aW9uKTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBfc2xpZGVEb3duID0gKHRhcmdldCwgZHVyYXRpb24gPSA1MDAsIHNob3dtb3JlID0gMCkgPT4ge1xyXG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcclxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdfc2xpZGUnKTtcclxuICAgIHRhcmdldC5oaWRkZW4gPSB0YXJnZXQuaGlkZGVuID8gZmFsc2UgOiBudWxsO1xyXG4gICAgc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpIDogbnVsbDtcclxuICAgIGxldCBoZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gc2hvd21vcmUgPyBgJHtzaG93bW9yZX1weGAgOiBgMHB4YDtcclxuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XHJcbiAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XHJcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctdG9wJyk7XHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctYm90dG9tJyk7XHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKTtcclxuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScpO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93Jyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xyXG4gICAgICAvLyBjcmVhdGUgZXZlbnRcclxuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NsaWRlRG93bkRvbmUnLCB7XHJcbiAgICAgICAgICBkZXRhaWw6IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfSwgZHVyYXRpb24pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IF9zbGlkZVRvZ2dsZSA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XHJcbiAgaWYgKHRhcmdldC5oaWRkZW4pIHtcclxuICAgIHJldHVybiBfc2xpZGVEb3duKHRhcmdldCwgZHVyYXRpb24pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gX3NsaWRlVXAodGFyZ2V0LCBkdXJhdGlvbik7XHJcbiAgfVxyXG59O1xyXG4iLCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcnF1ZWUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RG9tRWxlbWVudCB8IHN0cmluZ30gY29udGFpbmVyIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWluZyBcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmV2ZXJzZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCB0aW1pbmcsIHJldmVyc2UgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IHR5cGVvZiBjb250YWluZXIgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikgOiBjb250YWluZXJcclxuICAgICAgICB0aGlzLl90aW1pbmcgPSB0aW1pbmcgLy9zZWNvbmRcclxuICAgICAgICB0aGlzLl9pc1JldmVyc2UgPSByZXZlcnNlXHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IHRoaXMuX2NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubWFycXVlZScpXHJcbiAgICAgICAgdGhpcy5fc2xpZGVzID0gQXJyYXkuZnJvbSh0aGlzLl9saXN0LmNoaWxkcmVuKVxyXG4gICAgICAgIHRoaXMuX2R1cGxpY2F0ZVNsaWRlcygpXHJcbiAgICAgICAgdGhpcy5fbWF4VHJhbnNsYXRlID0gdGhpcy5fbGlzdC5sYXN0RWxlbWVudENoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB0aGlzLl9jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICAgICAgICB0aGlzLl9hZGRTbGlkaW5nKClcclxuICAgIH1cclxuICAgIF9kdXBsaWNhdGVTbGlkZXMoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHd3ID0gd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICAgICAgICAgIGxhc3RFbFBvcyA9IHRoaXMuX2xpc3QubGFzdEVsZW1lbnRDaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LFxyXG4gICAgICAgICAgICBtaW5XaWR0aCA9IHRoaXMuX2NvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAqIDQsXHJcbiAgICAgICAgICAgIGFkZENvdW50ID0gTWF0aC5jZWlsKG1pbldpZHRoIC8gbGFzdEVsUG9zKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBhZGRDb3VudCArIDEgPiBpOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlcy5mb3JFYWNoKChlKSA9PiBbXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0LmFwcGVuZChlLmNsb25lTm9kZSh0cnVlKSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgX2FkZFNsaWRpbmcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzUmV2ZXJzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3RoaXMuX21heFRyYW5zbGF0ZX1weClgXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zbGlkaW5nKClcclxuXHJcbiAgICB9XHJcbiAgICBfc2xpZGluZygpIHtcclxuICAgICAgICB0aGlzLl9saXN0LnN0eWxlLnRyYW5zaXRpb24gPSBgdHJhbnNmb3JtICR7dGhpcy5fdGltaW5nfXMgbGluZWFyYFxyXG4gICAgICAgIGlmICh0aGlzLl9pc1JldmVyc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgwcHgpYFxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3RoaXMuX21heFRyYW5zbGF0ZX1weClgXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RpbWluZycpO1xyXG4gICAgICAgICAgICAgdGhpcy5fbGlzdC5zdHlsZS50cmFuc2l0aW9uID0gYHRyYW5zZm9ybSAwcyBsaW5lYXJgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1JldmVyc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7dGhpcy5fbWF4VHJhbnNsYXRlfXB4KWBcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDBweClgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IC8vINCt0YLQvtGCINCy0YvQt9C+0LIg0LfQsNGB0YLQsNCy0LvRj9C10YIg0LHRgNCw0YPQt9C10YAg0L/RgNC40LzQtdC90LjRgtGMINC40LfQvNC10L3QtdC90LjRj1xyXG4gICAgICAgICAgICAvLyDQl9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjiDQt9Cw0L3QvtCy0L5cclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3NsaWRpbmcoKSk7XHJcbiAgICAgICAgfSwgdGhpcy5fdGltaW5nICogMTAwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCBGb3JtIGZyb20gJy4uL3V0aWxzL0Zvcm0nXHJcbmltcG9ydCBJbnB1dG1hc2sgZnJvbSAnaW5wdXRtYXNrJ1xyXG5pbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlcic7XHJcbmltcG9ydCB7IE5hdmlnYXRpb24sIFBhZ2luYXRpb24sIEdyaWQsIEF1dG9wbGF5LCBFZmZlY3RDcmVhdGl2ZSB9IGZyb20gJ3N3aXBlci9tb2R1bGVzJztcclxuaW1wb3J0IHsgcmVtIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJ1xyXG5pbXBvcnQgeyBGYW5jeWJveCB9IGZyb20gXCJAZmFuY3lhcHBzL3VpXCI7XHJcbmltcG9ydCBXT1cgZnJvbSAnd293LmpzJztcclxuaW1wb3J0IE1hcnF1ZWUgZnJvbSAnLi4vdXRpbHMvTWFycXVlZSc7XHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBpbml0U3dpcGVycygpXHJcbiAgICBpbml0RmFuY3lib3goKVxyXG4gICAgaW5pdEhlYWRpbmdUZXh0KClcclxuICAgIGluaXRXb3coKVxyXG4gICAgaW5pdE1hcnF1ZSgpXHJcblxyXG59KVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRTd2lwZXJzKCkge1xyXG4gICAgY29uc3Qgc3dpcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjaGl2bWVudHMnKVxyXG4gICAgaWYgKHN3aXBlcikge1xyXG4gICAgICAgIG5ldyBTd2lwZXIoc3dpcGVyLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXInKSwge1xyXG4gICAgICAgICAgICBtb2R1bGVzOiBbRWZmZWN0Q3JlYXRpdmVdLFxyXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgZWZmZWN0OiAnY3JlYXRpdmUnLFxyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiByZW0oMyksXHJcbiAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMixcclxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgY3JlYXRpdmVFZmZlY3Q6IHtcclxuICAgICAgICAgICAgICAgIHByZXY6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlOiBbXCItNzUlXCIsIDMwLCAtMzAwXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogW1wiNzUlXCIsIDMwLCAtMzAwXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsaW1pdFByb2dyZXNzOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcclxuIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0sICovXHJcblxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0RmFuY3lib3goKSB7XHJcbiAgICBjb25zdCBhbnl0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYW5jeWJveF0nKVxyXG4gICAgaWYgKCFhbnl0YXJnZXQpIHJldHVyblxyXG5cclxuICAgIEZhbmN5Ym94LmJpbmQoJ1tkYXRhLWZhbmN5Ym94XScsIHtcclxuICAgICAgICBUaHVtYnM6IGZhbHNlLFxyXG4gICAgICAgIGFzcGVjdFJhdGlvOiB0cnVlLFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIHJlYWR5OiAoZmFuY3lib3gpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vINCf0L7QutCw0LfRi9Cy0LDQtdC8INC/0YDQtdC70L7QsNC00LXRgCDQv9C10YDQtdC0INC30LDQs9GA0YPQt9C60L7QuVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlYWR5JylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbG9hZDogKGZhbmN5Ym94KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDQodC60YDRi9Cy0LDQtdC8INC/0YDQtdC70L7QsNC00LXRgCDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60LhcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2FkJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0SGVhZGluZ1RleHQoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVhZGluZ1RleHQnKVxyXG5cclxuICAgIGlmICghY29udGFpbmVyKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCB0YXJnZXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2hlYWRpbmdUZXh0RGF0YScpLFxyXG4gICAgICAgIGFycmF5ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkaW5nX190ZXh0LWxpc3QnKS50ZXh0Q29udGVudC5zcGxpdCgnLycpXHJcblxyXG5cclxuXHJcbiAgICBwcmludCgwLCAwKVxyXG4gICAgZnVuY3Rpb24gcHJpbnQod29yZCwgbGV0dGVyKSB7XHJcblxyXG4gICAgICAgIGlmIChhcnJheVt3b3JkXVtsZXR0ZXJdKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC50ZXh0Q29udGVudCA9IHRhcmdldC50ZXh0Q29udGVudCArIGFycmF5W3dvcmRdW2xldHRlcl1cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcmludCh3b3JkLCBsZXR0ZXIgKyAxKVxyXG4gICAgICAgICAgICB9LCA1MDAgKyBsZXR0ZXIpO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC50ZXh0Q29udGVudCA9IHRhcmdldC50ZXh0Q29udGVudC5zbGljZSgwLCAtMSlcclxuICAgICAgICAgICAgICAgICAgICBwcmludCh3b3JkLCAtMSlcclxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRhcmdldC50ZXh0Q29udGVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhcnJheVt3b3JkICsgMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQod29yZCArIDEsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KDAsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRXb3coKSB7XHJcbiAgICBjb25zdCB3b3cgPSBuZXcgV09XKHtcclxuICAgICAgICBib3hDbGFzczogXCJ3b3dcIixcclxuICAgICAgICBhbmltYXRlQ2xhc3M6IFwiYW5pbWF0ZV9fYW5pbWF0ZWRcIixcclxuICAgICAgICBvZmZzZXQ6IDE1MCxcclxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxyXG4gICAgICAgIGxpdmU6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIHdvdy5pbml0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRNYXJxdWUoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFydG5lcnNfX2xpc3QnKVxyXG4gICAgaWYgKCFjb250YWluZXIpIHJldHVyblxyXG4gICAgY29udGFpbmVyLmZvckVhY2goKGMpID0+IFtcclxuICAgICAgICBuZXcgTWFycXVlZShjLCAxODApXHJcblxyXG4gICAgXSlcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGFjaGl2QWN0aW9ucygpIHtcclxuXHJcbn1cclxuIiwiaW1wb3J0ICcuL2luZGV4LnNjc3MnO1xyXG5cclxuaW1wb3J0ICcuL2pzL2NvbXBvbmVudHMvaGVhZGVyLmpzJ1xyXG5cclxuaW1wb3J0ICcuL2pzL2Rldi96YXR6LmpzJztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHQxNzk6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt3ZWJwYWNrX2V4YW1wbGVcIl0gPSBzZWxmW1wid2VicGFja0NodW5rd2VicGFja19leGFtcGxlXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbNTg4XSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDkwNyk7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbInJlbSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJib2R5TG9ja1N0YXR1cyIsImJvZHlVbmxvY2siLCJkZWxheSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRUaW1lb3V0Iiwic3R5bGUiLCJwYWRkaW5nUmlnaHQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJib2R5TG9jayIsImdldFNjcm9sbGJhcldpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxXaXRoIiwiYWRkIiwiX3NsaWRlVXAiLCJ0YXJnZXQiLCJkdXJhdGlvbiIsInNob3dtb3JlIiwiY29udGFpbnMiLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvdmVyZmxvdyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiaGlkZGVuIiwicmVtb3ZlUHJvcGVydHkiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJfc2xpZGVEb3duIiwiX3NsaWRlVG9nZ2xlIiwiTWFycXVlZSIsImNvbnN0cnVjdG9yIiwiY29udGFpbmVyIiwidGltaW5nIiwicmV2ZXJzZSIsIl9jb250YWluZXIiLCJfdGltaW5nIiwiX2lzUmV2ZXJzZSIsIl9saXN0IiwiX3NsaWRlcyIsIkFycmF5IiwiZnJvbSIsImNoaWxkcmVuIiwiX2R1cGxpY2F0ZVNsaWRlcyIsIl9tYXhUcmFuc2xhdGUiLCJsYXN0RWxlbWVudENoaWxkIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsIndpZHRoIiwiX2FkZFNsaWRpbmciLCJ3dyIsImxhc3RFbFBvcyIsIm1pbldpZHRoIiwiYWRkQ291bnQiLCJNYXRoIiwiY2VpbCIsImkiLCJmb3JFYWNoIiwiZSIsImFwcGVuZCIsImNsb25lTm9kZSIsInRyYW5zZm9ybSIsIl9zbGlkaW5nIiwidHJhbnNpdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCIkIiwiRm9ybSIsIklucHV0bWFzayIsIlN3aXBlciIsIk5hdmlnYXRpb24iLCJQYWdpbmF0aW9uIiwiR3JpZCIsIkF1dG9wbGF5IiwiRWZmZWN0Q3JlYXRpdmUiLCJGYW5jeWJveCIsIldPVyIsImluaXRTd2lwZXJzIiwiaW5pdEZhbmN5Ym94IiwiaW5pdEhlYWRpbmdUZXh0IiwiaW5pdFdvdyIsImluaXRNYXJxdWUiLCJzd2lwZXIiLCJtb2R1bGVzIiwibG9vcCIsImVmZmVjdCIsInNsaWRlc1BlclZpZXciLCJjZW50ZXJlZFNsaWRlcyIsInNwYWNlQmV0d2VlbiIsImluaXRpYWxTbGlkZSIsInNsaWRlVG9DbGlja2VkU2xpZGUiLCJjcmVhdGl2ZUVmZmVjdCIsInByZXYiLCJvcGFjaXR5IiwidHJhbnNsYXRlIiwibmV4dCIsImxpbWl0UHJvZ3Jlc3MiLCJhbnl0YXJnZXQiLCJiaW5kIiwiVGh1bWJzIiwiYXNwZWN0UmF0aW8iLCJvbiIsInJlYWR5IiwiZmFuY3lib3giLCJsb2FkIiwiYXJyYXkiLCJ0ZXh0Q29udGVudCIsInNwbGl0IiwicHJpbnQiLCJ3b3JkIiwibGV0dGVyIiwic2xpY2UiLCJ3b3ciLCJib3hDbGFzcyIsImFuaW1hdGVDbGFzcyIsIm9mZnNldCIsIm1vYmlsZSIsImxpdmUiLCJpbml0IiwicXVlcnlTZWxlY3RvckFsbCIsImMiLCJhY2hpdkFjdGlvbnMiXSwic291cmNlUm9vdCI6IiJ9