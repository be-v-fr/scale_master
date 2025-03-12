import { Tuning } from "./tuning";

export interface Instrument {
    name: string,
    tunings: Tuning[],
    maxExtraStrings: number,
}
