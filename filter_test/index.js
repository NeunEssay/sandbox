const FILTER_DIC = {
    "color": [],
    "display": [4.7],
    "memory": [128],
    "model": [],
    "price": [],
    "shops": ["трк_атриум"]
}

const IPHONE_DATA = 'data.json'

async function main(DATA) {
    const response = await fetch(DATA),
        data = await response.json()

    console.log(filter_data(data, FILTER_DIC))
}

function filter_data(dataStructure, filterDic) {
    let filteredObj = []

    for (let i = 0; i < dataStructure.length; i++) {
        let check_BOOL = false

        top : {
            for (let key in filterDic) {
                if (filterDic[key].length !== 0) {
                    for (let j = 0; j < filterDic[key].length; j++) {
                        if (Array.isArray(dataStructure[i][key]) === true) {
                            for (let k = 0; k < dataStructure[i][key].length; k++) {
                                if (dataStructure[i][key][k] == filterDic[key][j]) {
                                    check_BOOL = true
                                } else {
                                    break top
                                }
                            }
                        } else {
                            if (dataStructure[i][key] == filterDic[key][j]) {
                                check_BOOL = true
                            } else {
                                break top
                            }
                        }
                    }
                } else if (filterDic[key].length === 0) {
                    for (let j = 0; j < Object.keys(filterDic).length; j++) {
                        if (filterDic[Object.keys(filterDic)[j]].length === 0 && (j + 1) === Object.keys(filterDic).length) {
                            check_BOOL = true
                        }
                    }
                }
            }

            if (check_BOOL === true) {
                filteredObj.push(dataStructure[i])
            }
        }
    }

    return filteredObj
}

main(IPHONE_DATA)