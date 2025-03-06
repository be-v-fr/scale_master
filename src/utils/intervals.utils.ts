import { getModTwelveIndex } from "./mod.utils";

export function getHarmonicMeaningIndex(interval: number): number {
    interval = getModTwelveIndex(interval);
    switch(interval) {
        case 0: return 1;
        case 1:
        case 2: return 2;
        case 3:
        case 4: return 3;
        case 5: return 4;
        case 6:
        case 7: return 5;
        case 8:
        case 9: return 6;
        case 10:
        case 11: return 7;
        default: return 0;
    }
}

export function getAlphabetDistance(higherLetter: string, lowerLetter: string): number {
    if (!/^[a-g]$/.test(higherLetter) || !/^[a-g]$/.test(lowerLetter)) {
        throw new Error("Only letters from 'a' to 'g' are allowed.");
    }
    const higherPosition: number = higherLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    const lowerPosition: number = lowerLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    return higherPosition - lowerPosition;
}