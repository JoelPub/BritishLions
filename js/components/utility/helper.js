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