export * from "./consts"
export * from "./gen"
export * from "./transform"
import * as consts from "./consts"
import * as gen from "./gen"
import * as transform from "./transform"
export default Object.assign({}, consts, gen, transform)
