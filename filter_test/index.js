const FILTER_DIC = {
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

    console.log(filtered_data(data, FILTER_DIC))
}

function filtered_data(dataStructure, filteredStructure) {
    let filteredObj = [],
        dicCount = 0

    for (let key in filteredStructure) {
        if (filteredStructure[key].length !== 0) {
            dicCount++
        }
    }

    for (let i = 0; i < dataStructure.length; i++) {
        let checkCount = 0

        top: {
            for (let key in filteredStructure) {
                if (filteredStructure[key].length !== 0) {
                    checkCount++
                    for (let j = 0; j < filteredStructure[key].length; j++) {
                        for (let k = 0; k < dataStructure[i][key].length; k++) {
                            if (dataStructure[i][key][k] != filteredStructure[key][j] && k === dataStructure[i][key].length-1) {
                                break top
                            }
                        }
                    }
                }
            }
            console.log(checkCount, dicCount)
            if (checkCount === dicCount) {
                filteredObj.push(dataStructure[i])
            }
        }
    }
    return filteredObj
}

main(IPHONE_DATA)