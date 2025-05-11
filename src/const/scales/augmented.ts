import { ScaleCategory } from "../../interfaces/scale-category";

export const AUGMENTED: ScaleCategory = {
    name: 'augmented',
    intervals: [0, 2, 4, 5, 8, 9, 11],
    modes: [
        {
            name: 'major',
            interval: 0,
        },
        {
            name: 'harmonic minor',
            interval: 9,
        },
        {
            name: 'Romanian minor',
            interval: 2,
        },
        {
            name: 'freygish',
            interval: 4,
        },
        {
            name: 'lydian',
            interval: 5,
        },
        {
            name: 'super-locrian',
            interval: 8,
        },
        {
            name: 'locrian',
            interval: 11,
        },
    ]
};