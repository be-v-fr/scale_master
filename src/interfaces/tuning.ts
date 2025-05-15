import { Note } from "../models/note"

/**
 * Represents a fretboard tuning.
 * Includes rules for added extra strings.
 */
export interface Tuning {
    name: string,
    intervals: number[],
    defaultRootPitchIndex: number,
    extraStrings: {
        interval: number,
        previousStringCorrection?: number,
    }
}
