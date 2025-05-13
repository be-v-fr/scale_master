import { ScaleCategory } from "../../interfaces/scale-category";

export const HIRAJOSHI: ScaleCategory = {
    name: 'Hira-Joshi',
    intervals: [0, 2, 3, 7, 8],
    modes: [
        {
            name: '-',
            interval: 0,
        },
        {
            name: 'Hon-Kumoi-Joshi',
            interval: 7,
        },
    ]
}