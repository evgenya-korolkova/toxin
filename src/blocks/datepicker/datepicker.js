import AirDatepicker from 'air-datepicker';

export class Datepicker {
    constructor(block, dates = []) {
        this.block = block
        this.type = block.dataset.type
        this.dates = dates

        this.getDOM()
        this.initEvent()
        this.initAirDatepicker()
        this.addListener()
        this.setDate()
    }

    getDOM() {
        this.inputFrom = this.block.querySelector('[data-input="from"]')
        this.inputTo = this.block.querySelector('[data-input="to"]')
        this.inputFilter = this.block.querySelector('[data-input="filter"]')
        this.inputReal = this.block.querySelector('.datepicker__input-real')
        // this.btnClear =  this.adp.$datepicker.querySelector('.air-datepicker__btn-clear') см. initAirDatepicker()
    }

    initEvent() {
        this.event = new CustomEvent('change', {
            detail: {dates: []},
            bubbles: true,
            cancelable: true,
            composed: false,
        });
    }

    initAirDatepicker() {

        const btnApply = {
            content: 'Применить',
            className: 'air-datepicker__btn-apply btn-text__button h3',
            onClick: (dp) => {
                dp.dp.applyDate()
                dp.dp.sendEvent()
            }
        }
        
        const btnClear = {
            content: 'Очистить',
            className: 'air-datepicker__btn-clear btn-text__button h3',
            onClick: (dp) => {
                dp.clear()
            }
        }

        const opts = {
            range: true, 
            dateFormat: 'dd.MM.yyyy',
            showEvent: '',
            offset: 5,
            buttons: [btnClear, btnApply],
            defaultValue: 'ДД.ММ.ГГГГ', // значение по умолчанию (новое свойство)
            navTitles: {
                days: 'MMMM yyyy'
            },

            onSelect({date, formattedDate, datepicker}) {
                datepicker.dp.visibleBtnClear()
            },

            onChangeView(view) {
                this.adp.dp.visibleButtons(view)
                this.adp.dp.setAirDatepickerWidth()
            },
        }

        if (this.type === 'filter') {
            opts.dateFormat = 'd MMM'
            opts.defaultValue = ''
        }
        
        this.adp = new AirDatepicker(this.inputReal, opts)

        this.adp.dp = this          // ссылка на родителя (Datepicker)
        this.adp.opts.adp = this.adp // ссылка на родителя (AirDatepicker)
        
        this.adp.locale.monthsShort = this.adp.locale.monthsShort.map((item) => item.toLowerCase()) // название месяца строчными буквами

        this.btnClear =  this.adp.$datepicker.querySelector('.air-datepicker__btn-clear')
    }

    addListener() {
        this.handleInputClick = this.handleInputClick.bind(this)
        
        if (this.type === 'filter') {
            // клик мыши (inputFilter)
            this.inputFilter.addEventListener('click', this.handleInputClick)
        } else {
            // клик мыши (inputFrom)
            this.inputFrom.addEventListener('click', this.handleInputClick)
            // клик мыши (inputTo)
            this.inputTo.addEventListener('click', this.handleInputClick)
        }
    }

    handleInputClick() {
        this.adp.show()                 // показать календарь
        this.setAirDatepickerWidth()    // установить ширину календаря
        this.inputReal.focus()          // переключить фокус
    }

    // установить даты (переданные в конструктор)
    setDate() {
        this.adp.selectDate(this.dates) // в AirDatepicker
        this.applyDate()                // в Datepicker
        this.visibleBtnClear()          // видимость кнопки 'Очистить'
    }

    // установить ширину календаря
    setAirDatepickerWidth() {
        this.adp.$datepicker.style.width = getComputedStyle(this.adp.$el).width
        // this.adp.$el = this.inputReal
    }

    // отобразить в Datepicker даты, выбранные в AirDatepicker
    applyDate() {
        const adp = this.adp
        if (this.type === 'filter') {
            if (adp.selectedDates[0]) {
                this.inputFilter.innerText = adp.formatDate(adp.selectedDates[0], adp.opts.dateFormat)
                if (adp.selectedDates[1]) {
                    this.inputFilter.innerText = this.inputFilter.innerText + ' - ' + adp.formatDate(adp.selectedDates[1], adp.opts.dateFormat)
                } 
            } else {
                this.inputFilter.innerText = adp.opts.defaultValue
            }

        } else {
            if (adp.selectedDates[0]) {
                this.inputFrom.innerText = adp.formatDate(adp.selectedDates[0], adp.opts.dateFormat)
            } else {
                this.inputFrom.innerText = adp.opts.defaultValue
            }

            if (adp.selectedDates[1]) {
                this.inputTo.innerText = adp.formatDate(adp.selectedDates[1], adp.opts.dateFormat)
            } else {
                this.inputTo.innerText = adp.opts.defaultValue
            }
        }
    }

    // отправить событие об изменении дат
    sendEvent() {
        this.event.detail.dates = this.adp.selectedDates
        this.block.dispatchEvent(this.event);
    }

    // показать/скрыть кнопку Очистить
    visibleBtnClear() {
        if (this.adp.selectedDates.length > 0) {
            this.btnClear.classList.remove('air-datepicker__btn-clear_hidden')
        } else {
            this.btnClear.classList.add('air-datepicker__btn-clear_hidden')
        }
    }

    // показать/скрыть кнопки (Очистить, Применить)
    visibleButtons(view) {
        if (view === 'days') {
            this.adp.$buttons.classList.remove('air-datepicker--buttons_hidden')
        } else {
            this.adp.$buttons.classList.add('air-datepicker--buttons_hidden')
        }
    }

}
