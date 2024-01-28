/**
 * Comma-separated-values format tools.
 *
 * @module codec
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */

import { isArray } from "../type/check";
import { init } from "../array/list";
import { empty, nl } from "../string/consts";




/**
 * Parse input string as a CSV data.
 *
 * @function csv
 * @param {String} input csv text
 * @param {String} [sep=","] default field separator
 * @returns Array of parsed lines - each line is an array of string fields.
 */
export const csv = (input: string, sep = ","): string[][] => {
    const field = new RegExp(`".*"${sep}|[^${sep}]*${sep}`, "g");
    return (
        input
            // CRLF -> LF
            .replace(/\r\n/g, nl())
            // split to lines
            .split(nl())
            // filter-out empty lines
            .filter(line => line !== empty())
            // parse every line
            .map(line => {
                // match quoted and unquoted fields
                const fields = (line + sep).match(field);
                if (fields)
                    return fields
                        // remove last character (comma sign) from every field
                        .map(v => init(v))
                        // remove surrounding quotation marks if they exist
                        .map(v => v.replace(/"(.*)"/, (_, x) => x))
                        // replace all occurences of doubled quotes
                        .map(v => v.replace(/""/g, "\""));
                return fields;
            })
            // filter-out non-parsed lines
            .filter(isArray)
     ) as string[][];
};
