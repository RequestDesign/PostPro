import $ from 'jquery'
import Swiper from 'swiper';
import { Navigation, Pagination, Grid, Autoplay, EffectCreative } from 'swiper/modules';
import { rem } from '../utils/constants'
import { Fancybox } from "@fancyapps/ui";
import WOW from 'wow.js';
import Marquee from '../utils/Marquee';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/src/ScrollTrigger';


$(function () {
    initSwipers()
    initFancybox()
    initHeadingText()
    initWow()
    initMarque()
    initHeaderSwiper()
    initHeader()
    /*    initVideos() */
    $('html').addClass('_page-loaded')


    document.querySelectorAll('.about__c-right-tags-e')
        .forEach((el) => {
            /**
             *   height: number;
                width: number;
                x: number;
                y: number;
                bottom: number;
                left: number;
                right: number;
                top: number;
                */




            /*  wrp.style.width = width + 'px'
            wrp.style.height = height + 'px'
            wrp.style.left = (x - container.x) + 'px'
            wrp.style.top = (y - container.y + height + height)  + 'px' */
            el.querySelector('.about__c-right-tags-e-wrp-text-el')
                .style.width = el.closest('.about__c-right-tags').getBoundingClientRect().width + 'px'
            el.addEventListener('click', (ev) => {
                if (!ev.currentTarget.classList.contains('_opened')) {

                    //prev
                    const prev = ev.currentTarget.closest('.about__c-right-tags').querySelector('._opened')
                    if (prev) {
                        prev.style.zIndex = '2'
                        prev.classList.remove('_opened')
                        const wrpPrev = prev.querySelector('.about__c-right-tags-e-wrp')
                        wrpPrev.style.width = '100%'
                        wrpPrev.style.left = '0'
                        wrpPrev.style.maxHeight = '100%'
                        setTimeout(() => {
                            prev.style.zIndex = '1'
                        }, 500);
                    }

                    //actual
                    const container = ev.currentTarget.closest('.about__c-right-tags').getBoundingClientRect()
                    const { width, height, left, top } = el.getBoundingClientRect()
                    el.style.zIndex = '5'

                    const wrp = ev.currentTarget.querySelector('.about__c-right-tags-e-wrp')
                    wrp.style.width = container.width + 'px'
                    wrp.style.left = (container.left - left) + 'px'
                    wrp.style.maxHeight = '100dvh'



                    ev.currentTarget.classList.add('_opened')
                } else {
                    const prev = ev.currentTarget
                    if (prev) {
                        prev.classList.remove('_opened')
                        const wrpPrev = prev.querySelector('.about__c-right-tags-e-wrp')
                        wrpPrev.style.width = '100%'
                        wrpPrev.style.left = '0'
                        wrpPrev.style.maxHeight = '100%'

                        setTimeout(() => {
                            prev.style.zIndex = '1'
                        }, 500);

                    }

                }


            })




        })

})

function initHeaderSwiper() {
    const targets = $('.header__c-nav-e')
    if (!targets) return
    targets.on('mouseenter', (e) => {
        e.currentTarget.classList.add('_hover')
    })
    targets.on('mouseleave', (e) => {
        e.currentTarget.classList.remove('_hover')
    })
}
function initHeader() {
    const header = $('.header'),
        headerOpener = header.find('.header__c-btn'),
        headerLinks = header.find('.header__c-nav-e'),
        html = $('html')


    headerOpener.on('click', () => {
        if (!header.hasClass('_opened')) {
            html.addClass('lock')
            header.addClass('_opened')
        } else {
            html.removeClass('lock')
            header.removeClass('_opened')
        }
    })
    headerLinks.on('click', () => {
        html.removeClass('lock')
        header.removeClass('_opened')
    })

    let startTouch = 0
    header.on('touchstart', (e) => {

        startTouch = e.touches[0].clientY
    })
    header.on('touchend', (e) => {
        if (e.originalEvent.changedTouches[0].clientY < startTouch - 50) {
            html.removeClass('lock')
            header.removeClass('_opened')
        }
        startTouch = 0
    })



}

function initSwipers() {
    const swiper = document.querySelector('.achivments')
    if (swiper) {
        const config = {
            translateY: () => { return window.innerWidth > 768 ? 30 : 15 }
        }
        new Swiper(swiper.querySelector('.swiper'), {
            modules: [EffectCreative, Autoplay],
            loop: true,
            effect: 'creative',
            slidesPerView: 2,
            centeredSlides: true,
            spaceBetween: rem(3),
            initialSlide: 2,
            speed: 500,
            followFinger: true,
            /*   slideToClickedSlide: true, */

            autoplay: {
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: true,
            },
            creativeEffect: {
                prev: {
                    opacity: 0.15,
                    translate: ["-75%", config.translateY(), -300],
                },
                next: {
                    opacity: 0.15,
                    translate: ["75%", config.translateY(), -300],
                },
                limitProgress: 2
            },
            breakpoints: {
                768: {
                    followFinger: false,
                    slidesPerView: 3
                }
            },


        })

    }

}


function initFancybox() {
    const anytarget = document.querySelector('[data-fancybox]')
    if (!anytarget) return

    Fancybox.bind('[data-fancybox]', {
        Thumbs: false,
        aspectRatio: true,
        on: {
            ready: (fancybox) => {
                // Показываем прелоадер перед загрузкой
                console.log('ready')
            },
            load: (fancybox) => {
                // Скрываем прелоадер после загрузки
                console.log('load');
            },
        },
    })
}


function initHeadingText() {
    const container = document.querySelector('#headingText')

    if (!container) return

    const target = container.querySelector('#headingTextData'),
        array = container.querySelector('.heading__text-list').textContent.split('/'),
        writeSpeed = 100,
        deleteSpeed = 50,
        waitSpeed = 1000



    print(0, 0)
    function print(word, letter) {

        if (array[word][letter]) {
            target.textContent = target.textContent + array[word][letter]
            setTimeout(() => {
                print(word, letter + 1)
            }, writeSpeed + letter);


        } else {

            if (target.textContent) {
                if (target.textContent.length == array[word].length) {
                    setTimeout(() => {
                        target.textContent = target.textContent.slice(0, -1)
                        print(word, -1)
                    }, waitSpeed);
                } else {
                    setTimeout(() => {
                        target.textContent = target.textContent.slice(0, -1)
                        print(word, -1)
                    }, deleteSpeed);
                }

            } else if (!target.textContent) {

                if (array[word + 1]) {
                    setTimeout(() => {
                        print(word + 1, 0)
                    }, writeSpeed);
                } else {
                    setTimeout(() => {
                        print(0, 0)
                    }, writeSpeed);
                }

                return

            }



        }

    }

}


function initWow() {
     /*  const wow = new WOW({
          boxClass: "wow",
          animateClass: "animate__animated",
          offset: 150,
          mobile: false,
          live: true,
      });
      wow.init(); */

    gsap.defaults({ duration: .5 });
    gsap.registerPlugin(ScrollTrigger);

    gsap.registerEffect({
        name: 'fadeIn',
        effect: (targets, config, pst) => {
            return gsap.fromTo(
                targets,
                { opacity: 0, visibility: 'hidden' },
                { opacity: 1, visibility: 'visible', ...config },
                pst ? { position: pst } : null
            );
        },
        extendTimeline: true
    });


    /* Timeline */
    const tl = gsap.timeline()
        .fadeIn('.section-heading > h2', {
            onStart: () => {
                console.log('Animation started');
            },
            onComplete: () => {
                console.log('Animation completed');
            }
        });
    tl.reverse()
    ScrollTrigger.create({
        trigger: '.section-heading > h2',
        start: 'top 70%', // Начинаем анимацию при достижении 70% от верха
        end: 'top 10%',   // Заканчиваем анимацию при достижении 10% от верха
        toggleActions: 'play none none reverse', // Определяет поведение анимации в зависимости от направления прокрутки
        onEnter: () => {
            console.log('start');
            tl.play();
        },
        onEnterBack: () => {
            console.log('start');
            tl.play();
        },
        onLeave: () => {
            console.log('end');
            tl.reverse();
        },
        onLeaveBack: () => {
            console.log('end');
            tl.reverse();
        },
        markers: true, // Показываем маркеры для тестирования (удалить в продакшене)
    });
    /*  */

}

function initMarque() {
    const container = document.querySelectorAll('.partners__list')
    if (!container) return
    container.forEach((c) => [
        new Marquee(c, 180)

    ])
}


function initVideos() {
    const vidos = document.querySelectorAll('.heading__main');
    if (vidos) {
        vidos.forEach((el) => {
            const video = el.querySelector('video'),
                placeholder = el.querySelector('img')
            if (!video || !placeholder) return
            if (placeholder) {

                video.addEventListener('canplay', () => {
                    placeholder.style.display = 'none';
                    video.style.display = 'flex';
                })
            }

        })

    }
}