import { ScaleMode } from "./scale-mode"

/**
 * Represents a scale. Optionally includes modes.
 */
export interface ScaleCategory {
    name: string
    intervals: number[]
    modes?: ScaleMode[]
}