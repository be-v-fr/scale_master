/*
 * Modulo operation that supports negative input values.
 */
export function modWithSubZero(value: number, mod: number) {
    mod = Math.abs(mod);
    value %= mod;
    while(value < 0) {
        value += mod;
    }
    return value;
}


/*
 * Returns a valid index in a cyclic array by wrapping overflow.
 */
export function getCyclicArrayIndex(array: Array<any>, index: number): number {
    return modWithSubZero(index, array.length);
}


/*
 * Normalizes an index to fit within a 12-tone scale.
 */
export function getModTwelveIndex(index: number): number {
    return modWithSubZero(index, 12);
}