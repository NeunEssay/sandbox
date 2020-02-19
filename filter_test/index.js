const FILTER_DIC = {
    "color": [],
    "display": [],
    "memory": [128],
    "model": [],
    "price": [],
    "shops": ["трк_авиапарк",
        "трк_атриум"]
}

const IPHONE_DATA = 'data.json'

async function main(DATA) {
    const response = await fetch(DATA),
        data = await response.json()

    console.log(filter_data(data, FILTER_DIC))
}

function valid_objects(check_BOOL, index, dataStructure, filterDic) {
    for (let key in filterDic) {

        if (filterDic[key].length !== 0) {

            for (let j = 0; j < filterDic[key].length; j++) {

                check_BOOL = false

                if (Array.isArray(dataStructure[index][key]) === true) {
                    for (let k = 0; k < dataStructure[index][key].length; k++) {
                        if (dataStructure[index][key][k] == filterDic[key][j]) {
                            check_BOOL = true
                        } else {
                            if (k + 1 === dataStructure[index][key][k]) {
                                if (check_BOOL === false) {
                                    return check_BOOL
                                }
                            }
                        }
                    }
                } else {
                    if (dataStructure[index][key] == filterDic[key][j]) {
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

function filter_data(dataStructure, filterDic) {
    let filteredObj = []

    for (let i = 0; i < dataStructure.length; i++) {

        if (valid_objects(false, i, dataStructure, filterDic) === true) {
            filteredObj.push(dataStructure[i])
        }
    }

    return filteredObj
}

main(IPHONE_DATA)