import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";
import { DADGBE_DROP, EADGBE_STANDARD } from "../tunings";

export const GUITAR: Instrument = {
    name: 'guitar',
    tunings: [
        EADGBE_STANDARD,
        DADGBE_DROP,
        generateTuning(['E', 'A', 'D', 'G', 'C', 'F'], 'all fourths'),
        generateTuning(['D', 'A', 'D', 'F#', 'A', 'D'], 'open (vestapol)'),
        generateTuning(['D', 'G', 'D', 'G', 'B', 'D'], 'open (Spanish)')
    ],
    maxExtraStrings: 2
};