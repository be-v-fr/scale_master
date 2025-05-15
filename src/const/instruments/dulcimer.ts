import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const DULCIMER: Instrument = {
  name: 'Dulcimer',
  tunings: [
    generateTuning(['D', 'A', 'D'], 'Mixolydian'),
    generateTuning(['D', 'A', 'A'], 'Ionian'),
  ],
  maxExtraStrings: 0,
};
