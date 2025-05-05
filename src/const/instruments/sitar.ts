import { Note } from "../../models/note";

export const SITAR = {
    name: 'sitar',
    tunings: [
        {
            name: 'standard',
            intervals: [17, 0, 16, 19, 24, 36],
            defaultRoot: new Note(5),
            extraStrings: { interval: 7 }
        },
    ],
    maxExtraStrings: 0
};