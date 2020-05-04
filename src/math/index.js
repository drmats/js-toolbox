import * as arithmetic from "./arithmetic"
import * as random from "./random"
import * as rounding from "./rounding"
import * as series from "./series"
export * from "./arithmetic"
export * from "./random"
export * from "./rounding"
export * from "./series"
export default Object.assign({}, arithmetic, random, rounding, series)
