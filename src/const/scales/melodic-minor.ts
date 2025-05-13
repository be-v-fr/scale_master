import { ScaleCategory } from "../../interfaces/scale-category";

export const MELODIC_MINOR: ScaleCategory = {
    name: 'Melodic Minor',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    modes: [
        {
            name: '-',
            interval: 0,
        },
        {
            name: 'Dorian',
            interval: 2,
        },
        {
            name: 'Lydian',
            interval: 3,
        },
        {
            name: 'Overtone',
            interval: 5,
        },
        {
            name: 'Mixolydian',
            interval: 7,
        },
        {
            name: 'Aeolian',
            interval: 9,
        },
                {
            name: 'Altered',
            interval: 11,
        },
    ]
};