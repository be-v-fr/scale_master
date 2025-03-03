export interface Tuning {
    name: string,
    intervals: number[],
    extraStrings: {
        interval: number,
        previousStringCorrection?: number,
    }
}
