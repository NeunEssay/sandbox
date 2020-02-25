const DICTIONARY = {
    "color": [],
    "display": [],
    "memory": [],
    "model": [],
    "price": [],
    "shops": []
}

let DATA = []

function init() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => data.forEach(item => DATA.push(item)))
        .then(function () {
            add_select()
            add_options(DATA)
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

function unique_filter(arr, key) {
    let selectArr = Array.prototype

    arr.forEach(function (item) {
        selectArr = selectArr.concat(item[key]).filter((value, index, selectArr) => selectArr.indexOf(value) == index)
    })

    return selectArr
}

function option_clean(select) {
    let index = select.length

    while (index--) {
        if (select.options[index].value != select.options[select.selectedIndex].value && select.options[index].value != 'default') {
            select.removeChild(select.options[index])
        }
    }
}

function add_options(data) {

    for (let key in DICTIONARY) {
        const select = document.getElementById('select-' + key)

        if (select.selectedIndex == 0) {
            option_clean(select)
            unique_filter(data, key).forEach(value => {
                let option = document.createElement('option')
                option.textContent = value
                select.appendChild(option)
            })
        } else {
            option_clean(select)
        }
    }
}

function filter_options(select, key) {
    add_to_dictionary(select, key)
    add_options(filter_data(DATA, DICTIONARY))
}