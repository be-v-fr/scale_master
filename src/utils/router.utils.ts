import { Params } from "@angular/router";


/*
 * Parses a numeric route parameter if it exists and is a string.
 */
export function parseNumberParamIfExists(params: Params, key: string): number | undefined {
    if(typeof params[key] === 'string') return parseInt(params[key], 10);
    return undefined;
}