import { ScaleCategory } from "../../interfaces/scale-category";

export const PERSIAN: ScaleCategory = {
    name: 'Persian',
    intervals: [0, 1, 4, 5, 6, 8, 11],
    modes: [
        {
            name: '-',
            interval: 0,
        },
        {
            name: 'ionian',
            interval: 1,
        },
        {
            name: 'ultraphrygian',
            interval: 4,
        },
        {
            name: 'Todi Thaat',
            interval: 5,
        },
        {
            name: 'lydian',
            interval: 6,
        },
        {
            name: 'mixolydian augmented',
            interval: 8,
        },
        {
            name: 'chromatic hypophrygian inverse',
            interval: 11,
        }
    ]
};