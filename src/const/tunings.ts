import { Tuning } from "../interfaces/tuning";
import { Note } from "../models/note";
import { generateTuning } from "../utils/tunings.utils";

export const EADGBE_STANDARD: Tuning = generateTuning(['E', 'A', 'D', 'G', 'B', 'E'], 'Standard');

export const DADGBE_DROP: Tuning = {
    ...generateTuning(['D', 'A', 'D', 'G', 'B', 'E'], 'Drop'),
    extraStrings: {
        interval: 5,
        previousStringCorrection: 2
    }
}

export const GDGD_STANDARD: Tuning = generateTuning(['G', 'D', 'G', 'D'], 'Standard');

export const GDAE_STANDARD: Tuning = generateTuning(['G', 'D', 'A', 'E'], 'Standard');

export const CGDA_STANDARD: Tuning = {
    ...GDAE_STANDARD,
    defaultRootPitchIndex: 3,
};