const JSON = 'data.json'

const FILTER_DICTIONARY = {
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
        FILTER_DICTIONARY[key] = []
    } else {
        FILTER_DICTIONARY[key] = [value]
    }
}

function add_select() {
    const selectBlock = document.getElementById('select-block')

    for (let key in FILTER_DICTIONARY) {
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

function unique_options_filter(data, key) {
    let selectArr = new Set()

    data.forEach(function(item) {
        if (Array.isArray(item[key]) == true) {
            item[key].forEach(value => selectArr.add(value).toString())
        } else {
            selectArr.add(item[key].toString())
        }
    })

    return selectArr
}

function fill_options(data) {
    for (let key in FILTER_DICTIONARY) {
        const select = document.getElementById('select-' + key)

        unique_options_filter(data, key).forEach(value => {
            let option = document.createElement('option')
            option.textContent = value
            select.appendChild(option)
        })
    }
}

function disable_options(data) {
    for (let key in FILTER_DICTIONARY) {
        const select = document.getElementById('select-' + key)

        if (FILTER_DICTIONARY[key].length != 0) {
            for (let i = 1; i < select.length; i++) {
                if (select.options[i].value != select.options[select.selectedIndex].value) {
                    select.options[i].disabled = true
                }
            }
        } else {
            for (let i = 1; i < select.length; i++) {
                if (unique_options_filter(data, key).has(select.options[i].value) == false) {
                    select.options[i].disabled = true
                } else {
                    select.options[i].disabled = false
                }
            }
        }
    }
}

function filter_options(select, key) {
    add_to_dictionary(select, key)
    disable_options(filter_data(DATA, FILTER_DICTIONARY))
}