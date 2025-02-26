import { Note } from "./note";
import { TUNINGS } from "../const/tunings";

export class Fretboard {
    root: Note;
    instrument: string;
    tuning: string;
    intervals: number[];
    notes: Note[] = [];

    constructor(instrument: string, tuning: string, root: Note) {
        this.root = root;
        this.instrument = instrument;
        this.tuning = tuning;
        this.intervals = TUNINGS[instrument as keyof {}][tuning];
        if(this.intervals.length == 0) {
            console.error('Tuning broken or not found in TUNINGS.');
        }
        this.setNotes();
    }

    setNotes() {
        for (let i = 0; i < this.intervals.length; i++) {
            const interval = this.intervals[i];
            const index = (this.root.index + interval) % 12;
            this.notes.push(new Note(index));
        }
    }
}