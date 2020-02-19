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

function validate_object(data, filterDic) {
    let check_BOOL = false

    for (let key in filterDic) {

        if (filterDic[key].length !== 0) {

            for (let j = 0; j < filterDic[key].length; j++) {

                check_BOOL = false

                if (Array.isArray(data[key]) === true) {
                    for (let k = 0; k < data[key].length; k++) {
                        if (data[key][k] == filterDic[key][j]) {
                            check_BOOL = true
                        } else {
                            if (k + 1 === data[key][k]) {
                                if (check_BOOL === false) {
                                    return check_BOOL
                                }
                            }
                        }
                    }
                } else {
                    if (data[key] == filterDic[key][j]) {
                        check_BOOL = true
                    } else {
                        return check_BOOL
                    }
                }
            }
        } else if (filterDic[key].length === 0) {
            for (let j = 0; j < Object.keys(filterDic).length; j++) {
                if (filterDic[Object.keys(filterDic)[j]].length === 0) {
                    if ((j + 1) === Object.keys(filterDic).length) {
                        check_BOOL = true
                    }
                }
            }
        }
    }
    
    return check_BOOL
}

function filter_data(data, filterDic) {
    let filteredObj = []

    for (let i = 0; i < data.length; i++) {

        if (validate_object(data[i], filterDic) === true) {
            filteredObj.push(data[i])
        }
    }

    return filteredObj
}

main(IPHONE_DATA)