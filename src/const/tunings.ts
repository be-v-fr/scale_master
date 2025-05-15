import { Tuning } from "../interfaces/tuning";
import { Note } from "../models/note";
import { generateTuning } from "../utils/tunings.utils";

export const EADGBE_STANDARD: Tuning = generateTuning(['E', 'A', 'D', 'G', 'B', 'E'], 'standard');

export const DADGBE_DROP: Tuning = {
    ...generateTuning(['D', 'A', 'D', 'G', 'B', 'E'], 'drop'),
    extraStrings: {
        interval: 5,
        previousStringCorrection: 2
    }
}

export const GDGD_STANDARD: Tuning = generateTuning(['G', 'D', 'G', 'D'], 'standard');

export const GDAE_STANDARD: Tuning = generateTuning(['G', 'D', 'A', 'E'], 'standard');

export const CGDA_STANDARD: Tuning = {
    ...GDAE_STANDARD,
    defaultRoot: new Note(3),
};