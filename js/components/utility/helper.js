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