import { Note } from "./note";
import { INSTRUMENTS } from "../const/instruments";
import { Instrument } from "../interfaces/instrument";
import { Tuning } from "../interfaces/tuning";
import { isEqual } from "lodash";
import { replaceSurplus0IntervalsW12s } from "../utils/tunings.utils";
import { CONFIG } from "../const/config";
import { getModTwelveIndex } from "../utils/mod.utils";

/**
 * Represents a musical fretboard, including instrument, tuning, and logic for calculating note intervals.
 */
export class Fretboard {
    rootPitchIndex: number;
    instrument: Instrument;
    numberOfStrings: number;
    tuning: Tuning;


    /**
     * Constructor for property definition.
     */
    constructor(instrument: Instrument, tuning: Tuning, rootPitchIndex: number, numberOfStrings?: number) {
        this.rootPitchIndex = rootPitchIndex;
        this.instrument = instrument;
        this.tuning = tuning;
        this.numberOfStrings = numberOfStrings && numberOfStrings > this.defaultNumberOfStrings ? numberOfStrings : this.defaultNumberOfStrings;
    }


    get defaultNumberOfStrings(): number {
        return this.intervalsForDefaultStringNumber.length;
    }


    get intervalsForDefaultStringNumber(): number[] {
        return Array.from(this.tuning.intervals).reverse();
    }


    get intervals(): number[] {
        const intervals: number[] = Array.from(this.intervalsForDefaultStringNumber);
        return this.numberOfStrings > this.defaultNumberOfStrings ? this._addIntervalsForExtraStrings(intervals) : intervals;
    }


    get naturalNotes(): Note[] {
        const notes: Note[] = [];
        this.intervals.forEach(i => {
            let index = this.rootPitchIndex + i;
            notes.push(new Note(index));
        });
        return notes;
    }


    get instrIndex(): number {
        return INSTRUMENTS.findIndex(i => isEqual(i, this.instrument));
    }

    
    get tuningIndex(): number {
        return this.instrument.tunings.findIndex(t => isEqual(t, this.tuning));
    }


    /**
     * Appends calculated intervals for extra strings based on tuning rules.
     */
    private _addIntervalsForExtraStrings(intervals: number[]): number[] {
        for (let i = this.defaultNumberOfStrings; i < this.numberOfStrings; i++) {
            let value: number = intervals[i - 1];
            value -= this.tuning.extraStrings.interval;
            intervals.push(value);
            if (this.tuning.extraStrings.previousStringCorrection) {
                intervals[i - 1] += this.tuning.extraStrings.previousStringCorrection;
            }
        }
        intervals.forEach((interval, i) => intervals[i] -= intervals[intervals.length - 1]);
        return intervals;
    }


    /**
     * Shifts all intervals so that the given interval becomes the new root.
     */
    setIntervalAsRoot(interval: number) {
        this.tuning.intervals = this.tuning.intervals.map(i => i - interval);
        this.rootPitchIndex += interval;
        this.rootPitchIndex = getModTwelveIndex(this.rootPitchIndex);
    }


    /**
     * Replaces redundant 0 intervals at the end of the tuning with 12s for clarity.
     */
    replaceSurplus0IntervalsW12s() {
        replaceSurplus0IntervalsW12s(this.tuning.intervals);
    }


    /**
     * Sets the maximum allowed number of extra strings based on global configuration.
     */
    allowAnyExtraStrings(): void {
        this.instrument.maxExtraStrings = CONFIG.maxStrings - this.tuning.intervals.length;
    }
}