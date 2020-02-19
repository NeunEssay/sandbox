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
    "memory": [],
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

    console.log(filter_data(data, FILTER_DIC_1))
    console.log(filter_data(data, FILTER_DIC_2))
    console.log(filter_data(data, FILTER_DIC_3))
    console.log(filter_data(data, FILTER_DIC_4))
    console.log(filter_data(data, FILTER_DIC_5))
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