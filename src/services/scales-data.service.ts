import { Injectable } from '@angular/core';
import { SCALES } from '../const/scales';
import { Note } from '../models/note';

/**
 * Service for handling general scales and notes data.
 */
@Injectable({
  providedIn: 'root'
})
export class ScalesDataService {
  private _naturalNotes?: Note[];


  /**
   * Constructor for data initialization.
   */
  constructor() {
    this._loadNaturalNotes();
  }


  /**
   * Returns an array conatining all natural notes.
   */
  get naturalNotes(): Note[] | undefined {
    return this._naturalNotes;
  }


  /**
   * Returns an array containing all scale category names.
   */
  get categoryNames(): string[] {
    return SCALES.map(s => s.name);
  }


  /**
   * Loads natural notes by constructing the natural note for each
   * of the 12 different notes.
   */
  private _loadNaturalNotes(): void {
    this._naturalNotes = [];
    for (let i = 0; i < 12; i++) {
      this._naturalNotes.push(new Note(i, 'natural'));
    }
  }
}
