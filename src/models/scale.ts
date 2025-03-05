import { Note } from "./note";
import { SCALES } from "../const/scales";
import { ScaleMode } from "../interfaces/scale-mode";
import { ScaleCategory } from "../interfaces/scale-category";
import { isEqual } from "lodash";
import { getCyclicArrayIndex } from "../utils/array.utils";

export class Scale {
    category: ScaleCategory;
    mode?: ScaleMode;
    root: Note;

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
        const notes: Note[] = this.naturalNotes;
        this.naturalNotes.forEach((n: Note, i: number) => {
            const previousIndex: number = getCyclicArrayIndex(notes, i - 1);
            const doublePreviousIndex: number = getCyclicArrayIndex(notes, i - 2);
            if (n.isNaturallySharp()) {
                const equalsPrevious: boolean = n.firstLetterEqualsNoteName(notes[previousIndex]);
                const equalsDoublePrevious: boolean = n.firstLetterEqualsNoteName(notes[doublePreviousIndex]);
                notes[i].accidental = (equalsPrevious || equalsDoublePrevious) ? 'flat' : 'sharp';
            }
        });
        return notes;
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