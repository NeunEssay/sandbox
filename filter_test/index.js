const FILTER_DIC = {
    "color": ["rose_gold"],
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

    console.log(filter_data(data, FILTER_DIC))
}

function filter_data(dataStructure, filterDic) {
    let filteredObj = [],
        checker_BOOL = true

    for (let i = 0; i < dataStructure.length; i++) {

        for (let key in filterDic) {
            if (filterDic[key].length !== 0) {
                filterDic[key].forEach(function (filterItem) {
                    dataStructure[i][key].forEach(function (dataItem) {
                        if (filterItem != dataItem) {
                            checker_BOOL = false
                        }
                    })
                })
            }
        }

        if (checker_BOOL === true) {
            filteredObj.push(dataStructure[i])
        }
    }

    return filteredObj
}

main(IPHONE_DATA)