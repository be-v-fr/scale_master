/**
 * Represents a mode of a scale.
 * The mode is defined using the interval within the scale that serves as its root interval. 
 */
export interface ScaleMode {
    name: string,
    interval: number,
}