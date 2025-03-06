import { Injectable } from '@angular/core';
import { SCALES } from '../const/scales';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class ScalesDataService {
  private _naturalNotes?: Note[];

  constructor() {
    this._loadNaturalNotes();
  }

  get naturalNotes(): Note[] | undefined {
    return this._naturalNotes;
  }

  get categoryNames(): string[] {
    const categoryNames: string[] = [];
    SCALES.forEach(s => categoryNames.push(s.name));
    return categoryNames;
  }

  private _loadNaturalNotes(): void {
    this._naturalNotes = [];
    for (let i = 0; i < 12; i++) {
      this._naturalNotes.push(new Note(i, 'natural'));
    }
  }
}
