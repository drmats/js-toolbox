import * as arithmetic from "./arithmetic";
import * as geom from "./geom";
import * as interpolation from "./interpolation";
import * as random from "./random";
import * as rounding from "./rounding";
import * as series from "./series";
export * from "./arithmetic";
export * from "./geom";
export * from "./interpolation";
export * from "./random";
export * from "./rounding";
export * from "./series";
export default Object.assign(
    {},
    arithmetic,
    geom,
    interpolation,
    random,
    rounding,
    series,
);
