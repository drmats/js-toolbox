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
> [array, async, math, utils] =
... ["array", "async", "math", "utils"].map(
...     m => require("./build/" + m + ".js")
... )
[ { first: [Function: first],
    flatten: [Function: flatten],
    last: [Function: last],
    range: [Function: range],
    shuffle: [Function: shuffle],
    sparse: [Function: sparse] },
{ timeout: [Function: timeout], delay: [Function: delay] },
{ log10: [Function: log10], log2: [Function: log2] },
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
