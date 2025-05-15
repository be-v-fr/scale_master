import { Instrument } from "../../interfaces/instrument";
import { GDAE_STANDARD } from "../tunings";

export const MANDOLIN: Instrument = {
    name: 'Mandolin',
    tunings: [GDAE_STANDARD],
    maxExtraStrings: 0
};