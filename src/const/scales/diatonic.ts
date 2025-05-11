import { ScaleCategory } from "../../interfaces/scale-category";

export const DIATONIC: ScaleCategory = {
    name: 'diatonic',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    modes: [
        {
            name: 'major',
            interval: 0,
        },
        {
            name: 'minor',
            interval: 9,
        },
        {
            name: 'dorian',
            interval: 2,
        },
        {
            name: 'phrygian',
            interval: 4,
        },
        {
            name: 'lydian',
            interval: 5,
        },
        {
            name: 'mixolydian',
            interval: 7,
        },
        {
            name: 'locrian',
            interval: 11,
        },
    ]
};