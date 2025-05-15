import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const ERHU: Instrument = {
    name: 'Erhu',
    tunings: [
        generateTuning(['D', 'A'], 'Standard'),
    ],
    maxExtraStrings: 0
};