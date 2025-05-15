import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";
import { GDAE_STANDARD } from "../tunings";

export const BOUZOUKI_IRISH: Instrument = {
  name: 'Bouzouki (Irish)',
  tunings: [
    GDAE_STANDARD,
    generateTuning(['G', 'D', 'A', 'D'], 'Open'),
  ],
  maxExtraStrings: 0
};
