import $ from 'jquery'
import Swiper from 'swiper';
import { Navigation, Pagination, Grid, Autoplay, EffectCreative } from 'swiper/modules';
import { rem } from '../utils/constants'
import { Fancybox } from "@fancyapps/ui";
import WOW from 'wow.js';
import Marquee from '../utils/Marquee';
import gsap from 'gsap';
import { ScrollTrigger, } from 'gsap/src/ScrollTrigger';
import { TextPlugin } from 'gsap/src/TextPlugin';
import CSSRulePlugin from 'gsap/all';
import Typed from 'typed.js';

$(function () {
    window.scrollTo({ top: 0 })
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
            el.querySelector('.about__c-right-tags-e-wrp-text-el')
                .style.width = el.closest('.about__c-right-tags').getBoundingClientRect().width + 'px'
            el.addEventListener('click', (ev) => {
                const container = ev.currentTarget.closest('.about__c-right-tags').getBoundingClientRect(),
                    wrp = ev.currentTarget.querySelector('.about__c-right-tags-e-wrp'),
                    text = ev.currentTarget.querySelector('.about__c-right-tags-e-wrpText')

                if (!ev.currentTarget.classList.contains('_opened')) {

                    //actual

                    const { width, height, left, top } = el.getBoundingClientRect()
                    el.style.zIndex = '5'


                    wrp.style.width = container.width + 'px'
                    wrp.style.left = (container.left - left) + 'px'
                    wrp.style.top = (container.top - top) + 'px'
                    wrp.style.height = container.height + 'px'


                    text.style.transform = `translate(${(container.left - left)}px, ${(container.top - top)}px)`
                    ev.currentTarget.classList.add('_opened')

                } else {


                    const { width, height, left, top } = el.getBoundingClientRect()
                    setTimeout(() => {
                        el.style.zIndex = '1'
                    }, 600);


                    wrp.style.width = '100%'
                    wrp.style.left = '0px'
                    wrp.style.top = '0px'
                    wrp.style.height = '100%'


                    text.style.transform = `translate(0px, 0px)`
                    ev.currentTarget.classList.remove('_opened')

                }


            })

            el.addEventListener('mouseleave', (ev) => {
                const container = ev.currentTarget.closest('.about__c-right-tags').getBoundingClientRect(),
                    wrp = ev.currentTarget.querySelector('.about__c-right-tags-e-wrp'),
                    text = ev.currentTarget.querySelector('.about__c-right-tags-e-wrpText')

                const { width, height, left, top } = el.getBoundingClientRect()
                setTimeout(() => {
                    el.style.zIndex = '1'
                }, 600);


                wrp.style.width = '100%'
                wrp.style.left = '0px'
                wrp.style.top = '0px'
                wrp.style.height = '100%'


                text.style.transform = `translate(0px, 0px)`
                ev.currentTarget.classList.remove('_opened')
            })
            if (window.innerWidth < 768) {
                let canWork = true
                document.addEventListener('scroll', (ev) => {
                    if (!canWork) return
                    canWork = false

                    setTimeout(() => {
                        canWork = true
                    }, 1000);

                    const t = document.querySelector('.about__c-right-tags-e._opened')
                    if (t) {
                        const container = t.closest('.about__c-right-tags').getBoundingClientRect(),
                            wrp = t.querySelector('.about__c-right-tags-e-wrp'),
                            text = t.querySelector('.about__c-right-tags-e-wrpText')

                        const { width, height, left, top } = el.getBoundingClientRect()
                        setTimeout(() => {
                            el.style.zIndex = '1'
                        }, 600);


                        wrp.style.width = '100%'
                        wrp.style.left = '0px'
                        wrp.style.top = '0px'
                        wrp.style.height = '100%'


                        text.style.transform = `translate(0px, 0px)`
                        t.classList.remove('_opened')
                    }
                })
            }



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
            modules: [EffectCreative, Autoplay, Navigation],
            loop: true,
            effect: 'creative',
            slidesPerView: 2.2,
            centeredSlides: true,
            spaceBetween: rem(3),
            initialSlide: 2,
            speed: 500,
            followFinger: true,
            /*  slideToClickedSlide: true, */
            navigation: {
                prevEl: swiper.querySelector('.swiper-btn-prev'),
                nextEl: swiper.querySelector('.swiper-btn-next'),
            },
            autoplay: {
                delay: 2000,
                pauseOnMouseEnter: true,
                /*  disableOnInteraction: true, */
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
            on: {
                init: (s) => {
                    let mouseOver = false
                    const next = swiper.querySelector('.swiper-btn-next'),
                        prev = swiper.querySelector('.swiper-btn-prev')
                    function slide(foo) {
                        if (mouseOver) {
                            foo()
                            setTimeout(() => {
                                slide(foo)
                            }, 0);

                        }
                    }
                    next.addEventListener('mouseenter', () => {
                        mouseOver = true
                        s.autoplay.pause()
                        slide(() => s.slideNext())

                    })
                    next.addEventListener('mouseleave', () => {
                        mouseOver = false
                    })
                    prev.addEventListener('mouseenter', () => {
                        mouseOver = true
                        s.autoplay.pause()
                        slide(() => s.slidePrev())

                    })
                    prev.addEventListener('mouseleave', () => {
                        mouseOver = false
                    })
                }
            }


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
    /* const wow = new WOW({
        boxClass: "wow",
        animateClass: "animate__animated",
        offset: 150,
        mobile: false,
        live: true,
    });
    wow.init(); */
    if (window.innerWidth < 768) {
        document.querySelectorAll('.animate__heading')
            .forEach((e) => {
                e.textContent = e.dataset.typed
            })
        return
    }
    const scrollCfg = {
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse',
        once: false,
    }
    gsap.defaults({ duration: .5, ease: 'none' });
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);


    /*---------------animate__heading--------------  */
    gsap.registerEffect({
        name: 'heading',
        effect: (targets, config, pst) => {
            return gsap.fromTo(
                targets,
                { opacity: 0, translateX: '-105%', visibility: 'hidden' },
                {
                    opacity: 1,
                    translateX: '0%',
                    visibility: 'visible',
                    duration: 1,
                    delay: .5,
                    ease: 'sine.inOut',
                }
            );
        },
        extendTimeline: true
    });
    document.querySelectorAll('.animate__heading')
        .forEach((el) => {
            const tl = gsap.timeline({ paused: true })

            tl.to(el, {
                duration: 1,
                text: { value: el.dataset.typed }, // Анимация текста
                ease: 'none'
            }).reverse();

            ScrollTrigger.create({
                trigger: el,
                ...scrollCfg,
                onEnter: () => {
                    tl.play()

                },/* 
                onEnterBack: () => {
                  tl.play()

                },
                onLeave: () => {
                    tl.reverse()

                },
                onLeaveBack: () => {
                     tl.reverse()
                }, */
                // markers: true, // Показываем маркеры для тестирования (удалить в продакшене)
            });
        })
    /*---------------animate__heading--------------  */

    /*---------------animate__fadeInUp--------------  */
    document.querySelectorAll('.animate__fadeInUp')
        .forEach((el) => {
            const tl = gsap.timeline()
            gsap.set(el, {
                opacity: 0,
                transform: 'translateY: 105%'
            });

            ScrollTrigger.create({
                trigger: el,
                ...scrollCfg,
                onEnter: () => {
                    tl.clear();
                    tl.fromTo(
                        el,
                        { translateY: '110%' },
                        {
                            translateY: '0%',
                            duration: 1.5,
                            ease: 'power1.inOut'
                        } // Указывает, что эта анимация должна начаться одновременно с предыдущей
                    );
                    tl.fromTo(
                        el,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 1,
                            ease: 'power1.inOut'
                        },
                        '<'
                    ).play();
                },
                onEnterBack: () => {
                    tl.clear();
                    tl.fromTo(el, {
                        opacity: 0,
                        translateY: '-105%',
                    }, {
                        opacity: 1,
                        translateY: '0%',
                        duration: 0.5,
                    }).play();
                },
                onLeave: () => {
                    tl.clear();
                    tl.fromTo(el, {
                        opacity: 1,
                        translateY: '0%',
                    }, {
                        opacity: 0,
                        translateY: '-105%',
                        duration: 0.5,
                    }).play();
                },
                onLeaveBack: () => {
                    tl.clear();
                    tl.fromTo(el, {
                        opacity: 1,
                        translateY: '0%',
                    }, {
                        opacity: 0,
                        translateY: '105%',
                        duration: 0.5,
                    }).play();


                },
                //markers: true, // Показываем маркеры для тестирования (удалить в продакшене)
            });
        })

    /*---------------animate__fadeInUp--------------  */

    /*---------------animate__fadeIn--------------  */
    gsap.registerEffect({
        name: 'animate__fadeIn',
        effect: (targets, config, pst) => {
            return gsap.fromTo(
                targets,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: config.duration ? config.duration : 1,
                    delay: config.delay ? config.delay : 0,
                    ease: 'none',
                }
            );
        },
        extendTimeline: true
    });
    document.querySelectorAll('.animate__fadeIn')
        .forEach((el) => {
            const tl = gsap.timeline()
                .animate__fadeIn(el, {});
            tl.reverse()
            ScrollTrigger.create({
                trigger: el,
                ...scrollCfg,
                onEnter: () => {
                    tl.play();
                },
                onEnterBack: () => {
                    tl.play();
                },
                onLeave: () => {
                    tl.reverse();
                },
                onLeaveBack: () => {
                    tl.reverse();
                },
                // markers: true, // Показываем маркеры для тестирования (удалить в продакшене)
            });
        })
    /*---------------animate__fadeIn--------------  */

    /*---------------animate__fadeInLeft--------------  */
    gsap.registerEffect({
        name: 'animate__fadeInLeft',
        effect: (targets, config, pst) => {
            return gsap.fromTo(
                targets,
                { opacity: 0, translateX: '-105%' },
                {
                    opacity: 1,
                    translateX: '0',
                    duration: config.duration ? config.duration : 1,
                    delay: config.delay ? config.delay : 0,
                    ease: 'power1.inOut'
                }
            );
        },
        extendTimeline: true
    });
    document.querySelectorAll('.animate__fadeInLeft')
        .forEach((el) => {
            const tl = gsap.timeline()
                .animate__fadeInLeft(el, {});
            tl.reverse()
            ScrollTrigger.create({
                trigger: el,
                ...scrollCfg,
                onEnter: () => {
                    tl.play();
                },
                onEnterBack: () => {
                    tl.play();
                },
                onLeave: () => {
                    tl.reverse();
                },
                onLeaveBack: () => {
                    tl.reverse();
                },
                //markers: true, // Показываем маркеры для тестирования (удалить в продакшене)
            });
        })
    /*---------------animate__fadeInLeft--------------  */

    /*---------------animate__fadeInRight--------------  */
    gsap.registerEffect({
        name: 'animate__fadeInRight',
        effect: (targets, config, pst) => {
            return gsap.fromTo(
                targets,
                { opacity: 0, translateX: '105%' },
                {
                    opacity: 1,
                    translateX: '0',
                    duration: config.duration ? config.duration : 1,
                    delay: config.delay ? config.delay : 0,
                    ease: 'power1.inOut'
                }
            );
        },
        extendTimeline: true
    });
    document.querySelectorAll('.animate__fadeInRight')
        .forEach((el) => {
            const tl = gsap.timeline()
                .animate__fadeInRight(el, {});
            tl.reverse()
            ScrollTrigger.create({
                trigger: el,
                ...scrollCfg,
                onEnter: () => {
                    tl.play();
                },
                onEnterBack: () => {
                    tl.play();
                },
                onLeave: () => {
                    tl.reverse();
                },
                onLeaveBack: () => {
                    tl.reverse();
                },
                //markers: true, // Показываем маркеры для тестирования (удалить в продакшене)
            });
        })
    /*---------------animate__fadeInRight--------------  */
}

function initMarque() {
    const container = document.querySelectorAll('.partners__list')
    if (!container) return
    container.forEach((c, i) => {
        new Swiper(c, {
            modules: [Autoplay],
            speed: 3000,
            slidesPerView: 'auto',
            loop: true,
            allowTouchMove: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: true // отключаем возможность отлючить анимацию при касании
            },
            breakpoints: {
                769: {
                    speed: 4000,
                    slidesPerView: 'auto',
                    loop: true,
                    allowTouchMove: false,
                    autoplay: {
                        delay: 0,
                        disableOnInteraction: false // отключаем возможность отлючить анимацию при касании
                    }
                }
            }
        })


    })
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