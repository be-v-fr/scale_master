import { Tuning } from "../interfaces/tuning";
import { Note } from "../models/note";


/*
 * Replaces all surplus 0-intervals in the array with 12s.
 * Only the first 0 is preserved, the rest are treated as octaves.
 */
export function replaceSurplus0IntervalsW12s(intervals: number[]) {
    let zeroCount: number = 0;
    for (let i = 0; i < intervals.length; i++) {
      if (intervals[i] === 0) {
        zeroCount++;
        if (zeroCount > 1) {
          intervals[i] = 12;
        }
      }
    };
}


/**
 * Generates basic tuning data from note letters input.
 * If defaultRootIndexArg is not specified, the first letter
 * will be treated as the root note.
 */
export function generateTuning(noteLetters: string[], name: string, defaultRootIndexArg?: number): Tuning {
    const notes: Note[] = noteLetters.map(n => Note.textToNote(n));
    const defaultRootIndex: number = defaultRootIndexArg ?? notes[0].index;
    const intervals: number[] = notes.map(n => n.getIntervalFromIndex(defaultRootIndex));
    replaceSurplus0IntervalsW12s(intervals);
    return {
        name: name,
        intervals: intervals,
        defaultRootPitchIndex: defaultRootIndex,
        extraStrings: {
            interval: 5,
        }
    }
}