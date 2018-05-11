import { head, tail } from "./array"




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
