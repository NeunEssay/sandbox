export function filter(data, item, dictionary) {

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
                        }
                    }
                } else {
                    if (item[key] == dictionary[key][j]) {
                        check = true
                        break
                    }
                }
            }
            if (check == false) {
                return check
            }
        }
        return check
    }

    function filter_data(data, dictionary) {
        let filteredData = []

        for (let i = 0; i < data.length; i++) {

            if (validate_item(data[i], dictionary) == true) {
                filteredData.push(data[i])
            }
        }

        return filteredData
    }

    return filter_data(data, dictionary)
}