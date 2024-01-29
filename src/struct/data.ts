/**
 * Data structure manipulation tools.
 *
 * @module struct
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */


import type { AnyKey, Fun, JSAnyObj } from "../type/defs";
import { append } from "../array/list";
import { intersection } from "../array/set";
import { inc } from "../math/arithmetic";
import { quote } from "../string/transform";
import { space } from "../string/consts";
import {
    isArray,
    isBoolean,
    isNumber,
    isObject,
    isString,
} from "../type/check";




/**
 * Simple, basic data type (leaf). Serializable. Non recursive type.
 */
export type BasicData =
    | boolean
    | number
    | string;




/**
 * Check if value is of `BasicData` type. Non recursive check.
 *
 * @function isBasicData
 * @param {unknown} c
 * @returns {Boolean}
 */
export const isBasicData = (c: unknown): c is BasicData =>
    isString(c) || isNumber(c) || isBoolean(c);




/**
 * Check if value is of `BasicData` of `undefined` type. Non recursive check.
 *
 * @function isBasicDataOrUndefined
 * @param {unknown} c
 * @returns {Boolean | undefined}
 */
export const isBasicDataOrUndefined = (
    c: unknown,
): c is BasicData | undefined =>
    typeof c === "undefined" || isBasicData(c);




/**
 * All "atomic" types.
 */
export type Atom =
    | BasicData
    | symbol
    | bigint
    | RegExp
    | Fun
    | null
    | undefined;




/**
 * Array - mutually recursive with Data (array node).
 */
export type DataArray<
    T = BasicData,
    ObjectPropType extends AnyKey = string,
> = Data<T, ObjectPropType>[];




/**
 * Object - mutually recursive with Data (object node).
 */
export type DataObject<
    T = BasicData,
    PropType extends AnyKey = string,
> = {
    [property in PropType]?: Data<T, PropType>;
};




/**
 * Recursive data type (leaf or node).
 */
export type Data<
    T = BasicData,
    ObjectPropType extends AnyKey = string,
> =
    | T
    | DataArray<T, ObjectPropType>
    | DataObject<T, ObjectPropType>;




/**
 * Node-indexing type.
 */
export type DataIndex<
    PropType extends AnyKey = string | number,
> = PropType;




/**
 * Apply `path` to an object `o`. Return element reachable through
 * that `path` or `def` value.
 *
 * Example:
 *
 * ```
 * access({ a: { b: [10, { c: 42 }] } }, ["a", "b", 1, "c"])  ===  42
 * ```
 *
 * @function access
 * @param {Data} o
 * @param {Array.<String|Number>} [path=[]]
 * @param {unknown} [def]
 * @returns {Data | undefined}
 */
export function access<
    IT = BasicData,
    PropType extends AnyKey = string,
    OT = BasicData,
> (
    o: Data<IT, PropType>,
    path: readonly DataIndex<PropType | number>[] = [],
    def?: Data<OT, PropType>,
): Data<OT, PropType> | undefined {
    try {
        return (
            path.reduce(
                (acc: any, p) => acc[p] as Data<IT, PropType>,
                o,
            ) as Data<OT, PropType>
        ) ?? def;
    } catch (_) {
        return def;
    }
}




/**
 * Safe version of standard JavaScript Object.assign();
 * Throws when `base` and `ext` have conflicting keys - prevents
 * accidental overwrite.
 *
 * @function assign
 * @param {Object} base
 * @param {Object} ext
 * @returns {Object} base
 */
export function assign<T extends JSAnyObj> (base: T, ext: T): T {
    const overlap = intersection(
        Object.keys(base), Object.keys(ext),
    );
    if (overlap.length === 0) {
        return Object.assign(base, ext);
    } else {
        throw new TypeError([
            "struct.assign() - conflicting keys:",
            overlap.map(x => quote(x)).join(", "),
        ].join(space()));
    }
}




/**
 * Rewrite part of an object (first argument) reachable through passed path
 * (second argument) with provided value (third argument). Creates new object
 * with new data and references to all unchanged parts of the old object.
 * This function implements copy-on-write semantics.
 *
 * @function rewrite
 * @param {Data} o
 * @param {DataIndex} path
 * @param {Data} v
 * @returns {Data}
 */
export function rewrite<
    T = BasicData,
    PropType extends AnyKey = string,
> (
    o: Data<T, PropType>,
    [h, ...t]: readonly DataIndex<PropType | number>[],
    v: Data<T, PropType>,
): Data<T, PropType> {

    if (!h || !(isObject(o) || isArray(o))) return v;

    if (isObject(o)) {
        const data = o;
        if (!isString(h) || !(h in data))
            throw new TypeError("struct.rewrite<object> - wrong path");
        return {
            ...data,
            [h]: rewrite(data[h], t, v),
        };
    } else {
        const data = o as DataArray<T, PropType>;
        if (!isNumber(h) || !(h in data))
            throw new TypeError("struct.rewrite<array> - wrong path");
        return append(data.slice(0, h)) ([
            rewrite(data[h], t, v),
            ...data.slice(inc(h)),
        ]);
    }

}
