import { Tuning } from "./tuning";

/**
 * Extends tuning to include additional information.
 * Required for custom tunings that are not related to any instrument.
 */
export interface ExtendedTuning extends Tuning {
    maxExtraStrings: number
}