import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const BOUZOUKI_GREEK: Instrument = {
  name: 'Bouzouki (Greek)',
  tunings: [
    generateTuning(['D', 'A', 'D'], '3-course'),
    generateTuning(['C', 'F', 'A', 'D'], '4-course'),
  ],
  maxExtraStrings: 0
};
