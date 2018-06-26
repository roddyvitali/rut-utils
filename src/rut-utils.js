// export default class RutUtils {
    const clean = (rut) => {
        return typeof rut === 'string'
          ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
          : ''
    }
    
    const firstValidate= (rut) => {
        if(typeof rut !== 'string' ) return false
        if(!/^0*(\d{1,3}(\.?\d{3}){0,2})-?([\dkK])$/.test(rut)) return false
        return true
    }
    
    const calculate = (rut) => {
        let withVerifier
        (/-([\dkK])$/.test(rut)) ? withVerifier = true : withVerifier = false
        rut = clean(rut)
        if(!firstValidate(rut)) return false
        let nums = []
        withVerifier ? nums = rut.slice(0, -1).split('').reverse() : nums = rut.split('').reverse()
        let m = 0, s = 1
        nums.forEach( (element) => s = (s + element * (9 - m++ % 6)) % 11 )
        let v = s ? '' + (s - 1) : 'K'
        return v
    }
    
    const isValid = (rut) => {
        if(!firstValidate(rut)) return false
        rut = clean(rut)
        let nums = rut.slice(0, -1).split('').reverse()
        let m = 0, s = 1
        nums.forEach( (element) => s = (s + element * (9 - m++ % 6)) % 11 )
        let v = s ? '' + (s - 1) : 'K'
        return v === rut.slice(-1)
    }
    
    const format = (rut, dots = false) => {
        if(!firstValidate(rut)) return false
        rut = clean(rut)
        let result
        if( dots ) {
            result = `${rut.slice(-4, -1)}-${rut.substr(rut.length - 1)}`
            for(let i = 4; i < rut.length; i += 3) result = `${rut.slice(-3 - i, -i)}.${result}`  
        }else result = `${rut.slice(0, -1)}-${rut.substr(rut.length - 1)}`
        return result
    }
    
    const verifier = (rut) => {
        if(!firstValidate(rut)) return false
        rut = clean(rut)
        return rut.substr(rut.length - 1)
    }
    
    const digits = (rut) => {
        if(!firstValidate(rut)) return false
        rut = clean(rut)
        return rut.slice(0, -1)
    }

    const getInfo = (data, isName = false) => {
        let route = !isName  ? 'rut/' : 'search?q='
        return fetch(`https://api.rutify.cl/${route}${data}`)
        .then( response => response.json() )
        .then( json => {
            if(json.hasOwnProperty('servel')){ delete json.servel; } 
            return json
        })
        .catch(error => error)
    }
// }

module.exports = {
    Clean: clean,
    FirstValidate: firstValidate,
    Calculate: calculate,
    IsValid: isValid,
    Format: format,
    Verifier: verifier,
    Digits: digits,
    GetInfo: getInfo
}