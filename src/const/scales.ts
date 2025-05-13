import { ScaleCategory } from "../interfaces/scale-category";
import { DOUBLE_HARMONIC } from "./scales/double-harmonic";
import { CHROMATIC } from "./scales/chromatic";
import { DIATONIC } from "./scales/diatonic";
import { DIMINISHED } from "./scales/diminished";
import { PENTATONIC } from "./scales/pentatonic";
import { PERSIAN } from "./scales/persian";
import { AUGMENTED } from "./scales/augmented";
import { WHOLE_TONE } from "./scales/whole-tone";
import { JAPANESE } from "./scales/japanese";
import { HIRAJOSHI } from "./scales/hirajoshi";
import { BEBOP } from "./scales/bebop";
import { MELODIC_MINOR } from "./scales/melodic-minor";

export const SCALES: ScaleCategory[] = [
    DIATONIC,
    PENTATONIC,
    AUGMENTED,
    DIMINISHED,
    MELODIC_MINOR,
    BEBOP,
    DOUBLE_HARMONIC,
    CHROMATIC,
    WHOLE_TONE,
    PERSIAN,
    JAPANESE,
    HIRAJOSHI
];