/**
 * JS toolbox.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */




import * as list from "../array/list";
import * as random from "../array/random";
import * as set from "../array/set";
import * as tools from "../array/tools";
export * from "../array/list";
export * from "../array/random";
export * from "../array/set";
export * from "../array/tools";
export default Object.assign({}, list, random, set, tools);
