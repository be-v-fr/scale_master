import { Instrument } from "../../interfaces/instrument";
import { Note } from "../../models/note";
import { CGDA_STANDARD, GDAE_STANDARD } from "../tunings";


export const VIOLIN: Instrument = {
    name: 'violin',
    tunings: [GDAE_STANDARD],
    maxExtraStrings: 0
};

export const VIOLA: Instrument = {
    name: 'viola',
    tunings: [CGDA_STANDARD],
    maxExtraStrings: 0
};

export const CELLO: Instrument = {
    name: 'cello',
    tunings: [CGDA_STANDARD],
    maxExtraStrings: 0
};

export const DOUBLE_BASS: Instrument = {
    name: 'double bass',
    tunings: [
        GDAE_STANDARD,
        {
            ...GDAE_STANDARD,
            defaultRoot: new Note(0),
            name: 'solo'
        }
    ],
    maxExtraStrings: 0
};