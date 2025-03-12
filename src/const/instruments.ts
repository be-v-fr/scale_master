import { Instrument } from "../interfaces/instrument";
import { Note } from "../models/note";

export const INSTRUMENTS: Instrument[] = [
    {
        name: 'guitar',
        tunings: [
            {
                name: 'standard',
                intervals: [0, 5, 10, 15, 19, 24],
                defaultRoot: new Note(7),
                extraStrings: { interval: 5 }
            },

            {
                name: 'drop',
                intervals: [0, 7, 12, 17, 21, 26],
                defaultRoot: new Note(5),
                extraStrings: {
                    interval: 5,
                    previousStringCorrection: 2
                }
            },

            {
                name: 'all fourths',
                intervals: [0, 5, 10, 15, 20, 25],
                defaultRoot: new Note(7),
                extraStrings: { interval: 5 }
            },

            {
                name: 'open (Vestapol)',
                intervals: [0, 7, 12, 16, 19, 24],
                defaultRoot: new Note(3),
                extraStrings: { interval: 5 }
            },

            {
                name: 'open (Spanish)',
                intervals: [0, 5, 12, 17, 21, 24],
                defaultRoot: new Note(5),
                extraStrings: { interval: 5 }
            },
        ],
        maxExtraStrings: 2
    },
    {
        name: 'bass',
        tunings: [
            {
                name: 'standard',
                intervals: [0, 5, 10, 15],
                defaultRoot: new Note(7),
                extraStrings: { interval: 5 }
            },

            {
                name: 'drop',
                intervals: [0, 7, 12, 17],
                defaultRoot: new Note(5),
                extraStrings: {
                    interval: 5,
                    previousStringCorrection: 2
                }
            }
        ],
        maxExtraStrings: 2
    },
    {
        name: 'ukulele',
        tunings: [
            {
                name: 'concert',
                intervals: [7, 0, 4, 9],
                defaultRoot: new Note(3),
                extraStrings: { interval: 5 }
            },

            {
                name: 'baritone',
                intervals: [7, 0, 4, 9],
                defaultRoot: new Note(10),
                extraStrings: { interval: 5 }
            },

            {
                name: 'bass',
                intervals: [7, 0, 5, 10],
                defaultRoot: new Note(0),
                extraStrings: { interval: 5 }
            },

            {
                name: 'low',
                intervals: [0, 5, 9, 2],
                defaultRoot: new Note(10),
                extraStrings: { interval: 5 }
            },

            {
                name: 'slack',
                intervals: [7, 0, 4, 7],
                defaultRoot: new Note(3),
                extraStrings: { interval: 5 }
            },
        ],
        maxExtraStrings: 0
    }
];