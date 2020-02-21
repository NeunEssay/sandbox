const IPHONE_DATA = 'data.json'

const DICTIONARY = {
    "color": [],
    "display": [],
    "memory": [],
    "model": [],
    "price": [],
    "shops": []
}

function filter_options() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => add_options(filter(data, DICTIONARY)))
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

function add_options(filteredData) {

    for (let key in DICTIONARY) {
        const select = document.getElementById('select-' + key)

        if (select.selectedIndex == 0) {
            option_clean(select)
            unique_filter(filteredData, key).forEach(value => {
                let option = document.createElement('option')
                option.textContent = value
                select.appendChild(option)
            })
        } else {
            option_clean(select)
        }
    }
}

add_select()
filter_options()