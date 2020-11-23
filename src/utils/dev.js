/**
 * Various tools.
 *
 * @module utils
 * @license Apache-2.0
 * @author drmats
 */




import { handleException } from "../func/tools"
import { quote } from "../string/transform"
import { access } from "../struct/data"
import {
    isObject,
    isString,
} from "../type/check"
import { toBool } from "../type/conv"
import {
    dependencies,
    description,
    homepage,
    license,
    name,
    version,
} from "../../dist/package.json"




/**
 * Determine runtime environment (is it development or not?).
 * `devEnv() -> true/false`
 *
 * When `strict` is not set to `true` then "development environment"
 * can be simulated by storing value of any type under "dev" key
 * in browser's sessionStorage, e.g. `sessionStorage[dev] = true`.
 *
 * @function devEnv
 * @param {Boolean} [strict=false]
 * @returns {Boolean}
 */
export const devEnv = (strict = false) =>
    (
        // if you're in browser and not in strict mode
        // then check if there is "dev" key in `sessionStorage`
        isBrowser()  &&  !strict ?
            handleException(
                () => Object.prototype.hasOwnProperty.call(
                    sessionStorage, "dev"
                ),
                () => false
            ) : false
    )  ||  (
        // or if there is a `string` under `process.env.NODE_ENV`
        // and it is not equal to "production"
        isString(access(getProcess(), ["env", "NODE_ENV"]))  &&
        access(getProcess(), ["env", "NODE_ENV"]) !== "production"
    )  ||  (
        // or, maybe, you're not in browser
        // and there is no `string` under `process.env.NODE_ENV`,
        // which happens in "bare" node.js console
        !isBrowser()  &&
        !isString(access(getProcess(), ["env", "NODE_ENV"]))
    )  ||  (
        // or... you're in babel context and appropriate env. var is set
        !isBrowser()  &&
        access(
            getProcess(), ["env", "BABEL_ENV"], "production"
        ) !== "production"
    )




/**
 * Get useful library configuration variables.
 *
 * @function getLibConfig
 * @returns {Object}
 */
export const getLibConfig = () => ({
    dependencies,
    description,
    homepage,
    license,
    name,
    version,
})




/**
 * Return global `process` variable if it exists.
 * Also give "transform-inline-environment-variables" plugin a chance.
 *
 * @function getProcess
 * @returns {Object}
 */
export const getProcess = () => (
    envvars =>
        // eslint-disable-next-line
        isObject(process) ? {
            ...process,
            // eslint-disable-next-line
            browser: toBool(process.browser),
            env: {
                ...process.env,
                ...envvars,
            },
        } : {
            // eslint-disable-next-line
            browser: toBool(process.browser),
            env: envvars,
        }
)({
    NODE_ENV: handleException(
        // eslint-disable-next-line
        () => process.env.NODE_ENV
    ),
    BABEL_ENV: handleException(
        // eslint-disable-next-line
        () => process.env.BABEL_ENV
    ),
})




/**
 * Check current runtime environment.
 *
 * @function isBrowser
 * @returns {Boolean}
 */
export const isBrowser = () => toBool(getProcess().browser)




/**
 * Assign argument to the global object.
 * Async-console-dev-helper.
 *
 * @function to_
 * @param {String} name
 * @returns {Function} (*) => *
 */
export const to_ = (name = "_") =>
    val => {
        // eslint-disable-next-line no-console
        console.log(`${name} = ${quote(typeof val, "[]")}`)
        handleException(
            () => {
                (window || self)[name] = val
                // eslint-disable-next-line no-console
                console.log(val)
            },
            () => {
                if (!isBrowser()) {
                    // hide the repl require from webpack
                    let { repl } = eval("require(\"repl\")")
                    repl.context[name] = val
                    // eslint-disable-next-line no-console
                    console.log(val)
                    repl.context.process.stdout.write(repl._prompt)
                }
            }
        )
        return val
    }
