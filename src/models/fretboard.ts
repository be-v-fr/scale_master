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
        return TUNINGS[this.instrument as keyof {}][this.tuning];
    }

    get intervals(): number[] {
        if (this.numberOfStrings > this.defaultNumberOfStrings) {
            // zusätzliche Intervalle richtig hinzufügen
        }
        return this.intervalsForDefaultStringNumber;
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
}