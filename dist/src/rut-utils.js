'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RutUtils = function () {
    function RutUtils() {
        _classCallCheck(this, RutUtils);
    }

    _createClass(RutUtils, [{
        key: 'clean',
        value: function clean(rut) {
            return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '';
        }
    }, {
        key: 'firstValidate',
        value: function firstValidate(rut) {
            if (typeof rut !== 'string') return false;
            if (!/^0*(\d{1,3}(\.?\d{3}){0,2})-?([\dkK])$/.test(rut)) return false;
            return true;
        }
    }, {
        key: 'calculate',
        value: function calculate(rut) {
            var withVerifier = void 0;
            /-([\dkK])$/.test(rut) ? withVerifier = true : withVerifier = false;
            rut = this.clean(rut);
            if (!this.firstValidate(rut)) return false;
            var nums = [];
            withVerifier ? nums = rut.slice(0, -1).split('').reverse() : nums = rut.split('').reverse();
            var m = 0,
                s = 1;
            nums.forEach(function (element) {
                return s = (s + element * (9 - m++ % 6)) % 11;
            });
            var v = s ? '' + (s - 1) : 'K';
            return v;
        }
    }, {
        key: 'isValid',
        value: function isValid(rut) {
            if (!this.firstValidate(rut)) return false;
            rut = this.clean(rut);
            var nums = rut.slice(0, -1).split('').reverse();
            var m = 0,
                s = 1;
            nums.forEach(function (element) {
                return s = (s + element * (9 - m++ % 6)) % 11;
            });
            var v = s ? '' + (s - 1) : 'K';
            return v === rut.slice(-1);
        }
    }, {
        key: 'format',
        value: function format(rut) {
            var dots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!this.firstValidate(rut)) return false;
            rut = this.clean(rut);
            var result = void 0;
            if (dots) {
                result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
                for (var i = 4; i < rut.length; i += 3) {
                    result = rut.slice(-3 - i, -i) + '.' + result;
                }
            } else result = rut.slice(0, -1) + '-' + rut.substr(rut.length - 1);
            return result;
        }
    }, {
        key: 'verifier',
        value: function verifier(rut) {
            if (!this.firstValidate(rut)) return false;
            rut = this.clean(rut);
            return rut.substr(rut.length - 1);
        }
    }, {
        key: 'digits',
        value: function digits(rut) {
            if (!this.firstValidate(rut)) return false;
            rut = this.clean(rut);
            return rut.slice(0, -1);
        }
    }, {
        key: 'getInfo',
        value: function getInfo(data) {
            var isName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var route = !isName ? 'rut/' : 'search?q=';
            return response = fetch('https://api.rutify.cl/' + route + data).then(function (response) {
                return response.json();
            }).then(function (json) {
                if (json.hasOwnProperty('servel')) {
                    delete json.servel;
                }
                return json;
            }).catch(function (error) {
                return error;
            });
        }
    }]);

    return RutUtils;
}();

exports.default = RutUtils;