import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";
import { DADGBE_DROP, EADGBE_STANDARD } from "../tunings";

export const GUITAR: Instrument = {
    name: 'Guitar',
    tunings: [
        EADGBE_STANDARD,
        DADGBE_DROP,
        generateTuning(['E', 'A', 'D', 'G', 'C', 'F'], 'All fourths'),
        generateTuning(['D', 'A', 'D', 'F#', 'A', 'D'], 'Open (Vestapol)'),
        generateTuning(['D', 'G', 'D', 'G', 'B', 'D'], 'Open (Spanish)')
    ],
    maxExtraStrings: 2
};