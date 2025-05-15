import { Note } from "./note";
import { SCALES } from "../const/scales";
import { ScaleMode } from "../interfaces/scale-mode";
import { ScaleCategory } from "../interfaces/scale-category";
import { cloneDeep, isEqual } from "lodash";
import { getModTwelveIndex, modWithSubZero } from "../utils/mod.utils";
import { getAlphabetDistance, getHarmonicMeaningIndex } from "../utils/intervals.utils";
import { equalItems } from "../utils/array.utils";

/**
 * Represents a musical scale, including the current mode (if any) and root note.
 */
export class Scale {
    category: ScaleCategory;
    mode?: ScaleMode;
    root: Note;


    /**
     * Constructor for property definition.
     */
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
        let notes = this._constructNotes(this.root);
        notes = this._optimizeNoteFirstLetters(notes);
        if (this.root.name.length > 1) {
            const flatRoot: Note = new Note(this.root.index, 'flat');
            if (flatRoot.name[1] === 'b') {
                const flatNotes: Note[] = this._constructNotes(flatRoot);
                return this._selectMoreNaturalNotes(flatNotes, notes);
            }
        }
        return notes;
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


    /**
     * Builds the scale notes from the root.
     */
    private _constructNotes(root: Note): Note[] {
        let notes: Note[] = [];
        const intervals: number[] = Array.from(this.category.intervals);
        intervals.forEach((interval: number) => {
            const note = this._contructNote(interval, root);
            notes.push(note);
        });
        return notes;
    }


    /** 
     * Constructs a note from an interval relative to the root.
     */
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


    /**
     * Chooses the more readable of two note lists.
     */
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


    /**
     * Returns all sets of notes with duplicate letter names.
     */
    private _getRedundantNotesAll(notes: Note[]): Note[][] {
        const redundantNotesAll: Note[][] = [];
        notes.forEach(n => {
            const redundantNotesSet: Note[] = this._getRedundantNotesSet(n, notes);
            if (redundantNotesSet.length > 1 && !redundantNotesAll.some(set => equalItems(set, redundantNotesSet))) {
                redundantNotesAll.push(redundantNotesSet);
            }
        });
        return redundantNotesAll;
    }


    /**
     * Finds all notes with the same starting letter.
     */
    private _getRedundantNotesSet(note: Note, notes: Note[]): Note[] {
        return notes.filter(n => n.firstLetterEqualsNoteName(note));
    }


    /**
     * Checks if the note has a unique letter name.
     */
    private _isUniqueNoteLetter(note: Note, notes: Note[]): boolean {
        return this._getRedundantNotesSet(note, notes).length === 1;
    }


    /**
     * Optimizes notes to avoid duplicated letter names.
     */
    private _optimizeNoteFirstLetters(notes: Note[]): Note[] {
        const redundantNotesAll: Note[][] = this._getRedundantNotesAll(notes);
        if (redundantNotesAll.length > 0) {
            redundantNotesAll.forEach(set => {
                set.forEach(n => notes = this._optimizeRedundantNote(n, notes));
            });
        }
        return notes;
    }


    /**
     * Attempts to rename a redundant note.
     */
    private _optimizeRedundantNote(note: Note, notes: Note[]): Note[] {
        const noteClone: Note = cloneDeep(note);
        noteClone.toggleAccidental();
        if (noteClone.name.length < 3) {
            const updatedNotes: Note[] = notes.map(n2 => n2.index === noteClone.index ? noteClone : n2);
            if (this._isUniqueNoteLetter(noteClone, updatedNotes)) {
                return updatedNotes;
            }
        }
        return notes;
    }


    /**
     * Counts notes with double accidentals.
     */
    private _countDoubleAccidentals(notes: Note[]): number {
        return notes.filter(n => (n.name.includes('x') || n.name.length === 3)).length;
    }


    /**
     * Counts notes without accidentals.
     */
    private _countNoAccidentals(notes: Note[]): number {
        return notes.filter(n => n.name.length === 1).length;
    }


    /**
     * Applies the mode offset to a base interval.
     */
    applyModeToBaseInterval(baseInterval: number) {
        if (this.mode) {
            baseInterval -= this.mode.interval;
        }
        return getModTwelveIndex(baseInterval);
    }


    /**
     * Creates a natural note from a given interval.
     */
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


    /**
     * Determines the accidental from letter and harmonic differences.
     */
    private _getAccidentalFromDiffs(letterDiff: number, meaningDiff: number): 'natural' | 'sharp' | 'flat' {
        if (letterDiff < meaningDiff) {
            return 'flat';
        } else if (letterDiff > meaningDiff) {
            return 'sharp';
        }
        return 'natural';
    }


    /**
     * Checks whether a mode exists in the category.
     */
    checkModeInCategory(mode: ScaleMode): void {
        if (!this.category.modes || !this.category.modes.find(m => isEqual(m, mode))) {
            const modeNames: string[] = [];
            this.category.modes?.forEach(m => modeNames.push(m.name));
            console.error(`Mode "${mode.name}" broken or not found in modes from category "${this.category.name}": ${modeNames}`);
        }
    }


    /**
     * Toggles the presence of an interval in the category.
     */
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


    /**
     * Removes all modes matching the given interval.
     */
    removeModeByInterval(interval: number) {
        this.category.modes = this.category.modes?.filter(m => m.interval !== interval);
        if (this.category.modes && this.category.modes.length === 0) this.category.modes = undefined;
    }


    /**
     * Toggles a mode for the given interval.
     */
    toggleMode(interval: number): void {
        if (this.modeExists(interval)) {
            this.removeModeByInterval(interval);
        } else if (this.category.intervals.includes(interval)) {
            this.addMode(interval);
        }
    }


    /**
     * Retrieves a mode by interval.
     */
    getMode(interval: number): ScaleMode | undefined {
        return this.category.modes?.find(m => m.interval === interval);
    }


    get primeMode(): ScaleMode | undefined {
        return this.getMode(0);
    }


    /**
     * Resets the current mode to the prime mode.
     */
    resetMode() {
        this.mode = this.primeMode;
    }


    /**
     * Checks if a mode exists for the given interval.
     */
    modeExists(interval: number): boolean {
        return this.getMode(interval) !== undefined;
    }


    /**
     * Adds a new unnamed mode for the given interval.
     */
    addMode(interval: number): void {
        if (this.category.intervals.includes(interval)) {
            const mode: ScaleMode = { name: `untitled/${interval}`, interval: interval };
            if (!this.category.modes) this.category.modes = [];
            this.category.modes.push(mode);
        }
    }
}