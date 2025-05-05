import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const BALALAIKA: Instrument = {
  name: 'balalaika',
  tunings: [
    generateTuning(['E', 'E', 'A'], 'prima (standard)'),
    generateTuning(['G', 'B', 'D'], 'prima (guitar style)'),
    generateTuning(['A', 'A', 'D'], 'secunda'),
    generateTuning(['E', 'E', 'A'], 'alto'),
    generateTuning(['A', 'A', 'D'], 'tenor'),
    generateTuning(['E', 'A', 'D'], 'bass'),
    generateTuning(['E', 'A', 'D'], 'contrabass'),
    generateTuning(['B', 'E', 'A'], 'piccolo'),
    generateTuning(['E', 'E', 'A'], 'descant'),
    generateTuning(['C', 'E', 'G'], 'prima (folk)'),
    generateTuning(['E', 'A', 'D'], 'prima (domra style)'),
  ],
  maxExtraStrings: 0
};
