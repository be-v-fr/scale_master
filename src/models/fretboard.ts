import { Note } from "./note";
import { INSTRUMENTS } from "../const/instruments";
import { Instrument } from "../interfaces/instrument";
import { Tuning } from "../interfaces/tuning";
import { isEqual } from "lodash";

export class Fretboard {
    root: Note;
    instrument: Instrument;
    numberOfStrings: number;
    tuning: Tuning;

    constructor(instrument: Instrument, tuning: Tuning, root: Note, numberOfStrings?: number) {
        this.root = root;
        this.instrument = instrument;
        this.tuning = tuning;
        this._checkInstrumentAndTuning(instrument, tuning);
        const defaultNumberOfStrings = this.defaultNumberOfStrings;
        this.numberOfStrings = numberOfStrings && numberOfStrings > defaultNumberOfStrings ? numberOfStrings : defaultNumberOfStrings;
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
            let index = this.root.index + i;
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

    private _checkInstrument(instrument: Instrument): void {
        if (!INSTRUMENTS.find(i => isEqual(i, instrument))) {
            throw (`Instrument "${instrument}" broken or not found.`);
        }
    }

    private _checkTuningForInstrument(tuning: Tuning): void {
        if (!this.instrument.tunings.find(t => isEqual(t, tuning))) {
            const tuningNames: string[] = [];
            this.instrument.tunings.forEach(t => tuningNames.push(t.name));
            throw (`Tuning "${tuning.name}" broken or not found in tunings for instrument "${this.instrument.name}": ${tuningNames}`);
        }
    }

    private _checkInstrumentAndTuning(instrument: Instrument, tuning: Tuning): void {
        this._checkInstrument(instrument);
        this._checkTuningForInstrument(tuning);
    }

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

    setIntervalAsRoot(interval: number) {
        this.tuning.intervals = this.tuning.intervals.map(i => i - interval);
        this.root.index += interval;
        this.root.normalize();
    }
}