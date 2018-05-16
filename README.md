# js-toolbox

Various JS utilities.




## prerequisities installation

```bash
$ npm install
```




## usage / experimenting

```bash
$ npm start
🎉  Successfully compiled 7 files with Babel.
```

```javascript
> array
{ flatten: [Function: flatten],
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
{ log10: [Function: log10],
  log2: [Function: log2],
  roundIfClose: [Function: roundIfClose] }

> redux
{ createReducer: [Function: createReducer] }

> string
{ big: [Function],
  camelToPascal: [Function: camelToPascal],
  camelToSnake: [Function: camelToSnake],
  capitalize: [Function: capitalize],
  empty: [Function: empty],
  pascalToCamel: [Function: pascalToCamel],
  pascalToSnake: [Function: pascalToSnake],
  snakeToCamel: [Function: snakeToCamel],
  snakeToPascal: [Function: snakeToPascal] }

> utils
{ choose: [Function: choose],
  dict: [Function: dict],
  handleException: [Function: handleException],
  swap: [Function: swap],
  Y: [Function: Y] }
```




## examples

```javascript
> array.range(10)
[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

```javascript
> array.sparse(1024, 8)
[ 6, 34, 170, 422, 530, 643, 855, 862 ]
```

```javascript
> array.shuffle(array.range(12))
[ 9, 7, 0, 8, 2, 10, 3, 1, 11, 4, 5, 6 ]
```

```javascript
> string.camelToSnake('someNightsIStayUpCashingInMyBadLuck')
'some_nights_i_stay_up_cashing_in_my_bad_luck'
```

```javascript
> string.snakeToCamel('some_nights_i_call_it_a_draw')
'someNightsICallItADraw'
```

```javascript
> utils.dict([['a', 'b'], ['c', 'd'], ['e', 'f']])
{ a: 'b', c: 'd', e: 'f' }
```

```javascript
> array.flatten(Object.entries({ a: 'b', c: 'd', e: 'f' }))
[ 'a', 'b', 'c', 'd', 'e', 'f' ]
```

```javascript
> utils.swap({ a: 'b', c: 'd', e: 'f' })
{ b: 'a', d: 'c', f: 'e' }
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
> string.big(4)
'xxxxxxxxxxxxxxxx'
```
