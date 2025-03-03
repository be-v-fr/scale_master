import { Note } from "./note";
import { SCALES } from "../const/scales";
import { ScaleMode } from "../interfaces/scale-mode";
import { ScaleCategory } from "../interfaces/scale-category";
import { isEqual } from "lodash";

export class Scale {
    category: ScaleCategory;
    mode?: ScaleMode;
    root: Note;
    accidentals?: ('natural' | 'sharp' | 'flat')[];

    constructor(root: Note, category: ScaleCategory, mode?: ScaleMode) {
        this.root = root;
        this.checkCategory(category);
        this.category = category;
        if (mode) {
            this.checkModeInCategory(mode);
            this.mode = mode;
        } else if (this.category.modes && this.category.modes.length > 0) {
            this.mode = this.category.modes[0];
        }
        this.setAccidentals();
    }

    get naturalNotes(): Note[] {
        let notes: Note[] = [];
        const intervals: number[] = this.category.intervals;
        intervals.forEach((i: number) => {
            i = this.applyModeToBaseInterval(i, intervals);
            const note: Note = this.getNaturalNoteFromInterval(i);
            notes.push(note);
        });
        return notes;
    }

    get notes(): Note[] {
        // später accidentals einbinden!
        return this.naturalNotes;
    }

    applyModeToBaseInterval(baseInterval: number, baseIntervals: number[]) {
        if (this.mode) {
            if (!baseIntervals.includes(this.mode.interval)) {
                throw ('The base intervals of this scale do not include the requested mode interval.');
            }
            baseInterval -= this.mode.interval;
        }
        return (baseInterval + 12) % 12;
    }

    getNaturalNoteFromInterval(interval: number): Note {
        const index = (this.root.index + interval + 12) % 12;
        return new Note(index);
    }

    setAccidentals() {
        if (this.category.name == 'diatonic') {
            this.setDiatonicAccidentals();
        }
    }

    setDiatonicAccidentals() {
        // Indizes der im notes-Array vorhandenen Noten abfragen
        // Accidentals entsprechend zuordnen
        // https://www.bergziege-owl.de/vorzeichen-und-tonarten/
        const naturalNotes: Note[] = this.naturalNotes;
        for (let i = 0; i < naturalNotes.length; i++) {
            let note = naturalNotes[i];
            if (note.index == 1) {

            }
        }
    }

    checkCategory(category: ScaleCategory): void {
        if (!SCALES.find(s => isEqual(s, category))) {
            throw (`Scale category "${category}" broken or not found.`);
        }
    }

    checkModeInCategory(mode: ScaleMode): void {
        if (!this.category.modes || !this.category.modes.find(m => isEqual(m, mode))) {
            const modeNames: string[] = [];
            this.category.modes?.forEach(m => modeNames.push(m.name));
            throw (`Mode "${mode.name}" broken or not found in modes from category "${this.category.name}": ${modeNames}`);
        }
    }

    get noteNames(): string[] {
        let names: string[] = [];
        this.notes.forEach((n: Note) => names.push(n.name));
        return names;
    }
}