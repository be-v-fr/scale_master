import { Instrument } from "../../interfaces/instrument";
import { Note } from "../../models/note";

export const UKULELE: Instrument = {
    name: 'Ukulele',
    tunings: [
        {
            name: 'Concert',
            intervals: [7, 0, 4, 9],
            defaultRoot: new Note(3),
            extraStrings: { interval: 5 }
        },
        {
            name: 'Baritone',
            intervals: [7, 0, 4, 9],
            defaultRoot: new Note(10),
            extraStrings: { interval: 5 }
        },
        {
            name: 'Bass',
            intervals: [7, 0, 5, 10],
            defaultRoot: new Note(0),
            extraStrings: { interval: 5 }
        },
        {
            name: 'Low',
            intervals: [0, 5, 9, 2],
            defaultRoot: new Note(10),
            extraStrings: { interval: 5 }
        },
        {
            name: 'Slack',
            intervals: [7, 0, 4, 7],
            defaultRoot: new Note(3),
            extraStrings: { interval: 5 }
        },
    ],
    maxExtraStrings: 0
};