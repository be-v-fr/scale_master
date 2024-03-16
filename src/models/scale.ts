import { isFormArray } from "@angular/forms";
import { Note } from "./note";

export class Scale {
    readonly SCALES = { // VORZEICHEN INTEGRIEREN!!
        diatonic: {
            major: [0, 2, 4, 5, 7, 9, 11],
            minor: [0, 2, 3, 5, 7, 8, 10]
        }
    };
    category: string;
    mode: string;
    intervals: number[];
    root: Note;
    notes: Note[];

    constructor(root: Note, category: string, mode: string) {
        this.root = root;
        this.category = category;
        this.mode = mode;
        this.intervals = this.SCALES[category as keyof {}][mode];
        if(this.intervals.length == 0) {
            console.error('Mode broken or not found in SCALES.');
        }
        this.notes = this.getNaturalNotes();
        this.setAccidentals();
    }

    getNaturalNotes() {
        let notes: Note[] = [];
        for (let i = 1; i < this.intervals.length; i++) {
            const interval = this.intervals[i];
            notes.push(this.getNaturalNoteFromInterval(interval));
        }
        return notes;
    }

    getNaturalNoteFromInterval(interval: number) {
        const index = (this.root.index + interval) % 12;
        return new Note(index);
    }

    setAccidentals() {
        if(this.category == 'diatonic') {
            this.setDiatonicAccidentals();
        }
    }

    setDiatonicAccidentals() {
        // Indizes der im notes-Array vorhandenen Noten abfragen
        // Accidentals entsprechend zuordnen
        // https://www.bergziege-owl.de/vorzeichen-und-tonarten/
        for (let i = 0; i < this.notes.length; i++) {
            let note = this.notes[i];
            if(note.index == 1) {

            }
        }
    }
}