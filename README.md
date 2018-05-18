# js-toolbox

Various JS utilities.

[![npm version](https://img.shields.io/npm/v/@xcmats/js-toolbox.svg)](https://www.npmjs.com/package/@xcmats/js-toolbox)
[![npm license](https://img.shields.io/npm/l/@xcmats/js-toolbox.svg)](https://www.npmjs.com/package/@xcmats/js-toolbox)
[![GitHub top language](https://img.shields.io/github/languages/top/drmats/js-toolbox.svg)](https://github.com/drmats/js-toolbox)
[![GitHub code size](https://img.shields.io/github/languages/code-size/drmats/js-toolbox.svg)](https://github.com/drmats/js-toolbox)
[![GitHub tag](https://img.shields.io/github/tag/drmats/js-toolbox.svg)](https://github.com/drmats/js-toolbox)

```bash
$ npm install @xcmats/js-toolbox
```

<br />




## experimenting

```bash
$ git clone git@github.com:drmats/js-toolbox.git
Cloning into 'js-toolbox'...
$ cd js-toolbox
$ npm i
$ npm start
🎉  Successfully compiled 7 files with Babel.
```

```javascript
> array
{ draw: [Function: draw],
  flatten: [Function: flatten],
  head: [Function: head],
  init: [Function: init],
  last: [Function: last],
  range: [Function: range],
  shuffle: [Function: shuffle],
  sparse: [Function: sparse],
  tail: [Function: tail] }

> async
{ delay: [Function: delay],
  interval: [Function: interval],
  timeout: [Function: timeout] }

> math
{ average: [Function: average],
  log10: [Function: log10],
  log2: [Function: log2],
  roundIfClose: [Function: roundIfClose],
  sum: [Function: sum] }

> redux
{ createReducer: [Function: createReducer] }

> string
{ asciiLetters: [Function: asciiLetters],
  asciiLowercase: [Function: asciiLowercase],
  asciiUppercase: [Function: asciiUppercase],
  big: [Function],
  camelToPascal: [Function: camelToPascal],
  camelToSnake: [Function: camelToSnake],
  capitalize: [Function: capitalize],
  digits: [Function: digits],
  empty: [Function: empty],
  pascalToCamel: [Function: pascalToCamel],
  pascalToSnake: [Function: pascalToSnake],
  quote: [Function: quote],
  random: [Function: random],
  snakeToCamel: [Function: snakeToCamel],
  snakeToPascal: [Function: snakeToPascal] }

> utils
{ access: [Function: access],
  choose: [Function: choose],
  dict: [Function: dict],
  handleException: [Function: handleException],
  nullToUndefined: [Function: nullToUndefined],
  swap: [Function: swap],
  Y: [Function: Y] }
```




## examples

```javascript
> array.draw(string.asciiLetters())
'S'
```

```javascript
> array.flatten(Object.entries({ a: 'b', c: 'd', e: 'f' }))
[ 'a', 'b', 'c', 'd', 'e', 'f' ]
```

```javascript
> array.range(10)
[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

```javascript
> array.shuffle(array.range(12))
[ 9, 7, 0, 8, 2, 10, 3, 1, 11, 4, 5, 6 ]
```

```javascript
> array.sparse(1024, 8)
[ 6, 34, 170, 422, 530, 643, 855, 862 ]
```

```javascript
> math.average([1, 2, 3, 4, 5])
3
```

```javascript
> math.log2(2**32)
32
```

```javascript
> math.log10(1e9)
9
```

```javascript
> math.sum([5, 6, 7, 8, 9, 10])
45
```

```javascript
> string.big(4)
'xxxxxxxxxxxxxxxx'
```

```javascript
> string.camelToSnake('someNightsIStayUpCashingInMyBadLuck')
'some_nights_i_stay_up_cashing_in_my_bad_luck'
```

```javascript
> string.quote("div", "<>")
'<div>'
```

```javascript
> string.random(16)
'MxWGe8MoOss0yUAP'
```

```javascript
> string.snakeToCamel('some_nights_i_call_it_a_draw')
'someNightsICallItADraw'
```

```javascript
> utils.access({ a: { b: { c: 42 } } }, ["a", "b", "c"])
42
```

```javascript
> utils.dict([['a', 'b'], ['c', 'd'], ['e', 'f']])
{ a: 'b', c: 'd', e: 'f' }
```

```javascript
> utils.swap({ a: 'b', c: 'd', e: 'f' })
{ b: 'a', d: 'c', f: 'e' }
```
