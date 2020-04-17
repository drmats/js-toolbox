export * from "./combinators"
export * from "./curry"
export * from "./tools"
import * as combinators from "./combinators"
import * as curry from "./curry"
import * as tools from "./tools"
export default Object.assign({}, combinators, curry, tools)
