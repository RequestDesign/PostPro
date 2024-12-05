/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 907:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(755);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
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
  initHeader();
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
function initHeader() {
  const header = jquery_default()('.header'),
    headerOpener = header.find('.header__c-btn'),
    headerLinks = header.find('.header__c-nav-e'),
    html = jquery_default()('html');
  headerOpener.on('click', () => {
    if (!header.hasClass('_opened')) {
      html.addClass('lock');
      header.addClass('_opened');
    } else {
      html.removeClass('lock');
      header.removeClass('_opened');
    }
  });
  headerLinks.on('click', () => {
    html.removeClass('lock');
    header.removeClass('_opened');
  });
  let startTouch = 0;
  header.on('touchstart', e => {
    console.log(e.touches[0].clientY);
    startTouch = e.touches[0].clientY;
  });
  header.on('touchend', e => {
    console.log(e.originalEvent.changedTouches[0].clientY);
    if (e.originalEvent.changedTouches[0].clientY < startTouch - 50) {
      html.removeClass('lock');
      header.removeClass('_opened');
    }
    startTouch = 0;
  });
}
function initSwipers() {
  const swiper = document.querySelector('.achivments');
  if (swiper) {
    const config = {
      translateY: () => {
        return window.innerWidth > 768 ? 30 : 15;
      }
    };
    new swiper_swiper/* default */.Z(swiper.querySelector('.swiper'), {
      modules: [modules/* EffectCreative */.gI, modules/* Autoplay */.pt],
      loop: true,
      effect: 'creative',
      slidesPerView: 2.1,
      centeredSlides: true,
      spaceBetween: rem(3),
      initialSlide: 2,
      slideToClickedSlide: true,
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true
      },
      creativeEffect: {
        prev: {
          opacity: 0.15,
          translate: ["-75%", config.translateY(), -300]
        },
        next: {
          opacity: 0.15,
          translate: ["75%", config.translateY(), -300]
        },
        limitProgress: 2
      },
      breakpoints: {
        768: {
          slidesPerView: 3
        }
      }
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
    writeSpeed = 100,
    deleteSpeed = 50,
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [251], function() { return __webpack_require__(907); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;