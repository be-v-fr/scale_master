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
            name: 'Ionian',
            interval: 1,
        },
        {
            name: 'Ultraphrygian',
            interval: 4,
        },
        {
            name: 'Todi Thaat',
            interval: 5,
        },
        {
            name: 'Lydian',
            interval: 6,
        },
        {
            name: 'Mixolydian Augmented',
            interval: 8,
        },
        {
            name: 'Chromatic Hypophrygian Inverse',
            interval: 11,
        }
    ]
};