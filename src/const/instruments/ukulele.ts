import { Instrument } from "../../interfaces/instrument";
import { Note } from "../../models/note";

export const UKULELE: Instrument = {
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
};