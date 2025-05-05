import { Params, Router } from "@angular/router";

export function parseNumberParamIfExists(params: Params, key: string): number | undefined {
    if(typeof params[key] === 'string') return parseInt(params[key], 10);
    return undefined;
}

export function updateEditRouteStep(mainUrl: string, step: number): string {
    const urlSegments: (string | number)[] = mainUrl.split('/');
    const editIndex: number = urlSegments.findIndex(s => s === 'edit');
    if (editIndex >= 0) {
      urlSegments[editIndex + 1] = step;
    }
    return urlSegments.join('/');
}