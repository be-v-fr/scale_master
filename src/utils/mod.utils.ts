export function modWithSubZero(value: number, mod: number) {
    mod = Math.abs(mod);
    value %= mod;
    while(value < 0) {
        value += mod;
    }
    return value;
}

export function getCyclicArrayIndex(array: Array<any>, index: number): number {
    return modWithSubZero(index, array.length);
}

export function getModTwelveIndex(index: number): number {
    return modWithSubZero(index, 12);
}