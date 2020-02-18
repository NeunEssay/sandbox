const FILTER_DIC = {
    "color": [],
    "display": [4.7],
    "memory": [],
    "model": ["9s"],
    "price": [],
    "shops": []
}

const IPHONE_DATA =  'data.json'

async function filtered_data(dataStructure, filteredStructure) {
    const response = await fetch(dataStructure),
        data = await response.json()

    let filteredObj = {},
        dicCount = 0

    for (let key in filteredStructure) {
        if (filteredStructure[key].length !== 0) {
            dicCount++
        }
    }

    for (key in filteredStructure) {
        filteredObj[key] = filteredStructure[key]
        filteredObj[key] = []
    }

    for (let i = 0; i < data.length; i++) {
        let checkCount = 0

        top: {
            for (let key in data[i]) {
                if (filteredStructure[key].length !== 0) {
                    checkCount++
                    for (let j = 0; j < filteredStructure[key].length; j++) {
                        for (let k = 0; k < data[i][key].length; k++) {
                            if (data[i][key][k] != filteredStructure[key][j] && k === data[i][key].length) {
                                break top
                            }
                        }
                    }
                }
            }


            if (dicCount == checkCount) {
                for (let key in data[i]) {
                    for (let k = 0; k < data[i][key].length; k++) {
                        if (filteredObj[key].length == 0) {
                            filteredObj[key].push(data[i][key][k])
                        } else {
                            for (let j = 0; j < filteredObj[key].length; j++) {
                                if (data[i][key][k] != filteredObj[key][j] && k === filteredObj[key].length) {
                                    filteredObj[key].push(data[i][key][k])
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (let key in filteredObj) {
        for (let i = 0; i < filteredObj[key].length; i++) {
            document.write(filteredObj[key][i] + '<br>')
        }
    }

}

filtered_data(IPHONE_DATA, FILTER_DIC)