//
// Choose a random element from a non-empty array.
//
export const draw = (arr) => arr[Math.floor(Math.random()*1e16) % arr.length]




//
// Simple array flattener.
// [[1, 2,], ..., [3, 4,],]  ->  [1, 2, ..., 3, 4,]
//
export const flatten = (arr) => arr.reduce((acc, el) => acc.concat(el), [])




//
// Return first element of the given array.
//
export const head = (arr) => arr[0]




//
// Returns array without its last element.
//
export const init = (arr) => arr.slice(0, arr.length-1)




//
// Return last element of the given array.
//
export const last = (arr) => arr[arr.length-1]




//
// range(stop) -> array of integers; start defaults to 0
// range(start, stop[, step]) -> array of numbers
//
// Return a list containing an arithmetic progression.
// range(i, j) returns [i, i+1, i+2, ..., j-1].
// When step is given, it specifies the increment (or decrement).
// For example, range(4) returns [0, 1, 2, 3].
//
// imitates Python's range()
//
export const range = (...args) => {
    let start = 0, stop = 0, step = 1, arr = []

    if (args.length === 1) { [stop,] = args }
    else if (args.length === 2) { [start, stop,] = args }
    else if (args.length === 3) {
        [start, stop, step,] = args
        if (step === 0) throw new RangeError(
            "range() 'step' argument must not be zero"
        )
    } else throw new TypeError(
        `range() expected at most 3 arguments, got ${args.length}`
    )

    while (
        (start < stop  &&  step > 0)  ||
        (start > stop  &&  step < 0)
    ) {
        arr[arr.length] = start
        start += step
    }

    return arr
}




//
// Randomly shuffle all elements in the given array
// (Durstenfeld's modification to the Fisher-Yates shuffle algorithm).
// The operation is taken in-place.
//
export const shuffle = (arr) => {
    if (!Array.isArray(arr)) throw new TypeError(
        `shuffle() expected array as argument, got ${typeof arr}`
    )

    for (let i = arr.length-1;  i > 0;  i -= 1) {
        let j = Math.floor(Math.random()*1e16) % (i+1);
        [arr[i], arr[j],] = [arr[j], arr[i],]
    }

    return arr
}




//
// sparse(stop, size) -> array of 'size' distinct integers
//     in range [0..stop-1]
// sparse(start, stop, size) -> array of 'size' distinct integers
//     in range [start..stop-1]
//
// Generate sparse array of distinct integers
// with (almost) uniform distribution.
//
export const sparse = (...args) => {
    let
        start = 0, stop = 0, size = 0,
        hash = Object.create(null),
        interval = 0

    if (args.length === 2) { [stop, size,] = args }
    else if (args.length === 3) { [start, stop, size,] = args }
    else throw new TypeError(
        `sparse() expected 2 or 3 arguments, got ${args.length}`
    )

    if (start > stop) { [start, stop,] = [stop, start,] }
    interval = stop - start

    if (size <= 0  ||  interval === 0) { return [] }
    if (size >= interval) { return range(start, stop) }

    while (size > 0) {
        let val = (Math.floor(Math.random()*1e16) % interval) + start
        if (!Object.hasOwnProperty.call(hash, val)) {
            hash[val] = val
            size -= 1
        }
    }

    return Object.values(hash).sort((a, b) => a - b)
}




//
// Returns array without its head (first element).
//
export const tail = (arr) => arr.slice(1)
