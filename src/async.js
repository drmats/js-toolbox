//
// Convenience shortcut of "timeout".
//
export const delay = (time = 1000, cancel = (_reason) => null) =>
    timeout(() => time, time, cancel)




//
// setInterval in promise/async skin.
// Example usage:
//
// interval(
//     () => { console.log("Hey!"); return 42 },
//     (c) => timeout(() => c(), 4000)
// )
// .then((x) => console.log("Finished:", x))
// .catch((c) => console.log("Error:", c))
//
export const interval = (f, clear, time = 1000) => {
    let
        resolve = null, handle = null, result = null,
        promise = new Promise((res, rej) => {
            resolve = res
            handle = setInterval(() => {
                try { result = f() }
                catch (ex) { rej(ex) }
            }, time)
        })
    clear(() => {
        clearInterval(handle)
        resolve(result)
    })
    return promise
}




//
// setTimeout in promise/async skin.
// Example usage:
//
// timeout(
//     () => { console.log("Hey!"); return 42 }, 1000,
//     (c) => timeout(() => c("Cancelled!"), 800)
// )
// .then((x) => console.log("Success:", x))
// .catch((c) => console.log("Error or cancel:", c))
//
export const timeout = (f, time = 1000, cancel = (_canceller) => null) => {
    let
        reject = null, handle = null,
        promise = new Promise((res, rej) => {
            reject = rej
            handle = setTimeout(() => {
                try { res(f()) }
                catch (ex) { rej(ex) }
            }, time)
        })
    cancel((reason) => {
        clearTimeout(handle)
        reject(reason)
    })
    return promise
}
