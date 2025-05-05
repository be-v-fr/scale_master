import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";
import { CGDA_STANDARD, EADGBE_STANDARD, GDAE_STANDARD } from "../tunings";

export const BANJO: Instrument = {
    name: 'banjo',
    tunings: [
      generateTuning(['G', 'D', 'G', 'B', 'D'], 'open (5th string)'),
      generateTuning(['G', 'C', 'G', 'C', 'E'], 'open (4th string)', 3),
      generateTuning(['E', 'B', 'E', 'G#', 'B'], 'open (longneck)'),
      generateTuning(['G', 'C', 'G', 'C', 'D'], 'double', 3),
      generateTuning(['G', 'C', 'G', 'B', 'D'], 'drop', 3),
      generateTuning(['G', 'D', 'G', 'C', 'D'], 'modal', 5),
      generateTuning(['F#', 'D', 'F#', 'A', 'D'], 'D', 5),
      generateTuning(['A', 'D', 'F#', 'A', 'D'], 'D w/ A', 5),
      {
        ...CGDA_STANDARD,
        name: 'tenor (standard)'
      },
      {
        ...GDAE_STANDARD,
        name: 'tenor (Irish)'
      },
      {
        ...EADGBE_STANDARD,
        intervals: EADGBE_STANDARD.intervals.slice(2),
        name: 'Chicago'
      },
      generateTuning(['C', 'G', 'B', 'D'], 'plectrum'),
    ],
    maxExtraStrings: 0,
  };
  