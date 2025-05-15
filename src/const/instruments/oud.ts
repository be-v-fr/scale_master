import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const OUD: Instrument = {
  name: 'Oud',
  tunings: [
    generateTuning(['C', 'F', 'A', 'D', 'G', 'C'], 'Arabic'),
    generateTuning(['C#', 'F#', 'B', 'E', 'A', 'D'], 'Turkish'),
    generateTuning(['C', 'G', 'D', 'A', 'G'], '5-course'),
  ],
  maxExtraStrings: 0,
};
