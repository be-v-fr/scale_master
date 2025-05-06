import { Note } from "./note";
import { SCALES } from "../const/scales";
import { ScaleMode } from "../interfaces/scale-mode";
import { ScaleCategory } from "../interfaces/scale-category";
import { isEqual } from "lodash";
import { getModTwelveIndex, modWithSubZero } from "../utils/mod.utils";
import { getAlphabetDistance, getHarmonicMeaningIndex } from "../utils/intervals.utils";

export class Scale {
    category: ScaleCategory;
    mode?: ScaleMode;
    root: Note;

    constructor(root: Note, category: ScaleCategory, mode?: ScaleMode) {
        this.root = root;
        this.category = category;
        if (mode) {
            this.checkModeInCategory(mode);
            this.mode = mode;
        } else if (this.category.modes && this.category.modes.length > 0) {
            this.mode = this.category.modes[0];
        }
    }

    get notes(): Note[] {
        const defaultNotes = this._constructNotes(this.root);
        if (this.root.name.length > 1) {
            const flatRoot: Note = new Note(this.root.index, 'flat');
            if (flatRoot.name[1] === 'b') {
                const flatNotes: Note[] = this._constructNotes(flatRoot);
                return this._selectMoreNaturalNotes(flatNotes, defaultNotes);
            }
        }
        return defaultNotes;
    }

    get name(): string {
        const baseName: string = `${this.root.print()} ${this.category.name}`;
        return this.mode ? `${baseName} ${this.mode.name}` : baseName;
    }

    get catIndex(): number {
        return SCALES.findIndex(s => isEqual(s, this.category));
    }

    get modeIndex(): number {
        return this.category.modes ? this.category.modes.findIndex(m => isEqual(m, this.mode)) : -1;
    }

    private _constructNotes(root: Note): Note[] {
        let notes: Note[] = [];
        const intervals: number[] = Array.from(this.category.intervals);
        intervals.forEach((interval: number) => {
            const note = this._contructNote(interval, root);
            notes.push(note);
        });
        return notes;
    }

    private _contructNote(interval: number, root: Note): Note {
        interval = this.applyModeToBaseInterval(interval);
        const note: Note = this.createNaturalNoteFromInterval(interval);
        if (interval === 0) {
            note.accidental = root.accidental;
        } else {
            const meaningDiff: number = getHarmonicMeaningIndex(interval) - 1;
            let letterDiff: number = getAlphabetDistance(note.name[0], root.name[0]);
            letterDiff = modWithSubZero(letterDiff, 7);
            note.accidental = this._getAccidentalFromDiffs(letterDiff, meaningDiff);
        }
        return note;
    }

    private _selectMoreNaturalNotes(notes1: Note[], notes2: Note[]): Note[] {
        const doubleAccidentals1: number = this._countDoubleAccidentals(notes1);
        const doubleAccidentals2: number = this._countDoubleAccidentals(notes2);
        if (doubleAccidentals1 < doubleAccidentals2) {
            return notes1;
        } else if (doubleAccidentals1 === doubleAccidentals2) {
            const noAccidentals1: number = this._countNoAccidentals(notes1);
            const noAccidentals2: number = this._countNoAccidentals(notes2)
            if (noAccidentals1 >= noAccidentals2) {
                return notes1;
            }
        }
        return notes2;
    }

    private _countDoubleAccidentals(notes: Note[]): number {
        return notes.filter(n => (n.name.includes('x') || n.name.length === 3)).length;
    }

    private _countNoAccidentals(notes: Note[]): number {
        return notes.filter(n => n.name.length === 1).length;
    }

    applyModeToBaseInterval(baseInterval: number) {
        if (this.mode) {
            baseInterval -= this.mode.interval;
        }
        return getModTwelveIndex(baseInterval);
    }

    createNaturalNoteFromInterval(interval: number): Note {
        const meaning: number = getHarmonicMeaningIndex(interval);
        const note: Note = new Note(
            this.root.index + interval,
            'natural',
            meaning
        );
        note.normalize();
        return note;
    }

    private _getAccidentalFromDiffs(letterDiff: number, meaningDiff: number): 'natural' | 'sharp' | 'flat' {
        if (letterDiff < meaningDiff) {
            return 'flat';
        } else if (letterDiff > meaningDiff) {
            return 'sharp';
        }
        return 'natural';
    }

    checkModeInCategory(mode: ScaleMode): void {
        if (!this.category.modes || !this.category.modes.find(m => isEqual(m, mode))) {
            const modeNames: string[] = [];
            this.category.modes?.forEach(m => modeNames.push(m.name));
            console.error(`Mode "${mode.name}" broken or not found in modes from category "${this.category.name}": ${modeNames}`);
        }
    }

    toggleInterval(interval: number): void {
        if (interval === 0) return;
        const arrayIndex: number = this.category.intervals.findIndex(i => i === interval);
        if (arrayIndex >= 0) {
            this.category.intervals.splice(arrayIndex, 1);
            this.removeModeByInterval(interval);
        } else {
            this.category.intervals.push(interval);
        }
    }

    removeModeByInterval(interval: number) {
        this.category.modes = this.category.modes?.filter(m => m.interval !== interval);
        if (this.category.modes && this.category.modes.length === 0) this.category.modes = undefined;
    }

    toggleMode(interval: number): void {
        if (this.modeExists(interval)) {
            this.removeModeByInterval(interval);
        } else if (this.category.intervals.includes(interval)) {
            this.addMode(interval);
        }
    }

    getMode(interval: number): ScaleMode | undefined {
        return this.category.modes?.find(m => m.interval === interval);
    }

    get primeMode(): ScaleMode | undefined {
        return this.getMode(0);
    }

    resetMode() {
        this.mode = this.primeMode;
    }

    modeExists(interval: number): boolean {
        return this.getMode(interval) !== undefined;
    }

    addMode(interval: number): void {
        if (this.category.intervals.includes(interval)) {
            const mode: ScaleMode = { name: `untitled/${interval}`, interval: interval };
            if (!this.category.modes) this.category.modes = [];
            this.category.modes.push(mode);
        }
    }
}