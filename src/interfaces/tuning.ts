import { Note } from "../models/note"

/**
 * Represents a fretboard tuning.
 * Includes rules for added extra strings.
 */
export interface Tuning {
    name: string,
    intervals: number[],
    defaultRoot: Note,
    extraStrings: {
        interval: number,
        previousStringCorrection?: number,
    }
}
