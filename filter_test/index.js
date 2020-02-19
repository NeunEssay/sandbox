const FILTER_DIC_1 = {
    "color": [],
    "display": [],
    "memory": [128],
    "model": [],
    "price": [],
    "shops": ["трк_авиапарк",
        "трк_атриум"]
}

const FILTER_DIC_2 = {
    "color": ["black"],
    "display": [7.3],
    "memory": [],
    "model": [],
    "price": [],
    "shops": []
}

const FILTER_DIC_3 = {
    "color": [],
    "display": [],
    "memory": [300],
    "model": [],
    "price": [],
    "shops": ["метрополис"]
}

const FILTER_DIC_4 = {
    "color": [],
    "display": [4.7],
    "memory": [],
    "model": [],
    "price": [],
    "shops": []
}

const FILTER_DIC_5 = {
    "color": [],
    "display": [],
    "memory": [],
    "model": [],
    "price": [],
    "shops": []
}

const IPHONE_DATA = 'data.json'

async function main(DATA) {
    const response = await fetch(DATA),
        data = await response.json()

    console.log('Под условия фильтра:', Object.values(FILTER_DIC_1), 'подходят следующие товары:', filter_data(data, FILTER_DIC_1), ' в количестве 3 шт.')
    console.log('Под условия фильтра:', Object.values(FILTER_DIC_2), 'подходят следующие товары:', filter_data(data, FILTER_DIC_2), ' в количестве 1 шт.')
    console.log('Под условия фильтра:', Object.values(FILTER_DIC_3), 'подходят следующие товары:', filter_data(data, FILTER_DIC_3), ' в количестве 0 шт.')
    console.log('Под условия фильтра:', Object.values(FILTER_DIC_4), 'подходят следующие товары:', filter_data(data, FILTER_DIC_4), ' в количестве 2 шт.')
    console.log('Под условия фильтра:', Object.values(FILTER_DIC_5), 'подходят следующие товары:', filter_data(data, FILTER_DIC_5), ' в количестве 5 шт.')
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
                        return check
                    } else {
                        if (k + 1 === item[key][k]) {
                            if (check === false) {
                                return check
                            }
                        }
                    }
                }
            } else {
                if (item[key] == dictionary[key][j]) {
                    check = true
                    return check
                } else {
                    return check
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