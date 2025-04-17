import { ScaleCategory } from "./scale-category";
import { Tuning } from "./tuning";

export interface StorageSave {
    data: ScaleCategory | Tuning,
    timestamp: number
}