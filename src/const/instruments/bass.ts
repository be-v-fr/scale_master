import { Instrument } from "../../interfaces/instrument";
import { DADGBE_DROP, EADGBE_STANDARD } from "../tunings";

export const BASS: Instrument = {
    name: 'Bass',
    tunings: [
        {
            ...EADGBE_STANDARD,
            intervals: EADGBE_STANDARD.intervals.slice(0, 4)
        },
        {
            ...DADGBE_DROP,
            intervals: DADGBE_DROP.intervals.slice(0, 4)
        },
    ],
    maxExtraStrings: 2
};