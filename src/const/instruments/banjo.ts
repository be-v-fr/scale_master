import { Instrument } from "../../interfaces/instrument";
import { Note } from "../../models/note";

export const BANJO: Instrument = {
    name: 'banjo',
    tunings: [
      {
        name: 'open (standard)',
        intervals: [5, 0, 4, 7, 12], // G4, D3, G3, B3, D4
        defaultRoot: new Note(5),
        extraStrings: { interval: 5 }
      },
      {
        name: 'open (alt)',
        intervals: [7, 0, 4, 7, 12], // G4, C3, G3, C4, E4
        defaultRoot: new Note(3),
        extraStrings: { interval: 5 }
      },
      {
        name: 'open (longneck)',
        intervals: [5, 0, 4, 7, 12], // E2, B2, E3, G#3, B3
        defaultRoot: new Note(4),    // E
        extraStrings: { interval: 5 }
      },
      {
        name: 'double C',
        intervals: [6, 0, 4, 11, 14], // G4, C3, G3, C4, D4
        defaultRoot: new Note(3),
        extraStrings: { interval: 5 }
      },
      {
        name: 'drop C',
        intervals: [5, 0, 4, 7, 12], // G4, C3, G3, B3, D4
        defaultRoot: new Note(3),
        extraStrings: { interval: 5 }
      },
      {
        name: 'modal',
        intervals: [7, 0, 2, 7, 12], // G4, D3, G3, C4, D4
        defaultRoot: new Note(5),
        extraStrings: { interval: 5 }
      },
      {
        name: 'D',
        intervals: [12, 0, 5, 8, 14], // F#4, D3, F#3, A3, D4
        defaultRoot: new Note(5),
        extraStrings: { interval: 5 }
      },
      {
        name: 'D w/ A',
        intervals: [9, 0, 5, 8, 14], // A4, D3, F#3, A3, D4
        defaultRoot: new Note(5),
        extraStrings: { interval: 5 }
      },
      {
        name: 'tenor (standard)',
        intervals: [0, 7, 14, 21], // C G D A
        defaultRoot: new Note(3),
        extraStrings: { interval: 7 }
      },
      {
        name: 'tenor (Irish)',
        intervals: [0, 7, 14, 21], // G D A E
        defaultRoot: new Note(5),
        extraStrings: { interval: 7 }
      },
      {
        name: 'Chicago',
        intervals: [0, 5, 9, 14], // D G B E
        defaultRoot: new Note(5),
        extraStrings: { interval: 5 }
      },
      {
        name: 'plectrum',
        intervals: [0, 7, 11, 14], // C G B D
        defaultRoot: new Note(3),
        extraStrings: { interval: 7 }
      },
    ],
    maxExtraStrings: 0,
  };
  