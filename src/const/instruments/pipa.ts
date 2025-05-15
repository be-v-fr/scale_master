import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const PIPA: Instrument = {
    name: 'pipa',
    tunings: [
        generateTuning(['A', 'D', 'E', 'A'], 'standard'),
    ],
    maxExtraStrings: 0
};