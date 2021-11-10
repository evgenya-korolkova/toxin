export class Like {
    constructor(block) {
        this.block = block

        this.getDOM()
        this.addListener()
    }

    getDOM() {
        this.button = this.block.querySelector('.like__button')
        this.counter = this.block.querySelector('.like__counter')
    }

    addListener() {
        // клик мыши (button)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.button.addEventListener('click', this.handleButtonClick)
    }

    handleButtonClick() {
        this.button.classList.toggle('like__button_liked')

        if (this.button.classList.contains('like__button_liked')) {
            this.counter.innerText = +this.counter.innerText + 1
        } else {
            this.counter.innerText = +this.counter.innerText - 1
        }
    }
}
