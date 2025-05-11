import { ScaleCategory } from "../interfaces/scale-category";
import { DOUBLE_HARMONIC } from "./scales/double-harmonic";
import { CHROMATIC } from "./scales/chromatic";
import { DIATONIC } from "./scales/diatonic";
import { DIMINISHED } from "./scales/diminished";
import { PENTATONIC } from "./scales/pentatonic";
import { PERSIAN } from "./scales/persian";
import { AUGMENTED } from "./scales/augmented";

export const SCALES: ScaleCategory[] = [
    DIATONIC,
    PENTATONIC,
    AUGMENTED,
    DIMINISHED,
    DOUBLE_HARMONIC,
    CHROMATIC,
    PERSIAN,
];