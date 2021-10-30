import AirDatepicker from 'air-datepicker';

export class Datepicker {
    constructor(block) {
        this.block = block
        this.type = block.dataset.type

        this.getDOM()
        this.initAirDatepicker()
        this.addListener()
    }

    initAirDatepicker() {

        const btnApply = {
            content: 'Применить',
            className: 'datepicker__btn-apply btn-text__button h3',
            onClick: (dp) => {
                if (dp.dp.type === 'filter') {
                    if (dp.selectedDates[0]) {
                        dp.dp.inputFilter.innerText = dp.formatDate(dp.selectedDates[0], dp.opts.dateFormat)
                        if (dp.selectedDates[1]) {
                            dp.dp.inputFilter.innerText = dp.dp.inputFilter.innerText + ' - ' + dp.formatDate(dp.selectedDates[1], dp.opts.dateFormat)
                        } 
                    } else {
                        dp.dp.inputFilter.innerText = dp.opts.defaultValue
                    }

                } else {
                    if (dp.selectedDates[0]) {
                        dp.dp.inputFrom.innerText = dp.formatDate(dp.selectedDates[0], dp.opts.dateFormat)
                    } else {
                        dp.dp.inputFrom.innerText = dp.opts.defaultValue
                    }

                    if (dp.selectedDates[1]) {
                        dp.dp.inputTo.innerText = dp.formatDate(dp.selectedDates[1], dp.opts.dateFormat)
                    } else {
                        dp.dp.inputTo.innerText = dp.opts.defaultValue
                    }
                }
            }
        }
        
        const btnClear = {
            content: 'Очистить',
            className: 'datepicker__btn-clear datepicker__btn-clear_hidden btn-text__button h3',
            onClick: (dp) => {
                dp.clear()
            }
        }

        const opts = {
            range:true, 
            dateFormat: 'dd.MM.yyyy',
            showEvent: '',
            offset: 5,
            buttons: [btnClear, btnApply],
            defaultValue: 'ДД.ММ.ГГГГ',
            navTitles: {
                days: 'MMMM yyyy'
            },

            onSelect({date, formattedDate, datepicker}) {
                if (datepicker.selectedDates.length > 0) {
                    datepicker.btnClear.classList.remove('datepicker__btn-clear_hidden')
                } else {
                    datepicker.btnClear.classList.add('datepicker__btn-clear_hidden')
                }
            },
        }

        if (this.type === 'filter') {
            opts.dateFormat = 'd MMM'
            opts.defaultValue = ''
        }
        
        this.adp = new AirDatepicker(this.inputReal, opts)
        this.adp.btnClear =  this.adp.$datepicker.querySelector('.datepicker__btn-clear')
        this.adp.locale.monthsShort = this.adp.locale.monthsShort.map((item) => item.toLowerCase()) // название месяца строчными буквами
        this.adp.dp = this

        console.log(this.adp)
    }

    getDOM() {
        this.inputFrom = this.block.querySelector('.datepicker__input-custom[data-input="from"]')
        this.inputTo = this.block.querySelector('.datepicker__input-custom[data-input="to"]')
        this.inputFilter = this.block.querySelector('.datepicker__input-custom[data-input="filter"]')
        this.inputReal = this.block.querySelector('.datepicker__input-real')
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
        this.adp.show()
        // this.inputReal.focus()
    }
}
