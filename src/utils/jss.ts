/**
 * Various tools.
 *
 * @module utils
 * @license Apache-2.0
 * @author drmats
 */

import {
    quote,
    wrap,
} from "../string/transform";




/**
 * JSS color helper.
 *
 * @function rgb
 * @returns Wrapped JSS rgb() string.
 */
export const rgb = (r: number, g: number, b: number): string =>
    wrap([r, g, b].join(", "), "rgb(", ")");




/**
 * JSS color helper (with alpha).
 *
 * @function rgba
 * @returns Wrapped JSS rgba() string.
 */
export const rgba = (r: number, g: number, b: number, a: number): string =>
    wrap([r, g, b, a].join(", "), "rgba(", ")");




/**
 * JSS url helper.
 *
 * @function url
 * @returns Wrapped JSS url() string.
 */
export const url = (x: string): string =>
    wrap(quote(x), "url(", ")");
