import { ScaleCategory } from "../../interfaces/scale-category";

export const DOUBLE_HARMONIC: ScaleCategory = {
    name: 'double harmonic',
    intervals: [0, 1, 4, 5, 7, 8, 11],
    modes: [
        {
            name: 'major',
            interval: 0,
        },
        {
            name: 'lydian',
            interval: 1,
        },
        {
            name: 'ultraphrygian',
            interval: 4,
        },
        {
            name: 'Hungarian minor',
            interval: 5,
        },
        {
            name: 'oriental',
            interval: 7,
        },
        {
            name: 'ionian',
            interval: 8,
        },
        {
            name: 'locrian',
            interval: 11,
        },
    ]
};