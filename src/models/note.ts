import { NOTES } from "../const/notes";
import { NoteName } from "../interfaces/note-name";
import { getModTwelveIndex } from "../utils/mod.utils";
import { capitalizeFirstLetter } from "../utils/string.utils";

/**
 * Represents a musical note, including pitch index, accidental, and optional scale degree meaning.
 */
export class Note {
    index: number;
    accidental: 'natural' | 'sharp' | 'flat';
    meaning?: number;


    /**
     * Constructor for property definition.
     */
    constructor(index?: number, accidental?: 'natural' | 'sharp' | 'flat', meaning?: number) {
        this.index = index ? index : 0;
        this.accidental = accidental ? accidental : 'natural';
        this.meaning = meaning ? meaning : undefined;
        if (meaning && (meaning < 0 || meaning > 7)) {
            console.error(`Meaning index "${meaning}" is outside of the permitted range.`);
        }
    }

    get name(): string {
        const index: number = getModTwelveIndex(this.index);
        return NOTES[index][this.accidental];
    }


    /**
     * Normalizes the index to be within 0–11.
     */
    normalize(): void {
        this.index = getModTwelveIndex(this.index);
    }


    /**
     * Normalizes a list of notes to ensure all indexes are within 0–11.
     */
    public static normalizeMany(notes: Note[]): Note[] {
        notes.forEach((n: Note, i: number) => notes[i].normalize());
        return notes;
    }


    /**
     * Returns the formatted note name with a capitalized first letter.
     */
    print(): string {
        return capitalizeFirstLetter(this.name);
    }


    /**
     * Returns a natural note name and its flat alternative (e.g., "Bb/A#").
     */
    printNaturalWithFlatAlternative(): string {
        const index: number = getModTwelveIndex(this.index);
        const name = capitalizeFirstLetter(NOTES[index]['natural']);
        return (name.length === 1) ? name : name + '/' + capitalizeFirstLetter(NOTES[index]['flat']);
    }


    /**
     * Converts a string representation of a note to a Note object.
     */
    static textToNote(value: string): Note {
        value = value.toString().trim().split('/')[0].toLowerCase();
        const noteData: { noteIndex: number | undefined, accidental: 'natural' | 'sharp' | 'flat' | undefined } = this._textToNoteData(value);
        if (!noteData.noteIndex && noteData.noteIndex !== 0) {
            console.error(`Text to note conversion for "${value}" failed because no matching note exists.`);
        }
        return new Note(noteData.noteIndex, noteData.accidental);
    }


    /**
     * Searches for a matching note index and accidental from a string value.
     */
    private static _textToNoteData(value: string): { noteIndex: number | undefined, accidental: 'natural' | 'sharp' | 'flat' | undefined } {
        for (let i = 0; i < NOTES.length; i++) {
            const noteName: NoteName = NOTES[i];
            const accidental: 'natural' | 'sharp' | 'flat' | undefined = this._getAccidental(value, noteName);
            if (accidental) {
                return { noteIndex: i, accidental: accidental }
            }
        }
        return { noteIndex: undefined, accidental: undefined }
    }


    /**
     * Determines the accidental type of a note name string.
     */
    private static _getAccidental(value: string, noteName: NoteName): 'natural' | 'sharp' | 'flat' | undefined {
        switch (value) {
            case noteName.natural: return 'natural';
            case noteName.sharp: return 'sharp';
            case noteName.flat: return 'flat';
            default: return undefined;
        }
    }


    /**
     * Calculates the index of a note based on the interval from this note.
     */
    getIntervalIndex(interval: number) {
        const index: number = this.index + interval;
        return getModTwelveIndex(index);
    }


    /**
     * Calculates the interval between this note and another root index.
     */
    getIntervalFromIndex(rootIndex: number) {
        const interval: number = this.index - rootIndex;
        return getModTwelveIndex(interval);
    }


    /**
     * Determines whether the natural form of the note includes a sharp symbol.
     */
    isNaturallySharp(): boolean {
        const index = getModTwelveIndex(this.index);
        return NOTES[index].natural.includes('#');
    }


    /**
     * Checks whether the first letter of this note's name matches another note's.
     */
    firstLetterEqualsNoteName(note: Note): boolean {
        return this.name[0] === note.name[0];
    }


    /**
     * Copies accidentals from reference notes to matching notes based on pitch.
     */
    public static matchOverlappingNotes(notes: Note[], referenceNotes: Note[]): Note[] {
        referenceNotes = this.normalizeMany(referenceNotes);
        notes.forEach((n: Note, i: number) => {
            n.normalize();
            const scaleNote: Note | undefined = referenceNotes.find(rn => rn.index === n.index);
            if (scaleNote) {
                notes[i].accidental = scaleNote.accidental;
            }
        });
        return notes;
    }


    /**
     * Applies consistent accidentals (sharp or flat) across a note list, using reference notes if provided.
     */
    public static makeConsistentAccidentals(notes: Note[], referenceNotes?: Note[]): Note[] {
        const notesToCheck: Note[] = referenceNotes ? referenceNotes : notes;
        const countSharps: number = notesToCheck.filter(n => n.isSharp()).length;
        const countFlats: number = notesToCheck.filter(n => n.isFlat()).length;
        if (countFlats >= countSharps) {
            return this.flattenNotes(notes);
        } else {
            return this.naturalizeNotes(notes);
        }
    }


    /**
     * Checks if the note is represented as sharp.
     */
    isSharp(): boolean {
        return this.name.includes('#') || this.name.includes('x');
    }


    /**
     * Checks if the note is represented as flat.
     */
    isFlat(): boolean {
        return this.name.includes('b') || this.name.length === 3;
    }


    /**
     * Switches the accidental between natural and flat.
     */
    toggleAccidental(): void {
        this.accidental = (this.accidental === 'flat') ? 'natural' : 'flat';
    }


    /**
     * Changes all sharp notes in a list to flat accidentals.
     */
    static flattenNotes(notes: Note[]): Note[] {
        notes.forEach((n: Note, i: number) => {
            if (n.isSharp()) {
                notes[i].accidental = 'flat';
            }
        })
        return notes;
    }


    /**
     * Changes all flat notes in a list to natural accidentals.
     */
    static naturalizeNotes(notes: Note[]): Note[] {
        notes.forEach((n: Note, i: number) => {
            if (n.isFlat()) {
                notes[i].accidental = 'natural';
            }
        })
        return notes;
    }
}