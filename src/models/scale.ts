import { Note } from "./note";
import { SCALES } from "../const/scales";

export class Scale {
    category: string;
    mode: string;
    intervals: number[];
    root: Note;
    accidentals?: ('natural' | 'sharp' | 'flat')[];

    constructor(root: Note, category: string, mode: string) {
        this.root = root;
        this.category = category;
        this.mode = mode;
        this.intervals = SCALES[category as keyof {}][mode];
        if(this.intervals.length == 0) {
            throw('Mode broken or not found.');
        }
        this.setAccidentals();
    }

    getNaturalNotes(): Note[] {
        let notes: Note[] = [];
        notes.push(this.root);
        for (let i = 1; i < this.intervals.length; i++) {
            const interval = this.intervals[i];
            notes.push(this.getNaturalNoteFromInterval(interval));
        }
        return notes;
    }

    getNaturalNoteFromInterval(interval: number): Note {
        const index = (this.root.index + interval) % 12;
        return new Note(index);
    }

    getNotes(): Note[] {
        // später accidentals einbinden!
        return this.getNaturalNotes();
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
        const naturalNotes: Note[] = this.getNaturalNotes();
        for (let i = 0; i < naturalNotes.length; i++) {
            let note = naturalNotes[i];
            if(note.index == 1) {

            }
        }
    }

    getNoteNames() {
        let names: string[] = [];
        const notes: Note[] = this.getNotes();
        notes.forEach((n: Note) => names.push(n.name));
        return names;
    }
}