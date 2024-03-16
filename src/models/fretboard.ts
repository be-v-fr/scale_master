import { Note } from "./note";

export class Fretboard {
    readonly TUNINGS = {
        guitar: {
            standard: [0, 5, 10, 15, 19, 24],
            drop: [0, 7, 12, 17, 21, 26]
        }
    };

    root: Note;
    instrument: string;
    tuning: string;
    intervals: number[];
    notes: Note[] = [];

    constructor(instrument: string, tuning: string, root: Note) {
        this.root = root;
        this.instrument = instrument;
        this.tuning = tuning;
        this.intervals = this.TUNINGS[instrument as keyof {}][tuning];
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