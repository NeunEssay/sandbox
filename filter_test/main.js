import {filter} from './filter.js'

const IPHONE_DATA = 'data.json'

const DICTIONARY = {
    "color": [],
    "display": [],
    "memory": [],
    "model": [],
    "price": [],
    "shops": []
}

async function extract_data(DATA) {
    const response = await fetch(DATA),
        data = await response.json()

    return data
}

function filter_options() {
    extract_data(IPHONE_DATA)
        .then(data => add_options(filter(data, data.forEach(item => item), DICTIONARY)))
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
                add_to_dictionary(select, key)
                filter_options()
                console.log(DICTIONARY)
            }
        )
    }
}

function check_for_equal(select, option) {
    for (let i = 0; i < select.length; i++){
        if (option == select.options[i].value) {
            return true
        } else if (select.length == i + 1) {
            return false
        }
    }
}

function add_options(filteredData) {
    for (let key_1 in DICTIONARY) {
        const select = document.getElementById('select-' + key_1)

        for (let i = 0; i < select.length; i++) {
            if (select.selectedIndex != i && select.options[i].value != 'default') {
                select.removeChild(select.options[i])
                i--
            }
        }

        filteredData.forEach(function (item) {
            for (let key_2 in item) {
                if (key_1 == key_2) {
                    if (select.selectedIndex == 0) {
                        if (Array.isArray(item[key_2]) == false) {
                            if (check_for_equal(select, item[key_2]) == false) {
                                let option = document.createElement('option')
                                option.textContent = item[key_2]
                                select.appendChild(option)
                            }
                        } else {
                            item[key_2].forEach(value => {
                                if (check_for_equal(select, value) == false) {
                                    let option = document.createElement('option')
                                    option.textContent = value
                                    select.appendChild(option)
                                }
                            })
                        }
                    }
                }
            }
        })
    }
}

add_select()
filter_options()