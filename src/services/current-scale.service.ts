import { Injectable } from '@angular/core';
import { Scale } from '../models/scale';
import { Note } from '../models/note';
import { SCALES } from '../const/scales';
import { ScaleMode } from '../interfaces/scale-mode';
import { ScaleCategory } from '../interfaces/scale-category';
import { ScalesDataService } from './scales-data.service';

/**
 * Service for handling the current scale.
 */
@Injectable({
  providedIn: 'root'
})
export class CurrentScaleService {
  private _defaultScale = new Scale(new Note(0), SCALES[0], { name: 'minor', interval: 9 });
  public scale: Scale = this._defaultScale;
  isCustom: boolean = false;


  /**
   * Constructor for injection of services and data initialization.
   */
  constructor(
    private scalesData: ScalesDataService
  ) {
    this.checkCurrentMode();
  }


  /**
   * Returns the names of the modes corresponding to the current category.
   */
  get categoryModeNames(): string[] {
    return this.scale.category.modes?.map(m => m.name) || [];
  }


  /**
   * Returns the current category's name.
   */
  get categoryName(): string {
    return this.scale.category.name;
  }


  /**
   * Updates the current category by name.
   */
  set categoryName(value: string) {
    const category: ScaleCategory | undefined = SCALES.find(s => s.name === value);
    if (category) {
      this.scale.category = category;
    } else {
      throw (`Scale category with name ${value} not found.`);
    }
  }


  /**
   * Returns the current mode's name.
   */
  get modeName(): string | undefined {
    return this.scale.mode?.name;
  }


  /**
   * Updates the current mode by name.
   */
  set modeName(value: string) {
    const mode: ScaleMode | undefined = this.scale.category.modes?.find(s => s.name === value);
    if (mode) {
      this.scale.mode = mode;
    } else {
      throw (`Scale mode with name ${value} not found in the current category's modes array: ${this.scale.category.modes}`);
    }
  }


  /**
   * Returns an array of all existing notes matched to the current scale's accidentals.
   * Also matches the accidentals of the notes not contained in the current scale.
   */
  get matchedNotes(): Note[] | undefined {
    if (this.scalesData.naturalNotes) {
      const matchedNotes: Note[] = Note.matchOverlappingNotes(this.scalesData.naturalNotes, this.scale.notes);
      return Note.makeConsistentAccidentals(matchedNotes, this.scale.notes);
    }
    return undefined;    
  }


  /**
   * Returns the names of the notes matched to the current scale.
   */
  get matchedNoteNames(): string[] | undefined {
    return this.matchedNotes?.map(n => n.print());
  }


  /**
   * Checks if the current mode is available for the current category.
   * Sets mode to the category's default mode otherwise.
   */
  checkCurrentMode(): void {
    if (this.scale.category.modes) {
      const currentModeFound: ScaleMode | undefined = this.scale.category.modes.find(m => m === this.scale.mode);
      if (!currentModeFound) {
        this.scale.mode = this.scale.category.modes[0];
      }
    }
  }


  /**
   * Updates the current scale's root note by transforming
   * the note name and creating a Note instance.
   * @param noteString - note name.
   */
  updateCurrScaleRootNote(noteString: string) {
    noteString = noteString.split('/')[0];
    const note: Note = new Note().textToNote(noteString);
    this.scale.root = note;
  }


  closeCustom(): void {
    this.scale = this._defaultScale;
    this.isCustom = false;
  }
}
