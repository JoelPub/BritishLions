export function ucWords(str) {
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase()
    })

    return str
}

export function strToUpper(str) {
    if (str)
    	return str.toUpperCase()

    return str
}
export function strToLower(str) {
    if (str)
    	return str.toLowerCase()

    return str
}
export function isEmptyObject(e) {  
    var t 
    for (t in e)  
        return !1;  
    return !0  
}

export function splitName(name, spliter, maxLength, isMergeFirstName = false) {
        let nameArr = [],
            newNameArr = [],
            i = 0

        if(typeof name === 'string') {
            name.split(spliter).map((value, index)=>{
                if (index === 0 ) {
                    nameArr[i] = value
                } else {
                    if ((nameArr[i].length + value.length) < maxLength) {
                        nameArr[i] = nameArr[i] + spliter + value 
                    } else {
                        i++
                        nameArr[i] = value
                    }
                }
            })
        }

        if (isMergeFirstName && (nameArr.length > 2)) {
            let firstName = nameArr[0] + ' ' + nameArr[1]
            nameArr = nameArr.slice(2)
            nameArr.splice(0, 0, firstName)
        }


        return nameArr
}

export function limitArrayList(list, limit=null) {
    if (limit) {
        return list.slice(0, limit)
    }
    return list
}

export function mapJSON(data, colMax = 2) {
    let i = 0
    let k = 0
    let newData = []
    let items = []
    let length = data.length

    for( i = 0; i <data.length; (i += colMax)) {
        for( k = 0; k < colMax; k++ ) {
            if(data[i + k]!==undefined)
                items.push(data[i + k])
        }

        newData.push(items)
        items = []
    }
    return newData
}

export function findObjByID(data, idToLookFor) {
    return data.find((item) => {
        return item.id == idToLookFor
    })
}