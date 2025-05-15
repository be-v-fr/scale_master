import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const ERHU: Instrument = {
    name: 'erhu',
    tunings: [
        generateTuning(['D', 'A'], 'standard'),
    ],
    maxExtraStrings: 0
};