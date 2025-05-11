import { ScaleCategory } from "../../interfaces/scale-category";

export const PENTATONIC: ScaleCategory = {
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
        },
        {
            name: 'Egyptian',
            interval: 2,
        }
    ]
};