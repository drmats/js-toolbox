# js-toolbox

Various JS utilities.




## installation

```bash
$ npm install
```




## build

```bash
$ npm run build
```




## usage / experimenting

```bash
$ node
```

```javascript
> [array, async, math, string, utils] =
... ["array", "async", "math", "string", "utils"].map(
...     m => require("./build/" + m + ".js")
... )
[ { flatten: [Function: flatten],
    head: [Function: head],
    init: [Function: init],
    last: [Function: last],
    range: [Function: range],
    shuffle: [Function: shuffle],
    sparse: [Function: sparse],
    tail: [Function: tail] },
  { delay: [Function: delay], timeout: [Function: timeout] },
  { log10: [Function: log10], log2: [Function: log2] },
  { camelToPascal: [Function: camelToPascal],
    camelToSnake: [Function: camelToSnake],
    capitalize: [Function: capitalize],
    empty: [Function: empty],
    pascalToCamel: [Function: pascalToCamel],
    pascalToSnake: [Function: pascalToSnake],
    snakeToCamel: [Function: snakeToCamel],
    snakeToPascal: [Function: snakeToPascal] },
  { choose: [Function: choose],
    createReducer: [Function: createReducer],
    dict: [Function: dict],
    handleException: [Function: handleException],
    swap: [Function: swap] } ]

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
> string.camelToSnake('someNightsIStayUpCashingInMyBadLuck')
'some_nights_i_stay_up_cashing_in_my_bad_luck'
```

```javascript
> string.snakeToCamel('some_nights_i_call_it_a_draw')
'someNightsICallItADraw'
```
