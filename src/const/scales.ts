import { ScaleCategory } from "../interfaces/scale-category";

export const SCALES: Record<string, ScaleCategory> = { // VORZEICHEN INTEGRIEREN!! --> hängt von Grundton ab?! --> gibt es eine Möglichkeit der automatischen Ermittlung??
    diatonic: {
        intervals: [0, 2, 4, 5, 7, 9, 11],
        modes: {
            major: 0,
            minor: 9,
        }
    },
    pentatonic: {
        intervals: [0, 2, 4, 7, 9],
        modes: {
            major: 0,
            minor: 9,
        }
    }
};