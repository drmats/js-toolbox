//
// Convenience shortcut of "timeout".
//
export const delay = (time = 1000, cancel = (_reason) => null) =>
    timeout(() => time, time, cancel)




//
// setTimeout in promise/async skin.
// Example usage:
//
// sf.utils.timeout(
//     () => { console.log("Hey!"); return 42 }, 1000,
//     (c) => sf.utils.timeout(() => c("Cancelled!"), 800)
// )
// .then((x) => console.log("Success:", x))
// .catch((c) => console.log("Error or cancel:", c))
//
export const timeout = (f, time = 1000, cancel = (_reason) => null) => {
    let
        handle = null, reject = null,
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
