import { Note } from "./note";
import { SCALES } from "../const/scales";

export class Scale {
    category: string;
    mode: string;
    root: Note;
    accidentals?: ('natural' | 'sharp' | 'flat')[];

    constructor(root: Note, category: string, mode: string) {
        this.root = root;
        if (!SCALES[category as keyof {}]) {
            throw (`Scale category "${category}" broken or not found.`);
        }
        if (!SCALES[category as keyof {}].modes[mode]) {
            throw (`Mode "${mode}" broken or not found.`);
        }
        this.category = category;
        this.mode = mode;
        this.setAccidentals();
    }

    getNaturalNotes(): Note[] {
        let notes: Note[] = [];
        const intervals: number[] = SCALES[this.category as keyof {}].intervals;
        intervals.forEach((i: number) => {
            i = this.applyModeToBaseInterval(i);
            const note: Note = this.getNaturalNoteFromInterval(i);
            notes.push(note);
        });
        return notes;
    }

    applyModeToBaseInterval(baseInterval: number) {
        baseInterval -= SCALES[this.category as keyof {}].modes[this.mode];
        return (baseInterval + 12) % 12;
    }

    getNaturalNoteFromInterval(interval: number): Note {
        const index = (this.root.index + interval + 12) % 12;
        return new Note(index);
    }

    getNotes(): Note[] {
        // später accidentals einbinden!
        return this.getNaturalNotes();
    }

    setAccidentals() {
        if (this.category == 'diatonic') {
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
            if (note.index == 1) {

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