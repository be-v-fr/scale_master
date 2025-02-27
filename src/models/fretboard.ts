import { Note } from "./note";
import { TUNINGS } from "../const/tunings";

export class Fretboard {
    root: Note;
    instrument: string;
    tuning: string;

    constructor(instrument: string, tuning: string, root: Note) {
        this.root = root;
        this.instrument = instrument;
        this.tuning = tuning;
    }

    getIntervals(): number[] {
        return TUNINGS[this.instrument as keyof {}][this.tuning];
    }

    getNotes(): Note[] {
        const notes: Note[] = [];
        const intervals: number[] = this.getIntervals();
        intervals.forEach(i => {
            let index = (this.root.index + i) % 12;
            while (index < 0) {
                index += 12;
            }
            notes.push(new Note(index));
        });
        return notes;
    }
}