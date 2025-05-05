import { Instrument } from "../../interfaces/instrument";
import { Note } from "../../models/note";
import { generateTuning } from "../../utils/tunings.utils";

export const DULCIMER: Instrument = {
  name: 'dulcimer',
  tunings: [
    generateTuning(['D', 'A', 'D'], 'mixolydian'),
    generateTuning(['D', 'A', 'A'], 'ionian'),
  ],
  maxExtraStrings: 0,
};
