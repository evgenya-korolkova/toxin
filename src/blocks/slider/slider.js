import noUiSlider from 'nouislider';

export class Slider {
    constructor(block) {
        this.block = block
        
        this.options = JSON.parse(this.block.dataset.options)
        this.options.connect = true

        this.getDOM()
        this.initSlider()
    }

    getDOM() {
        this.slider = this.block.querySelector('.slider__slider')
        this.tooltip = this.block.querySelector('.slider__tooltip')
    }

    initSlider() {
        noUiSlider.create(this.slider, this.options);

        this.slider.noUiSlider.on('update', (values) => {
            this.tooltip.innerHTML = `${(+values[0]).toLocaleString('ru-RU')}&#8381; - ${(+values[1]).toLocaleString('ru-RU')}&#8381;`
        })
    }
}
