export class Dropdown {
    constructor(block) {
        this.block = block
        this.type = block.dataset.type
        this.data = JSON.parse(block.dataset.data)

        this.getDOM()

        this.addListener()

        this.fillItemValue()
        this.fillInputValue()
        this.setBtnStatus()
    }

    getDOM() {
        this.input = this.block.querySelector('.dropdown__input')
        this.label = this.block.querySelector('.dropdown__label')

        this.dropdown = this.block.querySelector('.dropdown__dropdown')

        this.btns = this.block.querySelectorAll('.dropdown__list-item-button')
        this.values = this.block.querySelectorAll('.dropdown__list-item-value')

        this.btnApply = this.block.querySelector('.dropdown__button-apply')
        this.btnClean = this.block.querySelector('.dropdown__button-clean')
    }

    addListener() {
        // клик мыши, Enter (input)
        this.handleInputClick = this.handleInputClick.bind(this)
        this.input.addEventListener('click', this.handleInputClick)
       
        // Esc (block)
        this.handleBlockEsc = this.handleBlockEsc.bind(this)
        this.block.addEventListener('keydown', this.handleBlockEsc)

        // потеря фокуса (block)
        this.handleBlockFocusOut = this.handleBlockFocusOut.bind(this)
        this.block.addEventListener('focusout', this.handleBlockFocusOut)

        // переопределение поведения label
        this.handleLabelClick = this.handleLabelClick.bind(this)
        this.label.addEventListener('click', this.handleLabelClick)

        // ----------------------------------------------------------------------

        // клик мыши, Enter (кноки '+' / '-')
        this.handleBtnValueClick = this.handleBtnValueClick.bind(this)
        this.btns.forEach((item) => {
            item.addEventListener('click', this.handleBtnValueClick)
        })

        //  клик мыши, Enter (кнопка Очистить)
        //  клик мыши, Enter (кнопка Применить)
        if (this.type === 'guests') {
            // кнопка Очистить
            this.handleBtnCleanClick = this.handleBtnCleanClick.bind(this)
            this.btnClean.addEventListener('click', this.handleBtnCleanClick)
            // кнопка Применить
            this.handleBtnApplyClick = this.handleBtnApplyClick.bind(this)
            this.btnApply.addEventListener('click', this.handleBtnApplyClick)
        }
    }

    handleInputClick() {
        this.toggle() // показать/скрыть выпад.список
    }

    handleBlockEsc(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.input.focus()
            this.close() // скрыть выпад.список
        }
    }

    handleBlockFocusOut(e) {
        // console.log('FOCUSOUT -> ' + e.relatedTarget)
        const isOutBlock = e.relatedTarget === null || (!e.relatedTarget.closest('.dropdown_open'))
        if (isOutBlock && this.isOpen) {
            this.close() // скрыть выпад.список
        }
    }

    handleLabelClick(e) {
        this.input.focus()
        e.preventDefault()
    }

    handleBtnValueClick(e) {
        const btn = e.currentTarget
        const btnType = btn.innerText
        const value = btn.parentNode.querySelector('.dropdown__list-item-value')
        const key = btn.dataset.key

        if (btnType === '+') {
            value.innerText = +value.innerText + 1
            if (value.innerText === '1') { // переход 0 -> 1
                this.setBtnStatus()
            }
        } else {
            value.innerText = +value.innerText - 1
            if (value.innerText === '0') { // переход 1 -> 0
                // переместить фокус на соседнюю кнопку '+'
                value.nextElementSibling.focus()
                this.setBtnStatus()
            }
        }

        if (this.type === 'rooms') {
            this.data[key] = value.innerText
            this.fillInputValue()
        }
    }

    handleBtnCleanClick() {
        this.values.forEach(function(item) {
            item.innerText = 0
            // убрать фокус с кнопки Очистить, иначе будет потеря фокуса(-> null) и сработает условие закрытия вып. списка
            item.nextElementSibling.focus()
        })
        this.setBtnStatus()
    }

    handleBtnApplyClick() {
        this.values.forEach((item) => {
            this.data[item.dataset.key] = item.innerText
        })
        this.fillInputValue()
    }

    get isOpen() {
        return this.block.classList.contains('dropdown_open')
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.block.classList.add('dropdown_open')

        // при показе списка восстановить значения из data (для гостей м.б. не совпадение, когда данне изменили, а Применить не нажали)
        if (this.type === 'guests') {
            this.fillItemValue()
            this.setBtnStatus()
        }
    }

    close() {
        this.block.classList.remove('dropdown_open')
        // console.log('close DROPDOWN')
    }

    fillItemValue() {
        for (let key in this.data) {
            const value = this.dropdown.querySelector('.dropdown__list-item-value[data-key="' + key + '"]')
            if (value) {
                value.innerText = this.data[key]
            }
        }
    }

    fillInputValue() {
        let value = ''
        let count = 0

        if (this.type === 'guests') {
            for (let key in this.data) {
                count = count + +this.data[key]
            }

            value = 'Сколько гостей'

            if (count === 1) {
                value = count + ' гость'
            } else if ((count >= 2) && (count <= 4)) {
                value = count + ' гостя'
            } else if (count > 4) {
                value = count + ' гостей'
            }
        } // if (this.type === 'guests')

        if (this.type === 'rooms') {
            for (let key in this.data) {
                count = +this.data[key]

                let str = ''

                if (key === 'спальни') {
                    if (count === 1) {
                        str = count + ' спальня'
                    } else if ((count >= 2) && (count <= 4)) {
                        str = count + ' спальни'
                    } else if (count > 4) {
                        str = count + ' спален'
                    }

                } else if (key === 'кровати') {
                    if (count === 1) {
                        str = count + ' кровать'
                    } else if ((count >= 2) && (count <= 4)) {
                        str = count + ' кровати'
                    } else if (count > 4) {
                        str = count + ' кроватей'
                    }

                } else if (key === 'ванные комнаты') {
                    if (count === 1) {
                        str = count + ' ванная комната'
                    } else if ((count >= 2) && (count <= 4)) {
                        str = count + ' ванные комнаты'
                    } else if (count > 4) {
                        str = count + ' ванных комнат'
                    }
                }

                if (str != '') {
                    value = (value === '') ? str : value + ', ' + str
                }

            } // for (let key in data)

            if (value === '') {
                value = 'Сколько комнат'
            }

            // после 2-ой запятой все удалить и поставить ...

        } // if (this.type === 'rooms') 

        this.input.innerText = value
    }

    setBtnStatus() {
        let count = 0

        this.values.forEach(function(item) {
            count = count + +item.innerText

            // кнопка '-'
            const btn = item.previousElementSibling
            
            if (+item.innerText > 0) {
                btn.classList.remove('dropdown__list-item-button_disable')
                btn.tabIndex = '0'
            } else {
                btn.classList.add('dropdown__list-item-button_disable')
                btn.tabIndex = '-1'
            }
        })

        // кнопка Очистить
        if (this.type === 'guests') {
            if (count === 0) {
                this.btnClean.classList.add('dropdown__button-clean_hidden')
            } else {
                this.btnClean.classList.remove('dropdown__button-clean_hidden')
            }
        }
    }
}
