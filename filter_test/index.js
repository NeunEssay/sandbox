const FILTER_DIC_1 = {
    "memory": [128],
    "shops": ["трк_авиапарк",
    "трк_атриум"]
}

const FILTER_DIC_2 = {
    "color": ["black"],
    "display": [7.3],
}

const FILTER_DIC_3 = {
    "color": ["white"],
}

const FILTER_DIC_4 = {
    "display": [4.7],
}

const FILTER_DIC_5 = {}

function filter_array_test(filterArr, number, data) {
    let i = 0

    filterArr.forEach(filterItem => {
        console.log('Из данных товаров под условия фильтра:', Object.values(filterItem), 'подходят следующие товары:', filter_data(data, filterItem), ' в количестве ' + number[i] + ' шт.')
        i++
    })
}

const IPHONE_DATA = 'data.json'

async function main(DATA) {
    const response = await fetch(DATA),
        data = await response.json()

    filter_array_test([FILTER_DIC_1, FILTER_DIC_2, FILTER_DIC_3, FILTER_DIC_4, FILTER_DIC_5],[4, 1, 3, 2, 5], data)
}

function validate_item(item, dictionary) {
    let check = true

    for (let key in dictionary) {

        for (let j = 0; j < dictionary[key].length; j++) {

            check = false

            if (Array.isArray(item[key]) === true) {
                for (let k = 0; k < item[key].length; k++) {
                    if (item[key][k] == dictionary[key][j]) {
                        check = true
                        break
                    } else {
                        if (check === false) {
                            if (k + 1 === item[key].length) {
                                if (j + 1 === dictionary[key].length) {
                                    return check
                                }
                            }
                        }
                    }
                }
            } else {
                if (item[key] == dictionary[key][j]) {
                    check = true
                    break
                } else {
                    if (check === false) {
                        if (j + 1 === dictionary[key].length) {
                            return check
                        }
                    }
                }
            }
        }
    }
    return check
}

function filter_data(data, dictionary) {
    let filteredObj = []

    for (let i = 0; i < data.length; i++) {

        if (validate_item(data[i], dictionary) === true) {
            filteredObj.push(data[i])
        }
    }

    return filteredObj
}

main(IPHONE_DATA)