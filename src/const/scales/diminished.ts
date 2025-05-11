import { ScaleCategory } from "../../interfaces/scale-category";

export const DIMINISHED: ScaleCategory = {
    name: 'diminished',
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
    modes: [
        {
            name: 'whole half',
            interval: 0,
        },
        {
            name: 'half whole',
            interval: 2,
        }
    ]
}