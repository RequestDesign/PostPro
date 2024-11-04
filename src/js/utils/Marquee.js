

export default class Marquee {
    constructor(container) {
        this._container = typeof container == 'string' ? document.querySelector(container) : container
        this._list = this._container.querySelector('.marquee')
        this._slides = Array.from(this._list.children)
        this._duplicateSlides()
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
            ww = window.innerWidth - 10

        setInterval(() => {
            step = step + 0.2
            this._list.style.transform = `translateX(-${step}px)`

            if (lastSlide.getBoundingClientRect().left < ww) {
                lastAppendSlide++
                lastSlide = this._list.lastElementChild
                lastSlideNode = this._list.childNodes[lastAppendSlide]
                this._list.append(lastSlideNode.cloneNode(true));
            }

        }, 0);




    }



}