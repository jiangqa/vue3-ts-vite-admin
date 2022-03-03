/* 合法uri*/
export function validateURL(textval: string) {
    const urlregex =
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}
/**
 * 判断是否为空
 */
export function validateNull(val: any) {
    if (typeof val == 'boolean') {
        return false
    }
    if (typeof val == 'number') {
        return false
    }
    if (val instanceof Array) {
        if (val.length == 0) return true
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
        return false
    }
    return false
}
/**
 * URL地址
 * @param {*} s
 */
export function isURL(s: string) {
    return /^http[s]?:\/\/.*/.test(s)
}
