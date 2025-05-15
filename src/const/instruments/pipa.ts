import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const PIPA: Instrument = {
    name: 'Pipa',
    tunings: [
        generateTuning(['A', 'D', 'E', 'A'], 'Standard'),
    ],
    maxExtraStrings: 0
};