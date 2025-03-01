import { Note } from "./note";
import { TUNINGS } from "../const/tunings";

export class Fretboard {
    root: Note;
    instrument: string;
    numberOfStrings: number;
    tuning: string;

    constructor(instrument: string, tuning: string, root: Note, numberOfStrings?: number) {
        this.root = root;
        this.instrument = instrument;
        this.tuning = tuning;
        const defaultNumberOfStrings = this.defaultNumberOfStrings;
        this.numberOfStrings = numberOfStrings && numberOfStrings > defaultNumberOfStrings ? numberOfStrings : defaultNumberOfStrings;
    }

    get defaultNumberOfStrings(): number {
        return this.intervalsForDefaultStringNumber.length;
    }

    get intervalsForDefaultStringNumber(): number[] {
        const tuning: number[] = TUNINGS[this.instrument as keyof {}][this.tuning];
        return Array.from(tuning).reverse();
    }

    get intervals(): number[] {
        const intervals: number[] = Array.from(this.intervalsForDefaultStringNumber);
        return this.numberOfStrings > this.defaultNumberOfStrings ? this.addIntervalsForExtraStrings(intervals) : intervals;
    }

    get notes(): Note[] {
        const notes: Note[] = [];
        this.intervals.forEach(i => {
            let index = (this.root.index + i) % 12;
            while (index < 0) {
                index += 12;
            }
            notes.push(new Note(index));
        });
        return notes;
    }

    addIntervalsForExtraStrings(intervals: number[]): number[] {
        for(let i = this.defaultNumberOfStrings; i < this.numberOfStrings; i++) {
            let value: number = intervals[i - 1];
            value += 7;
            intervals.push(value % 12);
        }
        return intervals;
    }
}