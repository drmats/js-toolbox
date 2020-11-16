export * from "./check"
export * from "./consts"
export * from "./conv"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSAnyObj = Record<string, any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSAnyArr = any[]

// ...
export type JSAnyArrObj = JSAnyArr | JSAnyObj

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const _default: Record<string, any>
export default _default
