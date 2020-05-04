import * as list from "./list"
import * as random from "./random"
import * as set from "./set"
import * as tools from "./tools"
export * from "./list"
export * from "./random"
export * from "./set"
export * from "./tools"
export default Object.assign({}, list, random, set, tools)
