export * from "./combinators"
export * from "./curry"
export * from "./misc"
import * as combinators from "./combinators"
import * as curry from "./curry"
import * as misc from "./misc"
export default Object.assign({}, combinators, curry, misc)
