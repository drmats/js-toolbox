# js-toolbox

Useful JavaScript utilities.

[![npm version](https://img.shields.io/npm/v/@xcmats/js-toolbox.svg)](https://www.npmjs.com/package/@xcmats/js-toolbox)
[![npm license](https://img.shields.io/npm/l/@xcmats/js-toolbox.svg)](https://www.npmjs.com/package/@xcmats/js-toolbox)
[![GitHub top language](https://img.shields.io/github/languages/top/drmats/js-toolbox.svg)](https://github.com/drmats/js-toolbox)
[![GitHub code size](https://img.shields.io/github/languages/code-size/drmats/js-toolbox.svg)](https://github.com/drmats/js-toolbox)
[![GitHub tag](https://img.shields.io/github/tag/drmats/js-toolbox.svg)](https://github.com/drmats/js-toolbox)

```bash
$ npm i @xcmats/js-toolbox
```

Works in [node.js](https://nodejs.org/) and browser environments
(use [webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/)
to bundle it with your project).

<br />




## index

* [documentation](#documentation)
* [play in your browser](#play-in-your-browser)
* [use the package](#use-the-package)
    - [install](#install)
    - [play in node.js](#play-in-nodejs)
    - [example use in your source code](#example-use-in-your-source-code)
* [use the source](#use-the-source)
* [namespaces](#namespaces)
    - [array](#array-utilities)
    - [async](#asynchronous-programming-helpers)
    - [codec](#typedarray-codersdecoders)
    - [func](#functional-programming-tools)
    - [math](#basic-math)
    - [redux](#some-goodies-for-redux)
    - [string](#string-utilities)
    - [struct](#data-structure-manipulation-tools)
    - [type](#type-helpers)
    - [utils](#uncategorized-utilities)
* [examples](#examples)
    - [array manipulation](#array-manipulation)
    - [asynchronous programming](#asynchronous-programming)
    - [base64 encoding and decoding](#base64-encoding-and-decoding)
    - [hex encoding and decoding](#hex-encoding-and-decoding)
    - [byte array manipulation](#byte-array-manipulation)
    - [functional programming](#functional-programming)
    - [simple math](#simple-math)
    - [operating on strings](#operating-on-strings)
    - [data structure manipulation](#data-structure-manipulation)
    - [type primitives](#type-primitives)
* [notes](#notes)
* [license](#license)

<br />




## documentation

> [API Reference](https://drmats.github.io/js-toolbox/)

<br />




## play in your browser

> [RunKit with @xcmats/js-toolbox](https://npm.runkit.com/@xcmats/js-toolbox)

* list member functions ([link](https://runkit.com/embed/r1c9vte7yz3b)):

    ```javascript
    var jsToolbox = require("@xcmats/js-toolbox")

    Object.keys(jsToolbox).sort()
    ```

    > ```javascript
    > [ "Y",
    >   "access",
    >   "add",
    >   "array",
    >   "asciiLetters",
    >   "asciiLowercase",
    >   "asciiUppercase",
    >   "async",
    >   "asyncMap",
    >   "asyncReduce",
    >   "asyncRepeat",
    >   "average",
    >   "b64dec",
    >   "b64enc",
    >   ... ]
    > ```

* play with `shuffle` and `range` ([link](https://runkit.com/embed/pdk4lfc4ul51)):

    ```javascript
    jsToolbox.shuffle(jsToolbox.range(16))
    ```

    > ```javascript
    > [ 14, 12, 15, 8, 13, 4, 5, 6, 1, 7, 10, 0, 2, 3, 9, 11 ]
    > ```

* do all other things shown in **examples** section below

<br />




## use the package

### install

```bash
$ mkdir playground
$ cd playground/
$ npm init
...
$ npm i @xcmats/js-toolbox
...
```

<br />


### play in node.js

```bash
$ node
>
```

```javascript
t = require("@xcmats/js-toolbox")
```

> ```javascript
> { ...
> array:
>  { ... },
> ...
> utils:
>  { ... } }
> ```

<br />


### example use in your source code

```javascript
import {
    array,
    codec,
    func,
    string,
} from "@xcmats/js-toolbox"

const b64stringify = func.flow(
    JSON.stringify,
    codec.stringToB64
)

let stupidIdea = b64stringify({
    tenNumbers: array.range(10),
    randomLetters: string.random(20)
})

console.log(
    "Stringified and b64-encoded object: ",
    stupidIdea
)
```

<br />




## use the source

```bash
$ git clone git@github.com:drmats/js-toolbox.git
Cloning into 'js-toolbox'...
$ cd js-toolbox
$ npm i
$ npm start
Compiling for 'commonjs' ...
🎉  Successfully compiled 11 files with Babel.
>
```

<br />




## namespaces

If you're experimenting via _RunKit_ then prepend all namespaces with "`jsToolbox.`"
and if you're experimenting inside _node.js console_ with _npm_ package (as described
above) then prepend all namespaces with "`t.`". If you're using the source
and have launched _node.js_ session via `npm start` then you're good to go
( [`¯\_(ツ)_/¯`](https://i.imgur.com/Bw6D5zZ.gif) ).


### **array** utilities

```javascript
array
```

> ```javascript
> { countBy: [Function: countBy],
>   draw: [Function: draw],
>   drop: [Function: drop],
>   dropLast: [Function: dropLast],
>   findDuplicates: [Function: findDuplicates],
>   flatten: [Function: flatten],
>   head: [Function: head],
>   init: [Function: init],
>   intersection: [Function: intersection],
>   isContinuous: [Function: isContinuous],
>   isSorted: [Function: isSorted],
>   isSubset: [Function: isSubset],
>   last: [Function: last],
>   range: [Function: range],
>   removeDuplicates: [Function],
>   shuffle: [Function: shuffle],
>   sparse: [Function: sparse],
>   tail: [Function: tail],
>   take: [Function: take],
>   takeEvery: [Function: takeEvery],
>   takeLast: [Function: takeLast],
>   zipWith: [Function: zipWith],
>   zip: [Function] }
> ```


### **asynchronous programming** helpers

```javascript
async
```

> ```javascript
> { cancellable: [Function: cancellable],
>   createMutex: [Function: createMutex],
>   delay: [Function: delay],
>   interval: [Function: interval],
>   map: [Function: map],
>   parMap: [Function: parMap],
>   race: [Function: race],
>   reduce: [Function: reduce],
>   repeat: [Function: repeat],
>   timeout: [Function: timeout] }
> ```


### **[TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)** coders/decoders

```javascript
codec
```

> ```javascript
> { concatBytes: [Function: concatBytes],
>   compareBytes: [Function: compareBytes],
>   stringToBytes: [Function],
>   bytesToString: [Function],
>   hexToBytes: [Function: hexToBytes],
>   bytesToHex: [Function: bytesToHex],
>   b64dec: [Function],
>   b64enc: [Function],
>   b64ToString: [Function],
>   stringToB64: [Function],
>   b64ToHex: [Function],
>   hexToB64: [Function] }
> ```


### **functional programming tools**

```javascript
func
```

> ```javascript
> { choose: [Function: choose],
>   compose: [Function: compose],
>   curry: [Function: curry],
>   curryN: [Function: curryN],
>   curryThunk: [Function: curryThunk],
>   flow: [Function: flow],
>   identity: [Function: identity],
>   locker: [Function: locker],
>   partial: [Function: partial],
>   pipe: [Function: pipe],
>   rearg: [Function: rearg],
>   Y: [Function: Y] }
> ```


### basic **math**

```javascript
math
```

> ```javascript
> { add: [Function],
>   average: [Function: average],
>   clamp: [Function: clamp],
>   dec: [Function],
>   div: [Function],
>   inc: [Function],
>   inv: [Function],
>   log10: [Function: log10],
>   log2: [Function: log2],
>   mod: [Function],
>   mul: [Function],
>   neg: [Function],
>   pow: [Function],
>   product: [Function: product],
>   randomInt: [Function: randomInt],
>   roundIfClose: [Function: roundIfClose],
>   sub: [Function],
>   sum: [Function: sum] }
> ```


### some goodies for **[redux](https://redux.js.org/)**

```javascript
redux
```

> ```javascript
> { createReducer: [Function: createReducer] }
> ```


### **string** utilities

```javascript
string
```

> ```javascript
> { asciiLetters: [Function: asciiLetters],
>   asciiLowercase: [Function: asciiLowercase],
>   asciiUppercase: [Function: asciiUppercase],
>   big: [Function],
>   camelToPascal: [Function: camelToPascal],
>   camelToSnake: [Function: camelToSnake],
>   capitalize: [Function: capitalize],
>   digits: [Function: digits],
>   ellipsis: { [Function: ellipsis] BEGIN: 0, MIDDLE: 1, END: 2 },
>   empty: [Function: empty],
>   space: [Function: space],
>   nl: [Function: nl],
>   tab: [Function: tab],
>   padLeft: [Function: padLeft],
>   padRight: [Function: padRight],
>   pascalToCamel: [Function: pascalToCamel],
>   pascalToSnake: [Function: pascalToSnake],
>   quote: [Function: quote],
>   random: [Function: random],
>   shorten: { [Function: shorten] BEGIN: 0, MIDDLE: 1, END: 2 },
>   snakeToCamel: [Function: snakeToCamel],
>   snakeToPascal: [Function: snakeToPascal],
>   wrap: [Function: wrap] }
> ```


### data structure manipulation tools

```javascript
struct
```

> ```javascript
> { access: [Function: access],
>   clone: [Function],
>   hashAccessor: [Function: hashAccessor],
>   keyAccessor: [Function: keyAccessor],
>   dfs: [Function: dfs],
>   dict: [Function: dict],
>   objectMap: [Function: objectMap],
>   objectReduce: [Function: objectReduce],
>   swap: [Function: swap] }
> ```


### **type** helpers

```javascript
type
```

> ```javascript
> { isArray: [Function: isArray],
>   isFunction: [Function: isFunction],
>   isNumber: [Function: isNumber],
>   isObject: [Function: isObject],
>   isString: [Function: isString],
>   maxInt: 9007199254740991,
>   minInt: -9007199254740991,
>   nullToUndefined: [Function: nullToUndefined],
>   toBool: [Function: toBool] }
> ```


### uncategorized **utilities**

```javascript
utils
```

> ```javascript
> { devEnv: [Function: devEnv],
>   getLibConfig: [Function: getLibConfig],
>   getProcess: [Function: getProcess],
>   handleException: [Function: handleException],
>   handleRejection: [Function: handleRejection],
>   isBrowser: [Function: isBrowser],
>   rgb: [Function: rgb],
>   rgba: [Function: rgba],
>   run: [Function: run],
>   timeUnit: { ... },
>   to_: [Function: to_],
>   url: [Function: url] }
> ```

<br />




## examples

### array manipulation

* Find the lenghts of the words in a given sentence
    and count how many of them exists in each length group.

    ```javascript
    array.countBy(
        'exemplo plus quam ratione vivimus'.split(' '),
        (w) => w.length
    )
    ```

    > ```javascript
    > { '4': 2, '7': 3 }
    > ```


* Choose a random element from a given `array`
    (or a random character from a given `string`).

    ```javascript
    array.draw(string.asciiLetters())
    ```

    > ```javascript
    > 'S'
    > ```


* Find duplicates in a given `array`.

    ```javascript
    array.findDuplicates(['one', 'two', 'one', 'six', 'two', 'two'])
    ```

    > ```javascript
    > [ 'one', 'two' ]
    > ```


* Flatten passed `array`, i.e. transform
    `[[1, 2,], ..., [3, 4,],]` to `[1, 2, ..., 3, 4,]`.

    ```javascript
    array.flatten(Object.entries({ a: 'b', c: 'd', e: 'f' }))
    ```

    > ```javascript
    > [ 'a', 'b', 'c', 'd', 'e', 'f' ]
    > ```


* Return a list containing an arithmetic progression.
    `range(i, j)` returns `[i, i+1, i+2, ..., j-1]`.
    Possible invocations are: `range(stop)`, `range(start, stop)`,
    `range(start, stop, step)`. When `start` is omitted it defaults to `0`.
    When `step` is given, it specifies the increment (or decrement).

    ```javascript
    array.range(10)
    ```

    > ```javascript
    > [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    > ```

    ```javascript
    array.range(-128, -256, -16)
    ```

    > ```javascript
    > [ -128, -144, -160, -176, -192, -208, -224, -240 ]
    > ```


* Randomly shuffle all elements in the given `array` (Durstenfeld's
    modification to the Fisher-Yates shuffle algorithm).
    The operation is taken in-place.

    ```javascript
    array.shuffle(array.range(12))
    ```

    > ```javascript
    > [ 9, 7, 0, 8, 2, 10, 3, 1, 11, 4, 5, 6 ]
    > ```


* Generate sparse array of distinct integers.
    `sparse(stop, size)` returns `array` of `size` distinct
    integers in range `[0..stop-1]`.
    `sparse(start, stop, size)` returns `array` of `size` distinct
    integers in range `[start..stop-1]`.

    ```javascript
    array.sparse(1024, 8)
    ```

    > ```javascript
    > [ 6, 34, 170, 422, 530, 643, 855, 862 ]
    > ```


* "Zip" given arrays using provided `f` operator.

    ```javascript
    array.zipWith((a, b) => a + b)([1, 2, 3, 4], [10, 20, 30, 40])
    ```

    > ```javascript
    > [ 11, 22, 33, 44 ]
    > ```


* Take every 3rd element from a given array.

    ```javascript
    array.takeEvery(3)([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    ```

    > ```javascript
    > [0, 3, 6, 9]
    > ```

<br />


### asynchronous programming

* Delay current async execution by `time` miliseconds.

    ```javascript
    (async () => {
        await async.delay()
        console.log('Hello ...')
        await async.delay()
        console.log('... world')
    })()
    ```

    > ```javascript
    > Promise { <pending> }
    > Hello ...
    > ... world
    > ```


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

    > ```javascript
    > Promise { <pending> }
    > 0
    > 4
    > 8
    > 12
    > 16
    > 20
    > 24
    > 28
    > 32
    > 36
    > Result: 0,4,8,12,16,20,24,28,32,36
    > ```


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

    > ```javascript
    > Promise { <pending> }
    > 24
    > 8
    > 16
    > 12
    > 28
    > 20
    > 0
    > 36
    > 32
    > 4
    > Result: 0,4,8,12,16,20,24,28,32,36
    > ```


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

    > ```javascript
    > Promise { <pending> }
    > 0
    > 1
    > 3
    > 6
    > 10
    > 15
    > 21
    > 28
    > 36
    > 45
    > Accumulated value: 45
    > ```

<br />


### base64 encoding and decoding

* Convert UTF-8 string into an array of bytes.

    ```javascript
    codec.stringToBytes('Koń: 🐎')
    ```

    > ```javascript
    > Uint8Array [ 75, 111, 197, 132, 58, 32, 240, 159, 144, 142 ]
    > ```


* Convert array of bytes into a UTF-8 string.

    ```javascript
    data = Uint8Array.from([70, 111, 120, 58, 32, 240, 159, 166, 138])
    ```

    > ```javascript
    > Uint8Array [ 70, 111, 120, 58, 32, 240, 159, 166, 138 ]
    > ```

    ```javascript
    codec.bytesToString(data)
    ```

    >```javascript
    >'Fox: 🦊'
    >```


* Encode given byte array to Base64.
    **Base64 encoding in _browser_ and _node.js_.**

    ```javascript
    data = Uint8Array.from([240, 159, 142, 169, 240, 159, 144, 176])
    ```

    > ```javascript
    > Uint8Array [ 240, 159, 142, 169, 240, 159, 144, 176 ]
    > ```

    ```javascript
    codec.b64enc(data)
    ```

    > ```javascript
    > '8J+OqfCfkLA='
    > ```


* Decode given Base64 string to byte array.
    **Base64 decoding in _browser_ and _node.js_.**

    ```javascript
    data = codec.b64dec('8J+OqfCfkLA=')
    ```

    > ```javascript
    > Uint8Array [ 240, 159, 142, 169, 240, 159, 144, 176 ]
    > ```

    ```javascript
    codec.bytesToString(data)
    ```

    > ```javascript
    > '🎩🐰'
    > ```

<br />


### hex encoding and decoding

* Convert hex-encoded string to a byte representation.

    ```javascript
    codec.hexToBytes('cabafa87')
    ```

    > ```javascript
    > Uint8Array [ 202, 186, 250, 135 ]
    > ```

    ```javascript
    codec.hexToBytes('0x1234567890ABCDEF')
    ```

    > ```javascript
    > Uint8Array [ 18, 52, 86, 120, 144, 171, 205, 239 ]
    > ```


* Convert byte representation to a hex-encoded string.

    ```javascript
    codec.bytesToHex(Uint8Array.from([31, 63, 127, 255]))
    ```

    > ```javascript
    > '1f3f7fff'
    > ```

<br />


### byte array manipulation

* Concatenate contents of a given byte arrays.

    ```javascript
    codec.concatBytes(
        Uint8Array.from([255, 255, 0, 0]),
        codec.stringToBytes('🌍'),
        Uint8Array.from([128, 64])
    )
    ```

    > ```javascript
    > Uint8Array [ 255, 255, 0, 0, 240, 159, 140, 141, 128, 64 ]
    > ```


* Compare two byte arrays.

    ```javascript
    codec.compareBytes(
        codec.stringToBytes('𝓬𝓸𝓭𝓮'.normalize('NFC')),
        codec.stringToBytes('𝐜𝐨𝐝𝐞'.normalize('NFC'))
    )
    ```

    > ```javascript
    > false
    > ```

    ```javascript
    codec.compareBytes(codec.hexToBytes('0xFF'), Uint8Array.from([255]))
    ```

    > ```javascript
    > true
    > ```

<br />


### functional programming

* Function composition.

    ```javascript
    func.compose(
        string.quote,
        string.shorten
    )(
        "When I find myself in times of trouble",
        20, string.shorten.END
    )
    ```

    > ```javascript
    > '"When I find myself …"'
    > ```

    ```javascript
    stringToHex = func.flow(codec.stringToBytes, codec.bytesToHex)
    ```

    > ```javascript
    > [Function]
    > ```

    ```javascript
    stringToHex('Kaboom! 💥')
    ```

    > ```javascript
    > '4b61626f6f6d2120f09f92a5'
    > ```

    ```javascript
    func.pipe('4b61626f6f6d2120f09f92a5')(
        codec.hexToBytes, codec.bytesToString
    )
    ```

    > ```javascript
    > 'Kaboom! 💥'
    > ```


* Translate the evaluation of function `f` taking multiple arguments
    into an evaluation of sequence of functions, each with a single argument.

    ```javascript
    addition = (a, b, c) => a + b + c
    ```

    > ```javascript
    > [Function: addition]
    > ```

    ```javascript
    func.curry(addition)(1)(2)(3)
    ```

    > ```javascript
    > 6
    > ```


 * Function arguments rearrangement.

    ```javascript
    console.log('a', 'b', 'c', 'd', 'e')
    ```

    > ```javascript
    > a b c d e
    > ```

    ```javascript
    revConsole = rearg(console.log)(4, 3, 2, 1, 0)
    revConsole('a', 'b', 'c', 'd', 'e')
    ```

    > ```javascript
    > e d c b a
    > ```

    ```javascript
    revConsole('f')('g', 'h')('i')('j')
    ```

    > ```javascript
    > j i h g f
    > ```


* Y-combinator - returns fixed point of a higher-order function passed as `f`.
    **Anonymous recursion in Javascript**.

    ```javascript
    factorial = func.Y((r) => (n) => n <= 0  ?  1  :  n * r(n - 1))
    ```

    > ```javascript
    > [Function]
    > ```

    ```javascript
    factorial(5)
    ```

    > ```javascript
    > 120
    > ```

<br />


### simple math

* Compute mathematical average of array of numbers.

    ```javascript
    math.average([1, 2, 3, 4, 5])
    ```

    > ```javascript
    > 3
    > ```


* Base 2 logarithm.

    ```javascript
    math.log2(2**32)
    ```

    > ```javascript
    > 32
    > ```


* Base 10 logarithm.

    ```javascript
    math.log10(1e9)
    ```

    > ```javascript
    > 9
    > ```


* Sum of numbers in passed `array`.

    ```javascript
    math.sum([5, 6, 7, 8, 9, 10])
    ```

    > ```javascript
    > 45
    > ```

<br />


### operating on strings

* Allocate a **big** string (of size `2^n`).

    ```javascript
    string.big(5)
    ```

    > ```javascript
    > 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    > ```


* Convert `camelText` to `snake_text`.

    ```javascript
    string.camelToSnake('someNightsIStayUpCashingInMyBadLuck')
    ```

    > ```javascript
    > 'some_nights_i_stay_up_cashing_in_my_bad_luck'
    > ```


* Quote text.

    ```javascript
    string.quote('div', '<>')
    ```

    > ```javascript
    > '<div>'
    > ```


* Construct random string of desired length.

    ```javascript
    string.random(16)
    ```

    > ```javascript
    > 'MxWGe8MoOss0yUAP'
    > ```


* Shorten a given string to the desired length.

    ```javascript
    string.shorten('abcdefghijklmnopqrstuvwxyz', 15)
    ```

    > ```javascript
    > 'abcdefg…tuvwxyz'
    > ```

    ```javascript
    string.shorten(
        'To be, or not to be, that is the question',
        20,
        string.shorten.END
    )
    ```

    > ```javascript
    > 'To be, or not to be…'
    > ```


* Convert `snake_text` to `camelText`.

    ```javascript
    string.snakeToCamel('some_nights_i_call_it_a_draw')
    ```

    > ```javascript
    > 'someNightsICallItADraw'
    > ```

<br />


### data structure manipulation

* Apply `path` to an object.

    ```javascript
    struct.access({ a: { b: { c: 42 } } }, ['a', 'b', 'c'])
    ```

    > ```javascript
    > 42
    > ```


* Construct `Object` from the result of `Object.entries()` call.
    `entries = [[k1, v1,], ..., [kn, vn,]]`

    ```javascript
    struct.dict([['a', 'b'], ['c', 'd'], ['e', 'f']])
    ```

    > ```javascript
    > { a: 'b', c: 'd', e: 'f' }
    > ```


* Shallow map (iteration) on objects.

    ```javascript
    struct.objectMap(
        { what: 'od', i: '?rof dnats' },
        ([k, v,]) => [
            string.capitalize(k),
            v.split('').reverse().join('')
        ]
    )
    ```

    > ```javascript
    > { What: 'do', I: 'stand for?' }
    > ```


* Swap keys with values in a given `Object`.

    ```javascript
    struct.swap({ a: 'b', c: 'd', e: 'f' })
    ```

    > ```javascript
    > { b: 'a', d: 'c', f: 'e' }
    > ```

</br>


### type primitives

* Determine if a given value is a proper `Number`
    (not `NaN` and not `Infinity`).

    ```javascript
    type.isNumber(NaN)
    ```

    > ```javascript
    > false
    > ```

    ```javascript
    type.isNumber(-Infinity)
    ```

    > ```javascript
    > false
    > ```

    ```javascript
    type.isNumber(1234.5678)
    ```

    > ```javascript
    > true
    > ```


* Determine if a given value is an `Object`
    (not `null`, not `undefined` and not `Array`).

    ```javascript
    type.isObject(null)
    ```

    > ```javascript
    > false
    > ```

    ```javascript
    type.isObject([])
    ```

    > ```javascript
    > false
    > ```

    ```javascript
    type.isObject({})
    ```

    > ```javascript
    > true
    > ```

<br />




## notes

This library is suitable to use in server and browser environments
and it is being used as such.
Go ahead and [file an issue](https://github.com/drmats/js-toolbox/issues/new)
if you found a bug 🐞.

</br>




## support

You can support this project via [stellar][stellar] network:

* Payment address: [xcmats*keybase.io][xcmatspayment]
* Stellar account ID: [`GBYUN4PMACWBJ2CXVX2KID3WQOONPKZX2UL4J6ODMIRFCYOB3Z3C44UZ`][addressproof]

<br />




## license

**js-toolbox** is released under the Apache License, Version 2.0. See the
[LICENSE](https://github.com/drmats/js-toolbox/blob/master/LICENSE)
for more details.




[stellar]: https://learn.stellar.org
[xcmatspayment]: https://keybase.io/xcmats
[addressproof]: https://keybase.io/xcmats/sigchain#d0999a36b501c4818c15cf813f5a53da5bfe437875d92262be8d285bbb67614e22
