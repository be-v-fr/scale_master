import { Injectable } from '@angular/core';
import { Fretboard } from '../models/fretboard';
import { Note } from '../models/note';
import { TUNINGS } from '../const/tunings';

@Injectable({
  providedIn: 'root'
})
export class CurrentFretboardService {
  private _defaultFretboard: Fretboard = new Fretboard('guitar', 'standard', new Note(7));
  private _instrumentTunings?: string[];
  get instrumentTunings(): string[] | undefined {
    return this._instrumentTunings;
  }
  public fretboard: Fretboard = this._defaultFretboard;

  constructor() {
    this.loadinstrumentTunings();
  }

  public loadinstrumentTunings(): void {
    this._instrumentTunings = [];
    for(const tuning in TUNINGS[this.fretboard.instrument]) {
      if(TUNINGS[this.fretboard.instrument].hasOwnProperty(tuning)) {
        this._instrumentTunings.push(tuning); 
      }
    }
  }
}