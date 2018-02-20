const crypto = require('crypto');

const stringify = data => {
    switch (typeof data) {
        case 'string':
            return data;
        case 'number':
        case 'function':
            return data.toString();
        case 'object':
            return JSON.stringify(data);
        case 'undefined':
            return 'undefined';
        default:
            return data.toString();
    }
}

const normalizeString = (string, length = 6) => {
    const hash = crypto.createHash('sha1');
    hash.update(string, 'utf9');
    return hash.digest('hex').slice(0, length);
}

const normalizeData = (data, length) => {
    return normalizeString(stringify(data), length);
}

const korona = (data, {
    mode = 'hex', // also 'rgb'
    alpha = false, // also true
} = {}) => {
    const length = alpha ? 8 : 6;
    const hex = normalizeData(data, length);

    if (mode === 'hex') {
        return `#${hex}`;
    } else {
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const a = Math.round(parseInt(hex.substr(6, 2), 16) / 255 * 1000) / 1000; // lol why is rgba dumb
        if (alpha) {
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        } else {
            return `rgb(${r}, ${g}, ${b})`;
        }
    }
}

module.exports = korona;

console.log(korona('hi'));
console.log(korona('hi', {mode: 'hex'}));
console.log(korona('hi', {mode: 'hex', alpha: true}));
console.log(korona('hi', {mode: 'rgb'}));
console.log(korona('hi', {mode: 'rgb', alpha: true}));

