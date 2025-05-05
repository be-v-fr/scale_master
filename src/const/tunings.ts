import { Tuning } from "../interfaces/tuning";
import { Note } from "../models/note";

export const EADGBE_STANDARD: Tuning = {
    name: 'standard',
    intervals: [0, 5, 10, 15, 19, 24],
    defaultRoot: new Note(7),
    extraStrings: { interval: 5 }
};

export const DADGBE_DROP: Tuning = {
    name: 'drop',
    intervals: [0, 7, 12, 17, 21, 26],
    defaultRoot: new Note(5),
    extraStrings: {
        interval: 5,
        previousStringCorrection: 2
    }
}

export const GDAE_STANDARD: Tuning = {
    name: 'standard',
    intervals: [0, 7, 14, 21],
    defaultRoot: new Note(10),
    extraStrings: { interval: 7 }
};

export const CGDA_STANDARD: Tuning = {
    ...GDAE_STANDARD,
    defaultRoot: new Note(3),
};