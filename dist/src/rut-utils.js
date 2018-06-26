'use strict';

// export default class RutUtils {
var clean = function clean(rut) {
    return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '';
};

var firstValidate = function firstValidate(rut) {
    if (typeof rut !== 'string') return false;
    if (!/^0*(\d{1,3}(\.?\d{3}){0,2})-?([\dkK])$/.test(rut)) return false;
    return true;
};

var calculate = function calculate(rut) {
    var withVerifier = void 0;
    /-([\dkK])$/.test(rut) ? withVerifier = true : withVerifier = false;
    rut = clean(rut);
    if (!firstValidate(rut)) return false;
    var nums = [];
    withVerifier ? nums = rut.slice(0, -1).split('').reverse() : nums = rut.split('').reverse();
    var m = 0,
        s = 1;
    nums.forEach(function (element) {
        return s = (s + element * (9 - m++ % 6)) % 11;
    });
    var v = s ? '' + (s - 1) : 'K';
    return v;
};

var isValid = function isValid(rut) {
    if (!firstValidate(rut)) return false;
    rut = clean(rut);
    var nums = rut.slice(0, -1).split('').reverse();
    var m = 0,
        s = 1;
    nums.forEach(function (element) {
        return s = (s + element * (9 - m++ % 6)) % 11;
    });
    var v = s ? '' + (s - 1) : 'K';
    return v === rut.slice(-1);
};

var format = function format(rut) {
    var dots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!firstValidate(rut)) return false;
    rut = clean(rut);
    var result = void 0;
    if (dots) {
        result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
        for (var i = 4; i < rut.length; i += 3) {
            result = rut.slice(-3 - i, -i) + '.' + result;
        }
    } else result = rut.slice(0, -1) + '-' + rut.substr(rut.length - 1);
    return result;
};

var verifier = function verifier(rut) {
    if (!firstValidate(rut)) return false;
    rut = clean(rut);
    return rut.substr(rut.length - 1);
};

var digits = function digits(rut) {
    if (!firstValidate(rut)) return false;
    rut = clean(rut);
    return rut.slice(0, -1);
};

var getInfo = function getInfo(data) {
    var isName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var route = !isName ? 'rut/' : 'search?q=';
    return fetch('https://api.rutify.cl/' + route + data).then(function (response) {
        return response.json();
    }).then(function (json) {
        if (json.hasOwnProperty('servel')) {
            delete json.servel;
        }
        return json;
    }).catch(function (error) {
        return error;
    });
};
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
};