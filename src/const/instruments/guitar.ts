import { Instrument } from "../../interfaces/instrument";
import { Note } from "../../models/note";
import { DADGBE_DROP, EADGBE_STANDARD } from "../tunings";

export const GUITAR: Instrument = {
    name: 'guitar',
    tunings: [
        EADGBE_STANDARD,
        DADGBE_DROP,
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
};