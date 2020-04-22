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
} from "../string/transform"




/**
 * JSS color helper.
 *
 * @function rgb
 * @returns {String}
 */
export const rgb = (r, g, b) =>
    wrap([r, g, b].join(", "), "rgb(", ")")




/**
 * JSS color helper (with alpha).
 *
 * @function rgba
 * @returns {String}
 */
export const rgba = (r, g, b, a) =>
    wrap([r, g, b, a].join(", "), "rgba(", ")")




/**
 * JSS url helper.
 *
 * @function url
 * @returns {String}
 */
export const url = x => wrap(quote(x), "url(", ")")
