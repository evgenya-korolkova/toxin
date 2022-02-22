import {Dropdown} from '@blocks/dropdown/dropdown.js';
import {Datepicker} from '@blocks/datepicker/datepicker'

export class CardOrder {
    constructor(block, date, data, room) {
        this.block = block
        this.date = date
        this.data = data
        this.room = room

        this.getDOM()
        this.initObj()
        this.addListener()
        this.setContent()
    }

    getDOM() {
        this.dateDropdown = this.block.querySelector('.datepicker')
        this.guestDropdown = this.block.querySelector('.dropdown')

        this.number = this.block.querySelector('.card-order__number-value')
        this.category = this.block.querySelector('.card-order__number-category')
        this.price = this.block.querySelector('.card-order__price-value')

        this.amountText = this.block.querySelector('.card-order__info-line-text[data-amount]')
        this.amountValue = this.block.querySelector('.card-order__info-line-value[data-amount]')

        this.serviceText = this.block.querySelector('.card-order__info-line-text[data-service]')
        this.serviceValue = this.block.querySelector('.card-order__info-line-value[data-service]')

        this.adserviceText = this.block.querySelector('.card-order__info-line-text[data-adservice]')
        this.adserviceValue = this.block.querySelector('.card-order__info-line-value[data-adservice]')

        this.total = this.block.querySelector('.card-order__total-value')

        this.button = this.block.querySelector('.card-order__button')

        this.message = this.block.querySelector('.card-order__message')
    }

    initObj() {
        this.datepicker = new Datepicker(this.dateDropdown, this.date)
        this.dropdown = new Dropdown(this.guestDropdown, this.data)
    }

    addListener() {
        // изменение дат
        this.handleDateDropdownChange = this.handleDateDropdownChange.bind(this)
        this.dateDropdown.addEventListener('change', this.handleDateDropdownChange)

        // кнопка Забронировать
        this.handleBlockSubmit = this.handleBlockSubmit.bind(this)
        this.block.addEventListener('submit', this.handleBlockSubmit)
    }

    handleDateDropdownChange() {
        this.setSum()
    }

    handleBlockSubmit(e) {
        const btn = e.submitter
        console.log(btn)

        this.button.classList.add('card-order__button_hidden')
        this.message.classList.add('card-order__message_visible')

        this.datepicker.disable()
        this.dropdown.disable()

        e.preventDefault();
    }

    setContent() {
        this.number.innerHTML = this.room.number
        this.category.innerHTML = this.room.category
        this.price.innerHTML = `${this.room.price.toLocaleString('ru-RU')}&#8381;`
        
        this.serviceText.innerHTML = `Сбор за услуги: скидка ${(this.room.discount.toLocaleString('ru-RU'))}&#8381;`
        this.serviceValue.innerHTML = `${this.room.service.toLocaleString('ru-RU')}&#8381;`
        
        // this.adserviceText.innerHTML = `Сбор за дополнительные услуги`
        this.adserviceValue.innerHTML = `${this.room.adservice.toLocaleString('ru-RU')}&#8381;`

        this.setSum()
    }

    setSum() {
        const days = this.getDay()
        const w = days === 1 ? 'сутки' : 'суток'
        this.amountText.innerHTML = `${(this.room.price.toLocaleString('ru-RU'))}&#8381; x ${days} ${w}`
        this.amountValue.innerHTML = `${(this.room.price * days).toLocaleString('ru-RU')}&#8381;`

        let total = 0
        if (days) {
            total = this.room.price * days + this.room.service + this.room.adservice - this.room.discount
        }
        this.total.innerHTML = `${(total).toLocaleString('ru-RU')}&#8381;`

    }

    getDay() {
        const dates = this.datepicker.adp.selectedDates
        let diffDays = 0

        if (dates.length > 1 ) {
            const timeDiff = Math.abs(dates[1].getTime() - dates[0].getTime());
            diffDays = Math.trunc(timeDiff / (1000 * 3600 * 24)); 
        }

        return diffDays
    }

}
