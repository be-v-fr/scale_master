import { ScaleCategory } from "../../interfaces/scale-category";

export const PENTATONIC: ScaleCategory = {
    name: 'Pentatonic',
    intervals: [0, 2, 4, 7, 9],
    modes: [
        {
            name: 'Major',
            interval: 0,
        },
        {
            name: 'Minor',
            interval: 9,
        },
        {
            name: 'Egyptian',
            interval: 2,
        }
    ]
};