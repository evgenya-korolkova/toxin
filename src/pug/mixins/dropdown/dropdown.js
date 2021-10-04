console.log("[run dropdown.js]");

document.querySelectorAll('.dropdown').forEach(function(dropdown) {
    console.log(dropdown)



// const dropdown = document.querySelector('.dropdown')

const dropdownInput = dropdown.querySelector('.dropdown__input')
const dropdownLabel = dropdown.querySelector('.dropdown__label')

const dropdownBox = dropdown.querySelector('.dropdown__dropdown')

const dropdownListItemButtonList = dropdownBox.querySelectorAll('.dropdown__list-item-button')
const dropdownListItemValueList = dropdownBox.querySelectorAll('.dropdown__list-item-value')

const dropdownButtonApply = dropdown.querySelector('.dropdown__button-apply')
const dropdownButtonClean = dropdown.querySelector('.dropdown__button-clean')

const type = dropdown.dataset.type
let data = dropdown.dataset.data
// console.log(data)
data = JSON.parse(data)
// console.log(data)

// заполнить input.value
function changeDropdownInputValue() {
    let value =""
    let count = 0

    if (type === "guests") {
        for (let key in data) {
            count = count + +data[key]
        }

        value = 'Сколько гостей'

        if (count === 1) {
            value = count + ' гость'
        } else if ((count >= 2) && (count <= 4)) {
            value = count + ' гостя'
        } else if (count > 4) {
            value = count + ' гостей'
        }
    } // if (type === "guests")

    if (type === "rooms") {
        for (let key in data) {
            count = +data[key]

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

    } // if (type === "rooms") 

    dropdownInput.innerText = value
}

changeDropdownInputValue()

// --------------------------- КНОПКИ ---------------------------
// кноки '+' и '-'
dropdownListItemButtonList.forEach(function(item) {
    item.addEventListener('click', function() {
        let typeBtn = this.innerText
        let key = this.dataset.key
        // console.log(key)

        const dropdownListItemValue = this.parentNode.querySelector('.dropdown__list-item-value')
        
        if (typeBtn === '+') {
            dropdownListItemValue.innerText = +dropdownListItemValue.innerText + 1
            if (dropdownListItemValue.innerText === '1') {
                enableDropdownListItemButton(this.previousElementSibling.previousElementSibling) // кнопку -
            }
        }
        else {
            dropdownListItemValue.innerText = +dropdownListItemValue.innerText - 1
            if (dropdownListItemValue.innerText === '0') {
                disableDropdownListItemButton(this)
            }
        }

        if (type === "rooms") {
            // для комнат менять input.value
            data[key] = dropdownListItemValue.innerText
            changeDropdownInputValue()
        }
    })
})

if (type === "guests") {
    // кнопка Очистить
    dropdownButtonClean.addEventListener('click', function() {
        dropdownListItemValueList.forEach(function(item) {
            item.innerText = 0
            disableDropdownListItemButton(item.previousElementSibling)
            // фокус на Применить
            // dropdownButtonApply.focus()
        })
    })

    // кнопка Применить
    dropdownButtonApply.addEventListener('click', function() {
        dropdownListItemValueList.forEach(function(item) {
            data[item.dataset.key] = item.innerText
        })
        changeDropdownInputValue()

        console.log(data)
    })
}

function disableDropdownListItemButton(button) {
    button.classList.add('dropdown__list-item-button_disabled')
    button.tabIndex = '-1'
    // переместить фокус на соседнюю кнопку
    button.nextElementSibling.nextElementSibling.focus()

    //  скрыть Очистить
    changeVisibleDropdownButtonClean()
}

function enableDropdownListItemButton(button) {
    if (button.classList.contains('dropdown__list-item-button_disabled')) {
        button.classList.remove('dropdown__list-item-button_disabled')
        button.tabIndex = '0'

        // показать Очистить
        changeVisibleDropdownButtonClean()
    }
}

function changeVisibleDropdownButtonClean() {
    let count = 0

    if (type === "guests") {
        dropdownListItemValueList.forEach(function(item) {
            count = count + +item.innerText
        })
    
        if (count === 0) {
            dropdownButtonClean.classList.add('none')
        } else {
            dropdownButtonClean.classList.remove('none')
        }
    }
}

// --------------------------- ПОКАЗАТЬ/СКРЫТЬ ВЫПАДАЮЩИЙ СПИСОК ---------------------------
// клик мыши, Enter (input)
dropdownInput.addEventListener('click', function() {
    // показать/скрыть выпад.список
    dropdownBox.classList.toggle('none')
    dropdownInput.classList.toggle('dropdown__input_active')

    // при показе списка восстановить значения из data (для гостей м.б. не совпадение, когда данне изменили, а Применить не нажали)
    if ((dropdownInput.classList.contains('dropdown__input_active')) && (type === "guests")) {
        for (let key in data) {
            const dropdownListItemValue = dropdown.querySelector('.dropdown__list-item-value[data-key=' + key + ']')
            dropdownListItemValue.innerText = data[key]

            // восстановить состояние всех кнопок
            if (+data[key] > 0) {
                enableDropdownListItemButton(dropdownListItemValue.previousElementSibling)
            }
            else {
                disableDropdownListItemButton(dropdownListItemValue.previousElementSibling)
            }
        }
    }
})

// Esc (input)
dropdownInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hidedropdownBox() // скрыть выпад.список
    }
})

// Esc (dropdown box)
dropdownBox.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hidedropdownBox() // скрыть выпад.список
        dropdownInput.focus(); // установить фокус на инпут
    }
})

// потеря фокуса (input)
dropdownInput.addEventListener('blur', function(e) {
    if (e.relatedTarget === null || !e.relatedTarget.closest('.dropdown__dropdown')) {
        hidedropdownBox() // скрыть выпад.список
    }
})

// потеря фокуса (dropdown box)
dropdownBox.addEventListener('focusout', function(e) {
    // console.log(e.relatedTarget)
    // if (e.relatedTarget === null || (!e.relatedTarget.closest('.dropdown__dropdown') && !e.relatedTarget.closest('.dropdown__input'))) {
    if (e.relatedTarget === null || (!e.relatedTarget.closest('.dropdown__dropdown') && (e.relatedTarget != dropdownInput))) {
        hidedropdownBox() // скрыть выпад.список
    }
})

// переопределение поведения label
dropdownLabel.addEventListener('click', function(e) {
    dropdownInput.focus()
    e.preventDefault()
})

// скрывает выпад. список, если он открыт
function hidedropdownBox() {
    if (dropdownInput.classList.contains('dropdown__input_active')) {
        dropdownBox.classList.add('none')
        dropdownInput.classList.remove('dropdown__input_active')
    }
}


}) // document.querySelectorAll('.dropdown').forEach(function(dropdown)
