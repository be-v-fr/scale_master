import { ScaleCategory } from "../interfaces/scale-category";

export const SCALES: ScaleCategory[] = [
    {
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
    },
    {
        name: 'pentatonic',
        intervals: [0, 2, 4, 7, 9],
        modes: [
            {
                name: 'major',
                interval: 0,
            },
            {
                name: 'minor',
                interval: 9,
            }
        ]
    },
    {
        name: 'chromatic',
        intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }
];