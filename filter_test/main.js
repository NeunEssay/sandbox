const JSON = 'data.json'

const DICTIONARY = {
    "color": [],
    "display": [],
    "memory": [],
    "model": [],
    "price": [],
    "shops": []
}

let DATA = Array.prototype

function init() {
    fetch(JSON)
        .then(response => response.json())
        .then(data => data.forEach(item => DATA.push(item)))
        .then(function () {
            add_select()
            fill_options(DATA)
        })
}

function add_to_dictionary(select, key) {
    let value = select.options[select.selectedIndex].value

    if (value == 'default') {
        DICTIONARY[key] = []
    } else {
        DICTIONARY[key] = [value]
    }
}

function add_select() {
    const selectBlock = document.getElementById('select-block')

    for (let key in DICTIONARY) {
        let select = document.createElement('select'),
            option = document.createElement('option')

        option.text = 'default'
        option.value = 'default'
        select.appendChild(option)

        select.id = 'select-' + key
        selectBlock.appendChild(select)

        select.addEventListener(
            'change',
            function () {
                filter_options(select, key)
            }
        )
    }
}

function unique_options_filter(arr, key) {
    let selectArr = new Set()

    arr.forEach(function(item) {
        if (Array.isArray(item[key]) == true) {
            item[key].forEach(value => selectArr.add(value))
        } else {
            selectArr.add(item[key])
        }
    })

    return selectArr
}

function fill_options(data) {
    for (let key in DICTIONARY) {
        const select = document.getElementById('select-' + key)

        unique_options_filter(data, key).forEach(value => {
            let option = document.createElement('option')
            option.textContent = value
            select.appendChild(option)
        })
    }
}

function option_disable(arr) {
    for (let key in DICTIONARY) {
        const select = document.getElementById('select-' + key)

        let ableOptions = new Set

        if (select.selectedIndex != 0) {
            for (let i = 0; i < select.length; i++) {
                if (select.options[i].value != 'default') {
                    if (select.options[i].value != select.options[select.selectedIndex].value) {
                        select.options[i].disabled = true
                    }
                }
            }
        } else {

            arr.forEach(function (item) {
                if (Array.isArray(item[key]) == true) {
                    item[key].forEach(value => ableOptions.add(value.toString()))
                } else {
                    ableOptions.add(item[key].toString())
                }
            })

            for (let i = 0; i < select.length; i++) {
                if (select.options[i].value != 'default') {
                    if (ableOptions.has(select.options[i].value) == false) {
                        select.options[i].disabled = true
                    } else {
                        select.options[i].disabled = false
                    }
                }
            }
        }
    }
}

function filter_options(select, key) {
    add_to_dictionary(select, key)
    option_disable(filter_data(DATA, DICTIONARY))
}