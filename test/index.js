const chai = require('chai');
chai.use(require('chai-match'));
const expect = chai.expect;

const korona = require('../index.js');

const FORMATS = {
    'hex': /#[0-9a-fA-F]{6}/,
    'hexa': /#[0-9a-fA-F]{8}/,
    'rgb': /rgb\(\s*[0-9]{1,3}\,\s*[0-9]{1,3}\,\s*[0-9]{1,3}\s*\)/,
    'rgba': /rgba\(\s*[0-9]{1,3}\,\s*[0-9]{1,3}\,\s*[0-9]{1,3}\,\s*[0-9\.]+\s*\)/,
}

const matchHex = str => expect(str).to.match(FORMATS.hex);
const matchHexA = str => expect(str).to.match(FORMATS.hexa);
const matchRGB = str => expect(str).to.match(FORMATS.rgb);
const matchRGBA = str => expect(str).to.match(FORMATS.rgba);

describe('korona', () => {
    const DATA_TYPES = {
        'string': 'string_data',
        'number': 1234.5678,
        'object': { sample: 'data' },
        'function': () => {console.log('test')},
        'array': [9, 8, 7, 6],
        'undefined': undefined,
        'null': null,
        'zero': 0,
        'date': new Date(),
    }

    describe('hex mode', () => {
        for (const name in DATA_TYPES) {
            it(`should be able to convert a ${name} to a hex value`, () => {
                matchHex(korona(DATA_TYPES[name]));
            });
        }
    });

    describe('hex mode with alpha', () => {
        for (const name in DATA_TYPES) {
            it(`should be able to convert a ${name} to a hex value with alpha`, () => {
                matchHexA(korona(DATA_TYPES[name], { alpha: true }));
            });
        }
    });

    describe('rgb mode', () => {
        for (const name in DATA_TYPES) {
            it(`should be able to convert a ${name} to a rgb value`, () => {
                matchRGB(korona(DATA_TYPES[name], { mode: 'rgb' }));
            });
        }
    });

    describe('rgb mode with alpha', () => {
        for (const name in DATA_TYPES) {
            it(`should be able to convert a ${name} to a rgb value with alpha`, () => {
                matchRGBA(korona(DATA_TYPES[name], { mode: 'rgb', alpha: true }));
            });
        }
    });

});
