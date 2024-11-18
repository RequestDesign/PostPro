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
  initHeaderSwiper();
});
function initHeaderSwiper() {
  const targets = jquery_default()('.header__c-nav-e');
  if (!targets) return;
  targets.on('mouseenter', e => {
    e.currentTarget.classList.add('_hover');
  });
  targets.on('mouseleave', e => {
    e.currentTarget.classList.remove('_hover');
  });
}
function initSwipers() {
  const swiper = document.querySelector('.achivments');
  if (swiper) {
    new swiper_swiper/* default */.Z(swiper.querySelector('.swiper'), {
      modules: [modules/* EffectCreative */.gI, modules/* Autoplay */.pt],
      loop: true,
      effect: 'creative',
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: rem(3),
      initialSlide: 2,
      slideToClickedSlide: true,
      /*   autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
        }, */
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
    array = container.querySelector('.heading__text-list').textContent.split('/'),
    writeSpeed = 200,
    deleteSpeed = 200,
    waitSpeed = 1000;
  print(0, 0);
  function print(word, letter) {
    if (array[word][letter]) {
      target.textContent = target.textContent + array[word][letter];
      setTimeout(() => {
        print(word, letter + 1);
      }, writeSpeed + letter);
    } else {
      if (target.textContent) {
        if (target.textContent.length == array[word].length) {
          setTimeout(() => {
            target.textContent = target.textContent.slice(0, -1);
            print(word, -1);
          }, waitSpeed);
        } else {
          setTimeout(() => {
            target.textContent = target.textContent.slice(0, -1);
            print(word, -1);
          }, deleteSpeed);
        }
      } else if (!target.textContent) {
        if (array[word + 1]) {
          setTimeout(() => {
            print(word + 1, 0);
          }, writeSpeed);
        } else {
          setTimeout(() => {
            print(0, 0);
          }, writeSpeed);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QyxvSEFBb0gsaURBQWlEO1dBQ3JLO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0M3QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EsK0VBQStFLGtDQUFrQztVQUNqSCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL01hcnF1ZWUuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL2Rldi96YXR6LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgXHRjb25zdCByZW0gPSBmdW5jdGlvbiAocmVtKSB7XHJcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XHJcbiAgICByZXR1cm4gMC4wMDUyMDgzMzUgKiB3aW5kb3cuaW5uZXJXaWR0aCAqIHJlbTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8g0LPQtNC1IDM3NSDRjdGC0L4g0YjQuNGA0LjQvdCwINC80L7QsdC40LvRjNC90L7QuSDQstC10YDRgdC40Lgg0LzQsNC60LXRgtCwXHJcbiAgICByZXR1cm4gKDEwMCAvIDM3NSkgKiAoMC4wNSAqIHdpbmRvdy5pbm5lcldpZHRoKSAqIHJlbTtcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgYm9keUxvY2tTdGF0dXMgPSB0cnVlO1xyXG5cclxuZXhwb3J0IGxldCBib2R5VW5sb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XHJcbiAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnMHB4JztcclxuICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzBweCc7XHJcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsb2NrJyk7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgICBib2R5TG9ja1N0YXR1cyA9IGZhbHNlO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBsZXQgYm9keUxvY2sgPSAoZGVsYXkgPSA1MDApID0+IHtcclxuICBsZXQgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICBpZiAoYm9keUxvY2tTdGF0dXMpIHtcclxuICAgIGNvbnN0IGdldFNjcm9sbGJhcldpZHRoID0gKCkgPT4gd2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICBsZXQgc2Nyb2xsV2l0aCA9IGdldFNjcm9sbGJhcldpZHRoKCk7XHJcbiAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3Njcm9sbFdpdGh9cHhgO1xyXG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7c2Nyb2xsV2l0aH1weGBcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2NrJyk7XHJcbiAgICBib2R5TG9ja1N0YXR1cyA9IGZhbHNlO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBzbW9vdGggYmVoYXZpb3IgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmV4cG9ydCBjb25zdCBfc2xpZGVVcCA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwLCBzaG93bW9yZSA9IDApID0+IHtcclxuICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XHJcbiAgICB0YXJnZXQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gJ2hlaWdodCwgbWFyZ2luLCBwYWRkaW5nJztcclxuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XHJcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0Lm9mZnNldEhlaWdodH1weGA7XHJcbiAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gc2hvd21vcmUgPyBgJHtzaG93bW9yZX1weGAgOiBgMHB4YDtcclxuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xyXG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRhcmdldC5oaWRkZW4gPSAhc2hvd21vcmUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctdG9wJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XHJcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbWFyZ2luLWJvdHRvbScpO1xyXG4gICAgICAhc2hvd21vcmUgPyB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ292ZXJmbG93JykgOiBudWxsO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5Jyk7XHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcclxuICAgICAgLy8gY3JlYXRlIGV2ZW50XHJcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZVVwRG9uZScsIHtcclxuICAgICAgICAgIGRldGFpbDoge1xyXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgX3NsaWRlRG93biA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwLCBzaG93bW9yZSA9IDApID0+IHtcclxuICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XHJcbiAgICB0YXJnZXQuaGlkZGVuID0gdGFyZ2V0LmhpZGRlbiA/IGZhbHNlIDogbnVsbDtcclxuICAgIHNob3dtb3JlID8gdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKSA6IG51bGw7XHJcbiAgICBsZXQgaGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IHNob3dtb3JlID8gYCR7c2hvd21vcmV9cHhgIDogYDBweGA7XHJcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ1RvcCA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XHJcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcclxuICAgIHRhcmdldC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xyXG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcclxuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xyXG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XHJcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xyXG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcclxuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLXByb3BlcnR5Jyk7XHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcclxuICAgICAgLy8gY3JlYXRlIGV2ZW50XHJcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZURvd25Eb25lJywge1xyXG4gICAgICAgICAgZGV0YWlsOiB7XHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH0sIGR1cmF0aW9uKTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBfc2xpZGVUb2dnbGUgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCkgPT4ge1xyXG4gIGlmICh0YXJnZXQuaGlkZGVuKSB7XHJcbiAgICByZXR1cm4gX3NsaWRlRG93bih0YXJnZXQsIGR1cmF0aW9uKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIF9zbGlkZVVwKHRhcmdldCwgZHVyYXRpb24pO1xyXG4gIH1cclxufTtcclxuIiwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXJxdWVlIHtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0RvbUVsZW1lbnQgfCBzdHJpbmd9IGNvbnRhaW5lciBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1pbmcgXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJldmVyc2UgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgdGltaW5nLCByZXZlcnNlID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIgPSB0eXBlb2YgY29udGFpbmVyID09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpIDogY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5fdGltaW5nID0gdGltaW5nIC8vc2Vjb25kXHJcbiAgICAgICAgdGhpcy5faXNSZXZlcnNlID0gcmV2ZXJzZVxyXG4gICAgICAgIHRoaXMuX2xpc3QgPSB0aGlzLl9jb250YWluZXIucXVlcnlTZWxlY3RvcignLm1hcnF1ZWUnKVxyXG4gICAgICAgIHRoaXMuX3NsaWRlcyA9IEFycmF5LmZyb20odGhpcy5fbGlzdC5jaGlsZHJlbilcclxuICAgICAgICB0aGlzLl9kdXBsaWNhdGVTbGlkZXMoKVxyXG4gICAgICAgIHRoaXMuX21heFRyYW5zbGF0ZSA9IHRoaXMuX2xpc3QubGFzdEVsZW1lbnRDaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gdGhpcy5fY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXHJcbiAgICAgICAgdGhpcy5fYWRkU2xpZGluZygpXHJcbiAgICB9XHJcbiAgICBfZHVwbGljYXRlU2xpZGVzKCkge1xyXG5cclxuICAgICAgICBjb25zdCB3dyA9IHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgICAgICBsYXN0RWxQb3MgPSB0aGlzLl9saXN0Lmxhc3RFbGVtZW50Q2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcclxuICAgICAgICAgICAgbWluV2lkdGggPSB0aGlzLl9jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggKiA0LFxyXG4gICAgICAgICAgICBhZGRDb3VudCA9IE1hdGguY2VpbChtaW5XaWR0aCAvIGxhc3RFbFBvcylcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgYWRkQ291bnQgKyAxID4gaTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXMuZm9yRWFjaCgoZSkgPT4gW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5hcHBlbmQoZS5jbG9uZU5vZGUodHJ1ZSkpXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIF9hZGRTbGlkaW5nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1JldmVyc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHt0aGlzLl9tYXhUcmFuc2xhdGV9cHgpYFxyXG4gICAgICAgICAgICB0aGlzLl9saXN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGluZygpXHJcblxyXG4gICAgfVxyXG4gICAgX3NsaWRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5fbGlzdC5zdHlsZS50cmFuc2l0aW9uID0gYHRyYW5zZm9ybSAke3RoaXMuX3RpbWluZ31zIGxpbmVhcmBcclxuICAgICAgICBpZiAodGhpcy5faXNSZXZlcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoMHB4KWBcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHt0aGlzLl9tYXhUcmFuc2xhdGV9cHgpYFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aW1pbmcnKTtcclxuICAgICAgICAgICAgIHRoaXMuX2xpc3Quc3R5bGUudHJhbnNpdGlvbiA9IGB0cmFuc2Zvcm0gMHMgbGluZWFyYFxyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNSZXZlcnNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3RoaXMuX21heFRyYW5zbGF0ZX1weClgXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgwcHgpYFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9saXN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyAvLyDQrdGC0L7RgiDQstGL0LfQvtCyINC30LDRgdGC0LDQstC70Y/QtdGCINCx0YDQsNGD0LfQtdGAINC/0YDQuNC80LXQvdC40YLRjCDQuNC30LzQtdC90LXQvdC40Y9cclxuICAgICAgICAgICAgLy8g0JfQsNC/0YPRgdC60LDQtdC8INCw0L3QuNC80LDRhtC40Y4g0LfQsNC90L7QstC+XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9zbGlkaW5nKCkpO1xyXG4gICAgICAgIH0sIHRoaXMuX3RpbWluZyAqIDEwMDApO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xyXG5pbXBvcnQgRm9ybSBmcm9tICcuLi91dGlscy9Gb3JtJ1xyXG5pbXBvcnQgSW5wdXRtYXNrIGZyb20gJ2lucHV0bWFzaydcclxuaW1wb3J0IFN3aXBlciBmcm9tICdzd2lwZXInO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uLCBQYWdpbmF0aW9uLCBHcmlkLCBBdXRvcGxheSwgRWZmZWN0Q3JlYXRpdmUgfSBmcm9tICdzd2lwZXIvbW9kdWxlcyc7XHJcbmltcG9ydCB7IHJlbSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cydcclxuaW1wb3J0IHsgRmFuY3lib3ggfSBmcm9tIFwiQGZhbmN5YXBwcy91aVwiO1xyXG5pbXBvcnQgV09XIGZyb20gJ3dvdy5qcyc7XHJcbmltcG9ydCBNYXJxdWVlIGZyb20gJy4uL3V0aWxzL01hcnF1ZWUnO1xyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgaW5pdFN3aXBlcnMoKVxyXG4gICAgaW5pdEZhbmN5Ym94KClcclxuICAgIGluaXRIZWFkaW5nVGV4dCgpXHJcbiAgICBpbml0V293KClcclxuICAgIGluaXRNYXJxdWUoKVxyXG4gICAgaW5pdEhlYWRlclN3aXBlcigpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBpbml0SGVhZGVyU3dpcGVyKCkge1xyXG4gICAgY29uc3QgdGFyZ2V0cyA9ICQoJy5oZWFkZXJfX2MtbmF2LWUnKVxyXG4gICAgaWYgKCF0YXJnZXRzKSByZXR1cm5cclxuICAgIHRhcmdldHMub24oJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xyXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdfaG92ZXInKVxyXG4gICAgfSlcclxuICAgIHRhcmdldHMub24oJ21vdXNlbGVhdmUnLCAoZSkgPT4ge1xyXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfaG92ZXInKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFN3aXBlcnMoKSB7XHJcbiAgICBjb25zdCBzd2lwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWNoaXZtZW50cycpXHJcbiAgICBpZiAoc3dpcGVyKSB7XHJcbiAgICAgICAgbmV3IFN3aXBlcihzd2lwZXIucXVlcnlTZWxlY3RvcignLnN3aXBlcicpLCB7XHJcbiAgICAgICAgICAgIG1vZHVsZXM6IFtFZmZlY3RDcmVhdGl2ZSwgQXV0b3BsYXldLFxyXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgICBlZmZlY3Q6ICdjcmVhdGl2ZScsXHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IHJlbSgzKSxcclxuICAgICAgICAgICAgaW5pdGlhbFNsaWRlOiAyLFxyXG4gICAgICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgIC8qICAgYXV0b3BsYXk6IHtcclxuICAgICAgICAgICAgICAgIGRlbGF5OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgcGF1c2VPbk1vdXNlRW50ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIH0sICovXHJcbiAgICAgICAgICAgIGNyZWF0aXZlRWZmZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogW1wiLTc1JVwiLCAzMCwgLTMwMF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IFtcIjc1JVwiLCAzMCwgLTMwMF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGltaXRQcm9ncmVzczogMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKiAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXHJcbiBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9LCAqL1xyXG5cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdEZhbmN5Ym94KCkge1xyXG4gICAgY29uc3QgYW55dGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZmFuY3lib3hdJylcclxuICAgIGlmICghYW55dGFyZ2V0KSByZXR1cm5cclxuXHJcbiAgICBGYW5jeWJveC5iaW5kKCdbZGF0YS1mYW5jeWJveF0nLCB7XHJcbiAgICAgICAgVGh1bWJzOiBmYWxzZSxcclxuICAgICAgICBhc3BlY3RSYXRpbzogdHJ1ZSxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICByZWFkeTogKGZhbmN5Ym94KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDQn9C+0LrQsNC30YvQstCw0LXQvCDQv9GA0LXQu9C+0LDQtNC10YAg0L/QtdGA0LXQtCDQt9Cw0LPRgNGD0LfQutC+0LlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWFkeScpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxvYWQ6IChmYW5jeWJveCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g0KHQutGA0YvQstCw0LXQvCDQv9GA0LXQu9C+0LDQtNC10YAg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdEhlYWRpbmdUZXh0KCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlYWRpbmdUZXh0JylcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgdGFyZ2V0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNoZWFkaW5nVGV4dERhdGEnKSxcclxuICAgICAgICBhcnJheSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaGVhZGluZ19fdGV4dC1saXN0JykudGV4dENvbnRlbnQuc3BsaXQoJy8nKSxcclxuICAgICAgICB3cml0ZVNwZWVkID0gMjAwLFxyXG4gICAgICAgIGRlbGV0ZVNwZWVkID0gMjAwLFxyXG4gICAgICAgIHdhaXRTcGVlZCA9IDEwMDBcclxuXHJcblxyXG5cclxuICAgIHByaW50KDAsIDApXHJcbiAgICBmdW5jdGlvbiBwcmludCh3b3JkLCBsZXR0ZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKGFycmF5W3dvcmRdW2xldHRlcl0pIHtcclxuICAgICAgICAgICAgdGFyZ2V0LnRleHRDb250ZW50ID0gdGFyZ2V0LnRleHRDb250ZW50ICsgYXJyYXlbd29yZF1bbGV0dGVyXVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHByaW50KHdvcmQsIGxldHRlciArIDEpXHJcbiAgICAgICAgICAgIH0sIHdyaXRlU3BlZWQgKyBsZXR0ZXIpO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRhcmdldC50ZXh0Q29udGVudC5sZW5ndGggPT0gYXJyYXlbd29yZF0ubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnRleHRDb250ZW50ID0gdGFyZ2V0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludCh3b3JkLCAtMSlcclxuICAgICAgICAgICAgICAgICAgICB9LCB3YWl0U3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC50ZXh0Q29udGVudCA9IHRhcmdldC50ZXh0Q29udGVudC5zbGljZSgwLCAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQod29yZCwgLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZGVsZXRlU3BlZWQpOyAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRhcmdldC50ZXh0Q29udGVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhcnJheVt3b3JkICsgMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQod29yZCArIDEsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgd3JpdGVTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludCgwLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHdyaXRlU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdFdvdygpIHtcclxuICAgIGNvbnN0IHdvdyA9IG5ldyBXT1coe1xyXG4gICAgICAgIGJveENsYXNzOiBcIndvd1wiLFxyXG4gICAgICAgIGFuaW1hdGVDbGFzczogXCJhbmltYXRlX19hbmltYXRlZFwiLFxyXG4gICAgICAgIG9mZnNldDogMTUwLFxyXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXHJcbiAgICAgICAgbGl2ZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgd293LmluaXQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdE1hcnF1ZSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYXJ0bmVyc19fbGlzdCcpXHJcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuXHJcbiAgICBjb250YWluZXIuZm9yRWFjaCgoYykgPT4gW1xyXG4gICAgICAgIG5ldyBNYXJxdWVlKGMsIDE4MClcclxuXHJcbiAgICBdKVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0ICcuL2luZGV4LnNjc3MnO1xyXG5cclxuaW1wb3J0ICcuL2pzL2NvbXBvbmVudHMvaGVhZGVyLmpzJ1xyXG5cclxuaW1wb3J0ICcuL2pzL2Rldi96YXR6LmpzJztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHQxNzk6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt3ZWJwYWNrX2V4YW1wbGVcIl0gPSBzZWxmW1wid2VicGFja0NodW5rd2VicGFja19leGFtcGxlXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbNTg4XSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDkwNyk7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbInJlbSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJib2R5TG9ja1N0YXR1cyIsImJvZHlVbmxvY2siLCJkZWxheSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRUaW1lb3V0Iiwic3R5bGUiLCJwYWRkaW5nUmlnaHQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJib2R5TG9jayIsImdldFNjcm9sbGJhcldpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGxXaXRoIiwiYWRkIiwiX3NsaWRlVXAiLCJ0YXJnZXQiLCJkdXJhdGlvbiIsInNob3dtb3JlIiwiY29udGFpbnMiLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvdmVyZmxvdyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiaGlkZGVuIiwicmVtb3ZlUHJvcGVydHkiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJfc2xpZGVEb3duIiwiX3NsaWRlVG9nZ2xlIiwiTWFycXVlZSIsImNvbnN0cnVjdG9yIiwiY29udGFpbmVyIiwidGltaW5nIiwicmV2ZXJzZSIsIl9jb250YWluZXIiLCJfdGltaW5nIiwiX2lzUmV2ZXJzZSIsIl9saXN0IiwiX3NsaWRlcyIsIkFycmF5IiwiZnJvbSIsImNoaWxkcmVuIiwiX2R1cGxpY2F0ZVNsaWRlcyIsIl9tYXhUcmFuc2xhdGUiLCJsYXN0RWxlbWVudENoaWxkIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsIndpZHRoIiwiX2FkZFNsaWRpbmciLCJ3dyIsImxhc3RFbFBvcyIsIm1pbldpZHRoIiwiYWRkQ291bnQiLCJNYXRoIiwiY2VpbCIsImkiLCJmb3JFYWNoIiwiZSIsImFwcGVuZCIsImNsb25lTm9kZSIsInRyYW5zZm9ybSIsIl9zbGlkaW5nIiwidHJhbnNpdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCIkIiwiRm9ybSIsIklucHV0bWFzayIsIlN3aXBlciIsIk5hdmlnYXRpb24iLCJQYWdpbmF0aW9uIiwiR3JpZCIsIkF1dG9wbGF5IiwiRWZmZWN0Q3JlYXRpdmUiLCJGYW5jeWJveCIsIldPVyIsImluaXRTd2lwZXJzIiwiaW5pdEZhbmN5Ym94IiwiaW5pdEhlYWRpbmdUZXh0IiwiaW5pdFdvdyIsImluaXRNYXJxdWUiLCJpbml0SGVhZGVyU3dpcGVyIiwidGFyZ2V0cyIsIm9uIiwiY3VycmVudFRhcmdldCIsInN3aXBlciIsIm1vZHVsZXMiLCJsb29wIiwiZWZmZWN0Iiwic2xpZGVzUGVyVmlldyIsImNlbnRlcmVkU2xpZGVzIiwic3BhY2VCZXR3ZWVuIiwiaW5pdGlhbFNsaWRlIiwic2xpZGVUb0NsaWNrZWRTbGlkZSIsImNyZWF0aXZlRWZmZWN0IiwicHJldiIsIm9wYWNpdHkiLCJ0cmFuc2xhdGUiLCJuZXh0IiwibGltaXRQcm9ncmVzcyIsImFueXRhcmdldCIsImJpbmQiLCJUaHVtYnMiLCJhc3BlY3RSYXRpbyIsInJlYWR5IiwiZmFuY3lib3giLCJsb2FkIiwiYXJyYXkiLCJ0ZXh0Q29udGVudCIsInNwbGl0Iiwid3JpdGVTcGVlZCIsImRlbGV0ZVNwZWVkIiwid2FpdFNwZWVkIiwicHJpbnQiLCJ3b3JkIiwibGV0dGVyIiwic2xpY2UiLCJ3b3ciLCJib3hDbGFzcyIsImFuaW1hdGVDbGFzcyIsIm9mZnNldCIsIm1vYmlsZSIsImxpdmUiLCJpbml0IiwicXVlcnlTZWxlY3RvckFsbCIsImMiXSwic291cmNlUm9vdCI6IiJ9