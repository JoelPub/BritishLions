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
export function splitName(name,spliter,maxLength) {
        let nameArr=[]
        let i=0
        name.split(spliter).map((value,index)=>{
            if(index===0) {
                nameArr[i]=value
            }
            else {
                if (nameArr[i].length+value.length<maxLength) {
                    nameArr[i]=nameArr[i]+spliter+value 
                }
                else {
                    i++
                    nameArr[i]=value
                }
            }
        })
        return nameArr
}