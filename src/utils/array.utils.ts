export function getCyclicArrayIndex(array: Array<any>, index: number): number {
    const length = array.length;
    index %= length;
    while(index < 0) {
        index += length;
    }
    return index;
}