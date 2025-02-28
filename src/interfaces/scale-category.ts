import { ScaleMode } from "./scale-mode"

export interface ScaleCategory {
    name: string
    intervals: number[]
    modes: ScaleMode[]
}