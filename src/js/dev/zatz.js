import $ from 'jquery'
import Form from '../utils/Form'
import Inputmask from 'inputmask'
import Swiper from 'swiper';
import { Navigation, Pagination, Grid, Autoplay, EffectCreative } from 'swiper/modules';
import { rem } from '../utils/constants'
import { Fancybox } from "@fancyapps/ui";
import WOW from 'wow.js';
import Marquee from '../utils/Marquee';


$(function () {
    initSwipers()
    initFancybox()
    initHeadingText()
    initWow()
    initMarque()
    initHeaderSwiper()
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

function initSwipers() {
    const swiper = document.querySelector('.achivments')
    if (swiper) {
        new Swiper(swiper.querySelector('.swiper'), {
            modules: [EffectCreative, Autoplay],
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
                    translate: ["-75%", 30, -300],
                },
                next: {
                    opacity: 0.5,
                    translate: ["75%", 30, -300],
                },
                limitProgress: 2
            },
            /*  breakpoints: {
                 768: {
                     slidesPerView: 1,
                     slidesPerGroup: 1,
 
                 }
             }, */


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
        writeSpeed = 200,
        deleteSpeed = 200,
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
                if(target.textContent.length == array[word].length){
                    setTimeout(() => {
                        target.textContent = target.textContent.slice(0, -1)
                        print(word, -1)
                    }, waitSpeed);
                }else{
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
    const wow = new WOW({
        boxClass: "wow",
        animateClass: "animate__animated",
        offset: 150,
        mobile: false,
        live: true,
    });
    wow.init();
}

function initMarque() {
    const container = document.querySelectorAll('.partners__list')
    if (!container) return
    container.forEach((c) => [
        new Marquee(c, 180)

    ])
}


