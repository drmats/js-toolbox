/**
 * JS toolbox.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */




import * as arithmetic from "~math/arithmetic";
import * as geom from "~math/geom";
import * as interpolation from "~math/interpolation";
import * as random from "~math/random";
import * as rounding from "~math/rounding";
import * as series from "~math/series";
export * from "~math/arithmetic";
export * from "~math/geom";
export * from "~math/interpolation";
export * from "~math/random";
export * from "~math/rounding";
export * from "~math/series";
export default Object.assign(
    {},
    arithmetic,
    geom,
    interpolation,
    random,
    rounding,
    series,
);
