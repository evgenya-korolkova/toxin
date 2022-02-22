export class Dropdown {
    constructor(block, data) {
        this.block = block
        this.type = block.dataset.type
        this.data = data ? data : JSON.parse(block.dataset.data)
console.log(this.data)
        this.getDOM()
        this.initEvent()
        this.addListener()
        this.setData()
        this.setInputValue()
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

    initEvent() {
        this.event = new CustomEvent('change', {
            detail: {data: {}},
            bubbles: true,
            cancelable: true,
            composed: false,
        });
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

    // клик мыши, Enter (input)
    handleInputClick() {
        this.toggle() // показать/скрыть выпад.список
    }

     // Esc (block)
    handleBlockEsc(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.input.focus()
            this.close() // скрыть выпад.список
        }
    }

    // потеря фокуса (block)
    handleBlockFocusOut(e) {
        // console.log('FOCUSOUT -> ' + e.relatedTarget)
        const isOutBlock = e.relatedTarget === null || (!e.relatedTarget.closest('.dropdown_open'))
        if (isOutBlock && this.isOpen) {
            this.close() // скрыть выпад.список
        }
    }

    // переопределение поведения label
    handleLabelClick(e) {
        this.input.focus()
        e.preventDefault()
    }

    // нажатие кнопки +/-
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
            this.setInputValue()
            // отправить событие об изменении данных
            this.sendEvent()
        }
    }

    // нажатие кнопки Очистить
    handleBtnCleanClick() {
        this.values.forEach(function(item) {
            item.innerText = 0
            // убрать фокус с кнопки Очистить, иначе будет потеря фокуса(-> null) и сработает условие закрытия вып. списка
            item.nextElementSibling.focus()
        })
        this.setBtnStatus()
    }

    // нажатие кнопки Применить
    handleBtnApplyClick() {
        this.values.forEach((item) => {
            this.data[item.dataset.key] = item.innerText
        })
        this.setInputValue()
        // отправить событие об изменении данных
        this.sendEvent()
    }

    // проверка открыт ли выпад. список (по классу 'dropdown_open')
    get isOpen() {
        return this.block.classList.contains('dropdown_open')
    }

    // показать/скрыть выпад.список
    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    // открыть выпад. список
    open() {
        this.block.classList.add('dropdown_open')

        // при показе списка восстановить значения из data (для гостей м.б. не совпадение, когда данне изменили, а Применить не нажали)
        if (this.type === 'guests') {
            this.setData()
            this.setBtnStatus()
        }
    }

    // закрыть выпад. список
    close() {
        this.block.classList.remove('dropdown_open')
    }

    // установить значения счетчиков
    setData() {
        for (let key in this.data) {
            const value = this.dropdown.querySelector('.dropdown__list-item-value[data-key="' + key + '"]')
            if (value) {
                value.innerText = this.data[key]
            }
        }
    }

    // установить значение input
    setInputValue() {
        let value = ''
        let count = 0
        let m = 0
        let str = ''

        if (this.type === 'guests') {
            for (let key in this.data) {
                if (key !== 'младенцы') {
                    count = count + +this.data[key]
                } else {
                    m = +this.data[key]
                }
            }

            if (count === 1) {
                value = count + ' гость'
            } else if ((count >= 2) && (count <= 4)) {
                value = count + ' гостя'
            } else if (count > 4) {
                value = count + ' гостей'
            }

            if (m === 1) {
                str = m + ' младенец'
            } else if ((m >= 2) && (m <= 4)) {
                str = m + ' младенца'
            } else if (m > 4) {
                str = m + ' младенцев'
            }

            if (str !== '') {
                value = (value === '') ? str : value + ', ' + str
            }

            if (value === '') {
                value = 'Сколько гостей'
            }

        } // if (this.type === 'guests')

        if (this.type === 'rooms') {
            for (let key in this.data) {
                count = +this.data[key]

                str = ''

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

                if (str !== '') {
                    if (value.includes(',')) {
                        // добавить '...', если заполнены 3 поля; если заполнены 2 поля, то '...' не добавлять (?) 
                        value = value + '...'
                        break //имеет значение для 4-х полей и более
                    } else {
                        value = (value === '') ? str : value + ', ' + str
                    }
                }

            } // for (let key in data)

            if (value === '') {
                value = 'Сколько комнат'
            }

        } // if (this.type === 'rooms') 

        this.input.innerText = value
    }

    // отправить событие об изменении данных
    sendEvent() {
        this.event.detail.data = this.data
        this.block.dispatchEvent(this.event);
    }

    // установить видимость/доступность кнопок '+', '-', Очистить, Применить
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

    disable() {
        this.input.tabIndex = '-1'
        // this.input.disabled = true //проверить
        this.block.classList.add('dropdown_disable')
    }

}
