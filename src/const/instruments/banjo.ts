import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";
import { CGDA_STANDARD, EADGBE_STANDARD, GDAE_STANDARD } from "../tunings";

export const BANJO: Instrument = {
  name: 'Banjo',
  tunings: [
    generateTuning(['G', 'D', 'G', 'B', 'D'], 'Open (5th String)'),
    generateTuning(['G', 'C', 'G', 'C', 'E'], 'Open (4th String)', 3),
    generateTuning(['E', 'B', 'E', 'G#', 'B'], 'Open (Longneck)'),
    generateTuning(['G', 'C', 'G', 'C', 'D'], 'Double', 3),
    generateTuning(['G', 'C', 'G', 'B', 'D'], 'Drop', 3),
    generateTuning(['G', 'D', 'G', 'C', 'D'], 'Modal', 5),
    generateTuning(['F#', 'D', 'F#', 'A', 'D'], 'D', 5),
    generateTuning(['A', 'D', 'F#', 'A', 'D'], 'D W/ A', 5),
    {
      ...CGDA_STANDARD,
      name: 'Tenor (standard)'
    },
    {
      ...GDAE_STANDARD,
      name: 'Tenor (Irish)'
    },
    {
      ...EADGBE_STANDARD,
      intervals: EADGBE_STANDARD.intervals.slice(2),
      name: 'Chicago'
    },
    generateTuning(['C', 'G', 'B', 'D'], 'Plectrum'),
  ],
  maxExtraStrings: 0,
};
