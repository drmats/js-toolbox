import * as check from "./check";
import * as consts from "./consts";
import * as conv from "./conv";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSAnyObj = Record<string, any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSAnyArr = any[]

// ...
export type JSAnyArrObj = JSAnyArr | JSAnyObj

export * from "./check";
export * from "./consts";
export * from "./conv";
export default Object.assign({}, check, consts, conv);
