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




## experimenting in browser

> [RunKit with @xcmats/js-toolbox](https://npm.runkit.com/@xcmats/js-toolbox)

* list member functions ([link](https://runkit.com/embed/r1c9vte7yz3b)):

    ```javascript
    var jsToolbox = require("@xcmats/js-toolbox")

    Object.keys(jsToolbox).sort()
    ```

    ```javascript
    [ "Y",
    "access",
    "asciiLetters",
    "asciiLowercase",
    "asciiUppercase",
    "asyncMap",
    "asyncReduce",
    "average",
    "bigString",
    "camelToPascal",
    "camelToSnake",
    "capitalize",
    "choose",
    ... ]
    ```

* play with `shuffle` and `range` ([link](https://runkit.com/embed/pdk4lfc4ul51)):

    ```javascript
    jsToolbox.shuffle(jsToolbox.range(16))
    ```

    ```javascript
    [ 14, 12, 15, 8, 13, 4, 5, 6, 1, 7, 10, 0, 2, 3, 9, 11 ]
    ```

<br />




## experimenting in [node.js](https://nodejs.org/)

```bash
$ git clone git@github.com:drmats/js-toolbox.git
Cloning into 'js-toolbox'...
$ cd js-toolbox
$ npm i
$ npm start
🎉  Successfully compiled 9 files with Babel.
```

```javascript
> array
{ countBy: [Function: countBy],
  draw: [Function: draw],
  findDuplicates: [Function: findDuplicates],
  flatten: [Function: flatten],
  head: [Function: head],
  init: [Function: init],
  last: [Function: last],
  range: [Function: range],
  shuffle: [Function: shuffle],
  sparse: [Function: sparse],
  tail: [Function: tail] }
```

```javascript
> async
{ delay: [Function: delay],
  interval: [Function: interval],
  map: [Function: map],
  parMap: [Function: parMap],
  reduce: [Function: reduce],
  repeat: [Function: repeat],
  timeout: [Function: timeout] }
```

```javascript
> func
{ curry: [Function: curry],
  partial: [Function: partial],
  Y: [Function: Y] }
```

```javascript
> math
{ average: [Function: average],
  log10: [Function: log10],
  log2: [Function: log2],
  roundIfClose: [Function: roundIfClose],
  sum: [Function: sum] }
```

```javascript
> redux
{ createReducer: [Function: createReducer] }
```

```javascript
> string
{ asciiLetters: [Function: asciiLetters],
  asciiLowercase: [Function: asciiLowercase],
  asciiUppercase: [Function: asciiUppercase],
  big: [Function],
  camelToPascal: [Function: camelToPascal],
  camelToSnake: [Function: camelToSnake],
  capitalize: [Function: capitalize],
  digits: [Function: digits],
  ellipsis: { [Function: ellipsis] BEGIN: 0, MIDDLE: 1, END: 2 },
  empty: [Function: empty],
  pascalToCamel: [Function: pascalToCamel],
  pascalToSnake: [Function: pascalToSnake],
  quote: [Function: quote],
  random: [Function: random],
  shorten: { [Function: shorten] BEGIN: 0, MIDDLE: 1, END: 2 },
  snakeToCamel: [Function: snakeToCamel],
  snakeToPascal: [Function: snakeToPascal],
  wrap: [Function: wrap] }
```

```javascript
> type
{ isFunction: [Function: isFunction],
  isNumber: [Function: isNumber],
  isObject: [Function: isObject],
  isString: [Function: isString],
  maxInt: 9007199254740991,
  minInt: -9007199254740991,
  nullToUndefined: [Function: nullToUndefined],
  toBool: [Function: toBool] }
```

```javascript
> utils
{ access: [Function: access],
  choose: [Function: choose],
  clone: [Function: clone],
  dict: [Function: dict],
  handleException: [Function: handleException],
  identity: [Function: identity],
  objectMap: [Function: objectMap],
  objectReduce: [Function: objectReduce],
  randomInt: [Function: randomInt],
  swap: [Function: swap],
  timeUnit: { ... } }
```

<br />




## examples

* Find the lenghts of the words in a given sentence
  and count how many of them exists in each length group.

    ```javascript
    > array.countBy(
    ...     'exemplo plus quam ratione vivimus'.split(' '),
    ...     (w) => w.length
    ... )
    { '4': 2, '7': 3 }
    ```


* Choose a random element from a given `array`
  (or a random character from a given `string`).

    ```javascript
    > array.draw(string.asciiLetters())
    'S'
    ```


* Find duplicates in a given `array`.

    ```javascript
    > array.findDuplicates(['one', 'two', 'one', 'three', 'six', 'two', 'two'])
    [ 'one', 'two' ]
    ```


* Flatten passed `array`, i.e. transform
  `[[1, 2,], ..., [3, 4,],]` to `[1, 2, ..., 3, 4,]`.

    ```javascript
    > array.flatten(Object.entries({ a: 'b', c: 'd', e: 'f' }))
    [ 'a', 'b', 'c', 'd', 'e', 'f' ]
    ```


* Return a list containing an arithmetic progression.
  `range(i, j)` returns `[i, i+1, i+2, ..., j-1]`.
  Possible invocations are: `range(stop)`, `range(start, stop)`,
  `range(start, stop, step)`. When `start` is omitted it defaults to `0`.
  When `step` is given, it specifies the increment (or decrement).

    ```javascript
    > array.range(10)
    [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

    > array.range(-128, -256, -16)
    [ -128, -144, -160, -176, -192, -208, -224, -240 ]
    ```


* Randomly shuffle all elements in the given `array` (Durstenfeld's
  modification to the Fisher-Yates shuffle algorithm).
  The operation is taken in-place.

    ```javascript
    > array.shuffle(array.range(12))
    [ 9, 7, 0, 8, 2, 10, 3, 1, 11, 4, 5, 6 ]
    ```


* Generate sparse array of distinct integers.
  `sparse(stop, size)` returns `array` of `size` distinct
  integers in range `[0..stop-1]`.
  `sparse(start, stop, size)` returns `array` of `size` distinct
  integers in range `[start..stop-1]`.

    ```javascript
    > array.sparse(1024, 8)
    [ 6, 34, 170, 422, 530, 643, 855, 862 ]
    ```


* Delay current async execution by `time` miliseconds.

    ```javascript
    (async () => {
        await async.delay()
        console.log('Hello ...')
        await async.delay()
        console.log('... world')
    })()
    ```


* Invoke a sequence of asynchronous operations on an array of elements.

    ```javascript
    (async () => {
        let x = await async.map(
            array.range(10),
            (x) => async.timeout(() => {
                console.log(4*x);
                return 4*x;
            }, array.head(array.sparse(1000, 1)))
        )
        console.log(`Result: ${x}`)
    })()
    ```


* Paralelly execute operation on each element of the array.

    ```javascript
    (async () => {
        let x = await async.parMap(
            array.range(10),
            (x) => async.timeout(() => {
                console.log(4*x);
                return 4*x;
            }, array.head(array.sparse(1000, 1)))
        )
        console.log(`Result: ${x}`)
    })()
    ```


* Accumulate value over an array of elements using asynchronous operation.

    ```javascript
    (async () => {
        let x = await async.reduce(
            array.range(10),
            (acc, x) => async.timeout(() => {
                console.log(acc+x);
                return acc+x;
            }, 100*x)
        )
        console.log(`Accumulated value: ${x}`)
    })()
    ```


* Translate the evaluation of function `f` taking multiple arguments
  into an evaluation of sequence of functions, each with a single argument.

    ```javascript
    > sum = (...args) => math.sum(args)
    [Function: sum]

    > func.curry(sum)(1)(2)(3)(4)(5)()
    15
    ```


* Y-combinator - returns fixed point of a higher-order function passed as `f`.
  **Anonymous recursion in Javascript**.

    ```javascript
    > factorial = func.Y((r) => (n) => n <= 0  ?  1  :  n * r(n - 1))
    [Function]

    > factorial(5)
    120
    ```


* Compute mathematical average of array of numbers.

    ```javascript
    > math.average([1, 2, 3, 4, 5])
    3
    ```


* Base 2 logarithm.

    ```javascript
    > math.log2(2**32)
    32
    ```


* Base 10 logarithm.

    ```javascript
    > math.log10(1e9)
    9
    ```


* Sum of numbers in passed `array`.

    ```javascript
    > math.sum([5, 6, 7, 8, 9, 10])
    45
    ```


* Allocate a **big** string (of size `2^n`).

    ```javascript
    > string.big(5)
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    ```


* Convert `camelText` to `snake_text`.

    ```javascript
    > string.camelToSnake('someNightsIStayUpCashingInMyBadLuck')
    'some_nights_i_stay_up_cashing_in_my_bad_luck'
    ```


* Quote text.

    ```javascript
    > string.quote('div', '<>')
    '<div>'
    ```


* Construct random string of desired length.

    ```javascript
    > string.random(16)
    'MxWGe8MoOss0yUAP'
    ```


* Shorten a given string to the desired length.

    ```javascript
    > string.shorten('abcdefghijklmnopqrstuvwxyz', 15)
    'abcdefg…tuvwxyz'

    > string.shorten(
    ...     'To be, or not to be, that is the question',
    ...     20,
    ...     string.shorten.END
    ... )
    'To be, or not to be…'
    ```


* Convert `snake_text` to `camelText`.

    ```javascript
    > string.snakeToCamel('some_nights_i_call_it_a_draw')
    'someNightsICallItADraw'
    ```


* Determine if a given value is a proper `Number`
  (not `NaN` and not `Infinity`).

    ```javascript
    > type.isNumber(NaN)
    false

    > type.isNumber(-Infinity)
    false

    > type.isNumber(1234.5678)
    true
    ```


* Determine if a given value is an `Object`
  (not `null`, not `undefined` and not `Array`).

    ```javascript
    > type.isObject(null)
    false

    > type.isObject([])
    false

    > type.isObject({})
    true
    ```


* Apply `path` to an object.

    ```javascript
    > utils.access({ a: { b: { c: 42 } } }, ['a', 'b', 'c'])
    42
    ```


* Construct `Object` from the result of `Object.entries()` call.
  `entries = [[k1, v1,], ..., [kn, vn,]]`

    ```javascript
    > utils.dict([['a', 'b'], ['c', 'd'], ['e', 'f']])
    { a: 'b', c: 'd', e: 'f' }
    ```


* Shallow map (iteration) on objects.

    ```javascript
    > utils.objectMap(
    ...     { what: 'od', i: '?rof dnats' },
    ...     ([k, v,]) => [
    ...         string.capitalize(k),
    ...         v.split('').reverse().join('')
    ...     ]
    ... )
    { What: 'do', I: 'stand for?' }
    ```


* Swap keys with values in a given `Object`.

    ```javascript
    > utils.swap({ a: 'b', c: 'd', e: 'f' })
    { b: 'a', d: 'c', f: 'e' }
    ```
