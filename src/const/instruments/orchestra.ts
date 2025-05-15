import { Instrument } from "../../interfaces/instrument";
import { Note } from "../../models/note";
import { CGDA_STANDARD, GDAE_STANDARD } from "../tunings";


export const VIOLIN: Instrument = {
    name: 'Violin',
    tunings: [GDAE_STANDARD],
    maxExtraStrings: 0
};

export const VIOLA: Instrument = {
    name: 'Viola',
    tunings: [CGDA_STANDARD],
    maxExtraStrings: 0
};

export const CELLO: Instrument = {
    name: 'Cello',
    tunings: [CGDA_STANDARD],
    maxExtraStrings: 0
};

export const DOUBLE_BASS: Instrument = {
    name: 'Double bass',
    tunings: [
        GDAE_STANDARD,
        {
            ...GDAE_STANDARD,
            defaultRoot: new Note(0),
            name: 'Solo'
        }
    ],
    maxExtraStrings: 0
};