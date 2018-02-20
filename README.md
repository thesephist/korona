# Korona

Take any JavaScript data and get back a reasonably unique hex or rgb color with an optional alpha channel 🖌

## Usage

Korona is just a function.

```javascript
const korona = require('korona');

korona('some_data');
// => '#abcdef' [some hex value]
```

Korona takes an optional options hash as the second argument:
```javascript
const korona = require('korona');

korona('some_data', {mode: 'hex'});
// => '#abcdef' [default mode is hex]
korona('some_data', {mode: 'rgb'});
// => 'rgb(1, 2, 3)' [the same hex value, but in RGB format]
korona('soem_data', {alpha: true});
// => '#abcdef01' [by default, alpha is false]
//  alpha: true will add a fourth, alpha channel to both the hex and rgb modes.
```

The two options can obviously be combined:

```javascript
korona('some_data', {mode: 'rgb', alpha: true});
// => 'rgba(1, 2, 3, 0.4)'
```

## License

MIT. See `LICENSE`.
