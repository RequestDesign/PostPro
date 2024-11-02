import $ from 'jquery'
import Form from '../utils/Form'
import Inputmask from 'inputmask'
import Swiper from 'swiper';
import { Navigation, Pagination, Grid, Autoplay, EffectCreative } from 'swiper/modules';
import { rem } from '../utils/constants'
import { Fancybox } from "@fancyapps/ui";

$(function () {
    initSwipers()
    initFancybox()

})

function dropDowns() {
    const ddBtn = $('.drop-down-target')
    if (!ddBtn) return

    ddBtn.on('click', (e) => {
        e.preventDefault()
        e.currentTarget.classList.toggle('_opened')
        e.currentTarget.closest('.drop-down-container')
            .classList.toggle('_opened')
    })

}
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
function modalsHandler() {


    const modalOpeners = $('.modal-opener'),
        modalClosers = $('.modal-closer'),
        html = $('html')


    if (!modalOpeners || !modalClosers) return

    modalOpeners.on('click', (ev) => {
        const { modal } = ev.currentTarget.dataset

        $(`.modal-${modal}`)
            .fadeIn()
            .addClass('_opened')
        html.addClass('lock')
    })


    modalClosers.on('click', (ev) => {
        const { classList } = ev.target
        if (!classList.contains('modal-closer')) return

        if (classList.contains('modal')) {
            $(ev.target).fadeOut().removeClass('_opened')

        } else {
            $(ev.target.closest('.modal')).fadeOut().removeClass('_opened')

        }
        html.removeClass('lock')
    })
}

function initFancybox() {
    const anytarget = document.querySelector('[data-fancybox]')
    if (!anytarget) return

    Fancybox.bind('[data-fancybox]', {
        Thumbs: false,
        Toolbar: {
            display: {
                left: [],
                middle: [
                    "infobar",
                    "zoomIn",
                    "zoomOut",
                ],
                right: ["close"],
            },
        },
    })
}

