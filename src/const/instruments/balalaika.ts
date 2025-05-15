import { Instrument } from "../../interfaces/instrument";
import { generateTuning } from "../../utils/tunings.utils";

export const BALALAIKA: Instrument = {
  name: 'balalaika',
  tunings: [
    generateTuning(['E', 'E', 'A'], 'Prima (standard)'),
    generateTuning(['G', 'B', 'D'], 'Prima (Guitar style)'),
    generateTuning(['A', 'A', 'D'], 'Secunda'),
    generateTuning(['E', 'E', 'A'], 'Alto'),
    generateTuning(['A', 'A', 'D'], 'Tenor'),
    generateTuning(['E', 'A', 'D'], 'Bass'),
    generateTuning(['E', 'A', 'D'], 'Contrabass'),
    generateTuning(['B', 'E', 'A'], 'Piccolo'),
    generateTuning(['E', 'E', 'A'], 'Descant'),
    generateTuning(['C', 'E', 'G'], 'Prima (Folk)'),
    generateTuning(['E', 'A', 'D'], 'Prima (Domra style)'),
  ],
  maxExtraStrings: 0
};