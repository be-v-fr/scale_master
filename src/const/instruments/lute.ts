import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const LUTE: Instrument = {
  name: 'Lute',
  tunings: [
    generateTuning(['G', 'A', 'D', 'G'], 'Medieval'),
    generateTuning(['G', 'C', 'F', 'A', 'D', 'G'], 'Renaissance'),
  ],
  maxExtraStrings: 1,
};
