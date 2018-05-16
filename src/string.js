import {
    draw,
    head,
    range,
    tail
} from "./array"
import { Y } from "./utils"




//
// Return full set of ASCII letters.
//
export const asciiLetters = () =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"




//
// Return lowercase ASCII letters.
//
export const asciiLowercase = () => "abcdefghijklmnopqrstuvwxyz"




//
// Return uppercase ASCII letters.
//
export const asciiUppercase = () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ"




//
// Create a big string (of size 2^n). Use with caution!
//     big(16) makes 2^16 = 65536 string size.
//     big(23) makes 2^23 = 8M string size,
//     big(24) makes 16M and so on.
// [c = "x"] Character used during string generation.
//     big(2) = "xxxx"
//     big(3, "a") = "aaaaaaaa"
//
export const big = Y((r) => (n, c = "x") => n > 0  ?  r(n - 1, c + c)  :  c)




//
// Convert "thisKindOfText" to "ThisKindOfText".
//
export const camelToPascal = (str) =>
    str  &&  str.length > 0  ?
        head(str).toUpperCase() + tail(str)  :
        empty()




//
// Convert "thisKindOfText" to "this_kind_of_text".
//
export const camelToSnake = (str) =>
    str  ?
        str.replace(/([A-Z])/g, "_$1").toLowerCase()  :
        empty()




//
// Ensure given string is in form "Aaaaaaaa".
//
export const capitalize = (str) =>
    str  &&  str.length > 0  ?
        head(str).toUpperCase() + tail(str).toLowerCase()  :
        empty()




//
// Return all digits.
//
export const digits = () => "0123456789"




//
// Construct empty string.
//
export const empty = () => ""




//
// Convert "ThisKindOfText" to "thisKindOfText".
//
export const pascalToCamel = (str) =>
    str  &&  str.length > 0  ?
        head(str).toLowerCase() + tail(str)  :
        empty()




//
// Convert "ThisKindOfText" to "this_kind_of_text".
//
export const pascalToSnake = (str) =>
    str  ?
        tail(camelToSnake(str))  :
        empty()




//
// Construct random string of desired length.
//
export const random = (size = 0, letters = asciiLetters() + digits()) =>
    range(size).map(() => draw(letters.split(""))).join("")




//
// Convert "this_kind_of_text" to "thisKindOfText".
//
export const snakeToCamel = (str) => (
    (pascal) =>
        pascal.length > 0  ?
            head(pascal).toLowerCase() + tail(pascal)  :
            empty()
)(snakeToPascal(str))




//
// Convert "this_kind_of_text" to "ThisKindOfText".
//
export const snakeToPascal = (str) =>
    str  ?
        str.split(/_+/g).map((w) => capitalize(w)).join(empty())  :
        empty()
