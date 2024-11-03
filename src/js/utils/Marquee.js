

export default class Marquee {
    constructor(container) {
        this._container = typeof container == 'string' ? document.querySelector(container) : container
        this._list = this._container.querySelector('.marquee')
        this._slides = Array.from(this._list.children)
        this._duplicateSlides()
    }
    _duplicateSlides() {
        const duplicateCount = 20

        for (let i = 0; i < duplicateCount; i++) {
            this._slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                this._list.append(clone); 
            });
        }
      
    }


}