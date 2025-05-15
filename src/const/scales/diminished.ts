import { ScaleCategory } from "../../interfaces/scale-category";

export const DIMINISHED: ScaleCategory = {
    name: 'Diminished',
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
    modes: [
        {
            name: 'Whole half',
            interval: 0,
        },
        {
            name: 'Half whole',
            interval: 2,
        }
    ]
}