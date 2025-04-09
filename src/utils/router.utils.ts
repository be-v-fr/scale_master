import { Params } from "@angular/router";

export function parseNumberParamIfExists(params: Params, key: string): number | undefined {
    if(typeof params[key] === 'string') return parseInt(params[key], 10);
    return undefined;
}