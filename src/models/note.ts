import { NOTES } from "../const/notes";
import { NoteName } from "../interfaces/note-name";
import { getModTwelveIndex } from "../utils/mod.utils";

export class Note {
    index: number;
    accidental: 'natural' | 'sharp' | 'flat';

    constructor(index?: number, accidental?: 'natural' | 'sharp' | 'flat') {
        this.index = index ? index : 0;
        this.accidental = accidental ? accidental : 'natural';
    }

    get name(): string {
        const index: number = getModTwelveIndex(this.index);
        return NOTES[index][this.accidental];
    }

    normalize(): void {
        this.index = getModTwelveIndex(this.index);
    }

    public static normalizeMany(notes: Note[]): Note[] {
        notes.forEach((n: Note, i: number) => notes[i].normalize());
        return notes;
    }

    print(): string {
        return this.capitalizeFirstLetter(this.name);
    }

    printNaturalWithFlatAlternative(): string {
        const index: number = getModTwelveIndex(this.index);
        let name = this.capitalizeFirstLetter(NOTES[index]['natural']);
        return (name.length === 1) ? name : name + '/' + this.capitalizeFirstLetter(NOTES[index]['flat']);
    }

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    textToNote(value: string): Note {
        value = value.toString().toLowerCase();
        const noteData: { noteIndex: number | undefined, accidental: 'natural' | 'sharp' | 'flat' | undefined } = this._textToNoteData(value);
        if (!noteData.noteIndex && noteData.noteIndex !== 0) {
            throw (`Text to note conversion for "${value}" failed because no matching note exists.`);
        }
        return new Note(noteData.noteIndex, noteData.accidental);
    }

    private _textToNoteData(value: string): { noteIndex: number | undefined, accidental: 'natural' | 'sharp' | 'flat' | undefined } {
        for (let i = 0; i < NOTES.length; i++) {
            const noteName: NoteName = NOTES[i];
            const accidental: 'natural' | 'sharp' | 'flat' | undefined = this._getAccidental(value, noteName);
            if (accidental) {
                return { noteIndex: i, accidental: accidental }
            }
        }
        return { noteIndex: undefined, accidental: undefined }
    }

    private _getAccidental(value: string, noteName: NoteName): 'natural' | 'sharp' | 'flat' | undefined {
        switch (value) {
            case noteName.natural: return 'natural';
            case noteName.sharp: return 'sharp';
            case noteName.flat: return 'flat';
            default: return undefined;
        }
    }

    getIntervalIndex(interval: number) {
        const index = this.index + interval;
        return getModTwelveIndex(index);
    }

    isNaturallySharp(): boolean {
        const index = getModTwelveIndex(this.index);
        return NOTES[index].natural.includes('#');
    }

    firstLetterEqualsNoteName(note: Note): boolean {
        return this.name[0] === note.name[0];
    }

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

    public static makeConsistentAccidentals(notes: Note[], referenceNotes?: Note[]): Note[] {
        const notesToCheck: Note[] = referenceNotes ? referenceNotes : notes;
        const countSharps: number = notesToCheck.filter(n => n.isSharp()).length;
        const countFlats: number = notesToCheck.filter(n => n.isFlat()).length;
        if(countFlats >= countSharps) {
            return this.flattenNotes(notes);
        } else {
            return this.naturalizeNotes(notes);
        }
    }

    isSharp(): boolean {
        return this.name.includes('#') || this.name.includes('x');
    }

    isFlat(): boolean {
        return this.name.includes('b') || this.name.length === 3;        
    }

    static flattenNotes(notes: Note[]): Note[] {
        notes.forEach((n: Note, i: number) => {
            if(n.isSharp()) {
                notes[i].accidental = 'flat';
            }
        })
        return notes;        
    }

    static naturalizeNotes(notes: Note[]): Note[] {
        notes.forEach((n: Note, i: number) => {
            if(n.isFlat()) {
                notes[i].accidental = 'natural';
            }
        })
        return notes;        
    }
}