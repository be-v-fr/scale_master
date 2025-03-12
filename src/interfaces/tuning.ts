import { Note } from "../models/note"

export interface Tuning {
    name: string,
    intervals: number[],
    defaultRoot: Note,
    extraStrings: {
        interval: number,
        previousStringCorrection?: number,
    }
}
