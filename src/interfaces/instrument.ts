import { Tuning } from "./tuning";

/**
 * Represents an instrument.
 */
export interface Instrument {
    name: string,
    tunings: Tuning[],
    maxExtraStrings: number,
}
