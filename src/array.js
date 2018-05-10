//
// return first element of the given array
//
export const first = (arr) => arr[0]




//
// simple array flattener
// [[1, 2,], ..., [3, 4,],]  ->  [1, 2, ..., 3, 4,]
//
export const flatten = (arr) => arr.reduce((acc, el) => acc.concat(el), [])




//
// return last element of the given array
//
export const last = (arr) => arr[arr.length-1]




//
// range(stop) -> array of integers
// range(start, stop[, step]) -> array of integers
//
// Return a list containing an arithmetic progression of integers.
// range(i, j) returns [i, i+1, i+2, ..., j-1]; start defaults to 0.
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
// Randomly shuffles all elements in the given array
// (Durstenfeld's modification to Fisher-Yates shuffle algorithm).
// The operation is taken in-place.
//
export const shuffle = (arr) => {
    let j, tmp

    if (!Array.isArray(arr)) throw new TypeError(
        `shuffle() expected array as argument, got ${typeof arr}`
    )

    for (let i = arr.length-1;  i > 0;  i -= 1) {
        j = Math.floor(Math.random()*1e16) % (i+1)
        tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }

    return arr
}
