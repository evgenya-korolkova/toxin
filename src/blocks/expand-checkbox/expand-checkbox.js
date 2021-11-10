export class ExpandCheckbox {
    constructor(block) {
        this.block = block

        this.getDOM()
        this.addListener()
    }

    getDOM() {
        this.checkbox = this.block.querySelector('.expand-checkbox__checkbox')
        this.title = this.block.querySelector('.expand-checkbox__title')
    }

    addListener() {
        // клик мыши, Enter (title)
        this.handleTitleClick = this.handleTitleClick.bind(this)
        this.title.addEventListener('click', this.handleTitleClick)
    }

    handleTitleClick() {
        this.checkbox.classList.toggle('expand-checkbox__checkbox_hidden') // показать/скрыть checkbox
        this.title.classList.toggle('expand-checkbox__title_rotated') // повернуть стрелку
    }
}
