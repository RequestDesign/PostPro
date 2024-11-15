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

})


function initSwipers() {
    const swiper = document.querySelector('.achivments')
    if (swiper) {
        new Swiper(swiper.querySelector('.swiper'), {
            modules: [EffectCreative],
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
        array = container.querySelector('.heading__text-list').textContent.split('/')



    print(0, 0)
    function print(word, letter) {

        if (array[word][letter]) {
            target.textContent = target.textContent + array[word][letter]
            setTimeout(() => {
                print(word, letter + 1)
            }, 500 + letter);


        } else {

            if (target.textContent) {
                setTimeout(() => {
                    target.textContent = target.textContent.slice(0, -1)
                    print(word, -1)
                }, 200);
            } else if (!target.textContent) {

                if (array[word + 1]) {
                    setTimeout(() => {
                        print(word + 1, 0)
                    }, 500);
                } else {
                    setTimeout(() => {
                        print(0, 0)
                    }, 500);
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


function achivActions() {

}
