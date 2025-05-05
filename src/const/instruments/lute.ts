import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";
import { EADGBE_STANDARD } from "../tunings";

// ÜBERPRÜFEN
export const LUTE: Instrument = {
  name: 'lute',
  tunings: [
    generateTuning(['G', 'A', 'D', 'G'], 'medieval'),
    generateTuning(['G', 'C', 'F', 'A', 'D', 'G'], 'renaissance'),
  ],
  maxExtraStrings: 1,
};
