import { Injectable } from '@angular/core';
import { INSTRUMENTS } from '../const/instruments';
import { Tuning } from '../interfaces/tuning';
import { Instrument } from '../interfaces/instrument';
import { Fretboard } from '../models/fretboard';
import { Note } from '../models/note';
import { CurrentScaleService } from './current-scale.service';
import { getModTwelveIndex } from '../utils/mod.utils';
import { CONFIG } from '../const/config';

/**
 * Service for handling the current fretboard.
 */
@Injectable({
  providedIn: 'root'
})
export class CurrentFretboardService {
  private get _defaultFretboard(): Fretboard {
    return new Fretboard(INSTRUMENTS[0], INSTRUMENTS[0].tunings[0], 7);
  };
  public fretboard: Fretboard = this._defaultFretboard;
  isCustom: boolean = false;


  /**
   * Constructor for dependency injection and data initialization.
   */
  constructor(
    private currScale: CurrentScaleService,
  ) {
    this.updateTuningForNewInstrument();
  }


  /**
   * Returns the notes corresponding to the current fretboard's open strings.
   */
  get notes(): Note[] {
    const notes = Note.matchOverlappingNotes(this.fretboard.naturalNotes, this.currScale.scale.notes);
    return Note.makeConsistentAccidentals(notes, this.currScale.scale.notes);
  }


  get root(): Note {
    return this.notes.find(n => n.index === this.fretboard.rootPitchIndex) || new Note(this.fretboard.rootPitchIndex);
  }


  /**
   * Returns the names of the tunings corresponding to the current instrument.
   */
  get instrumentTuningNames(): string[] {
    return this.fretboard.instrument.tunings.map(t => t.name);
  }


  /**
   * Returns the current instrument's name.
   */
  get instrumentName(): string {
    return this.fretboard.instrument.name;
  }


  /**
   * Updates the current instrument by name.
   */
  set instrumentName(value: string | undefined) {
    if (value) {
      const instrument: Instrument | undefined = INSTRUMENTS.find(i => i.name === value);
      if (instrument) {
        this.fretboard.instrument = instrument;
        this.updateTuningForNewInstrument();
        this.updateRootToNewTuning();
      } else {
        console.error(`Instrument with name ${value} not found.`);
      }
    }
  }


  /**
   * Returns the current tuning's name.
   */
  get tuningName(): string | undefined {
    return this.fretboard.tuning?.name;
  }


  /**
   * Updates the current tuning by name.
   */
  set tuningName(value: string | undefined) {
    if (value) {
      const diffToDefault: number = this.fretboard.rootPitchIndex - this.fretboard.tuning.defaultRootPitchIndex;
      const tuning: Tuning | undefined = this.fretboard.instrument.tunings.find(t => t.name === value);
      if (tuning) {
        this.fretboard.tuning = tuning;
        this.updateRootToNewTuning(diffToDefault);
      } else {
        console.error(`Fretboard tuning with name ${value} not found in the current instrument's tunings array: ${this.fretboard.instrument.tunings}`);
      }
    }
  }


  /**
   * Returns the different numbers of strings that are available for the current instrument.
   */
  get numbersOfStrings(): number[] {
    const numbersOfStrings: number[] = [];
    if (this.fretboard.instrument.maxExtraStrings > 0) {
      for (let i = 0; i <= this.fretboard.instrument.maxExtraStrings; i++) {
        const numberOfStrings: number = this.fretboard.defaultNumberOfStrings + i;
        if (numberOfStrings > CONFIG.maxStrings) break;
        numbersOfStrings.push(numberOfStrings);
      }
    }
    return numbersOfStrings;
  }


  /**
   * Updates the current fretboard's root note by creating
   * a Note instance from the note name5.
   * @param noteString - note name.
   */
  updateCurrFretboardRootNote(noteString: string) {
    const note: Note = Note.textToNote(noteString);
    this.fretboard.rootPitchIndex = note.index;
  }


  /**
   * Checks if the current tuning is available for the current instruments.
   * Sets tuning to the instrument's default tuning otherwise.
   */
  updateTuningForNewInstrument(): void {
    const currentTuningFound: Tuning | undefined = this.fretboard.instrument.tunings.find(t => t === this.fretboard.tuning);
    if (!currentTuningFound) {
      this.fretboard.tuning = this.fretboard.instrument.tunings[0];
      this.fretboard.numberOfStrings = this.fretboard.defaultNumberOfStrings;
    }
  }


  /**
   * Updates the root note of the current tuning to its default root note,
   * adding a difference if given.
   * @param diffToDefault - Difference to default root in half tone steps.
   */
  updateRootToNewTuning(diffToDefault?: number): void {
    let updatedIndex: number = this.fretboard.tuning.defaultRootPitchIndex;
    if (diffToDefault) {
      updatedIndex += diffToDefault;
    }
    const note: Note | undefined = this.currScale.matchedNotes?.find(n => n.index === updatedIndex);
    this.fretboard.rootPitchIndex = note ? note.index : this.fretboard.tuning.defaultRootPitchIndex;
  }


  /**
   * Retrieves the note of the current scale corresponding to a given position on the fretboard. 
   * @param instrumentString - Index number of the string (counting from high to low).
   * @param fret - Fret number (0 to 11).
   */
  getNoteFromFret(instrumentString: number, fret: number): Note | undefined {
    const absoluteIndex: number = this.getFretNoteIndex(instrumentString, fret);
    return this.currScale.scale.notes.find(n => n.index === absoluteIndex);
  }


  /**
   * Retrieves the note index/pitch corresponding to a given position on the fretboard. 
   * @param instrumentString - Index number of the string (counting from high to low).
   * @param fret - Fret number (0 to 11).
   */
  getFretNoteIndex(instrumentString: number, fret: number): number {
    const instrumentStringNote: Note = this.notes[instrumentString];
    return instrumentStringNote.getIntervalIndex(fret);
  }


  /**
   * Checks if a given position on the fretboard corresponds to the current scale's root note.
   * @param instrumentString - Index number of the string (counting from high to low).
   * @param fret - Fret number (0 to 11).
   */
  isRoot(instrumentString: number, fret: number): boolean {
    return this.currScale.scale.root.index == this.getFretNoteIndex(instrumentString, fret);
  }


  /**
   * Checks if a fretboard position is a mode root.
   */
  isModeRoot(instrumentString: number, fret: number): boolean {
    let result: boolean = false;
    this.currScale.scale.category.modes?.forEach(m => {
      let modeIndex: number = this.currScale.scale.root.index + m.interval;
      modeIndex = getModTwelveIndex(modeIndex);
      const indexEqual: boolean = (modeIndex === this.getFretNoteIndex(instrumentString, fret));
      if (indexEqual) result = true;
    });
    return result;
  }


  /**
   * Resets to default fretboard and disables custom flag.
   */
  closeCustom(): void {
    this.fretboard = this._defaultFretboard;
    this.isCustom = false;
  }
}