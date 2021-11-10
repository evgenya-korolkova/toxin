export class Rate {
    constructor(block) {
        this.block = block
        this.rate = this.block.dataset.rate
        this.enabled = this.block.classList.contains('rate_enabled')

        if (this.enabled) {
            this.getDOM()
            this.addListener()
        }
    }

    getDOM() {
        this.stars = this.block.querySelectorAll('.rate__star')
    }

    addListener() {
        // клик мыши (star)
        this.handleStarClick = this.handleStarClick.bind(this)
        this.stars.forEach((item) => {
            item.addEventListener('click', this.handleStarClick)
        })
    }

    handleStarClick(e) {
        const rate = e.currentTarget.dataset.rate
        // записать рейтинг
        this.block.dataset.rate = rate
        // отобразить рейтинг
        this.stars.forEach((item) => {
            if (item.dataset.rate <= rate){
                item.classList.add('rate__star_active')
            } else {
                item.classList.remove('rate__star_active')
            }
        })
    }
}
