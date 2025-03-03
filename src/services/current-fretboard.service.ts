import { Injectable } from '@angular/core';
import { INSTRUMENTS } from '../const/instruments';
import { Tuning } from '../interfaces/tuning';
import { Instrument } from '../interfaces/instrument';
import { Fretboard } from '../models/fretboard';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class CurrentFretboardService {
  private _defaultFretboard: Fretboard = new Fretboard(INSTRUMENTS[0], INSTRUMENTS[0].tunings[0], new Note(7));

  public fretboard: Fretboard = this._defaultFretboard;

  constructor() {
    this.checkCurrentTuning();
  }

  get instrumentTuningNames(): string[] {
    const tuningNames: string[] = [];
    this.fretboard.instrument.tunings.forEach(t => tuningNames.push(t.name));
    return tuningNames;
  }

  get instrumentName(): string {
    return this.fretboard.instrument.name;
  }

  set instrumentName(value: string) {
    const instrument: Instrument | undefined = INSTRUMENTS.find(i => i.name === value);
    if(instrument) {
      this.fretboard.instrument = instrument;
    } else {
      throw(`Instrument with name ${value} not found.`);
    }
  }

  get tuningName(): string | undefined {
    return this.fretboard.tuning?.name;
  }

  set tuningName(value: string) {
    const tuning: Tuning | undefined = this.fretboard.instrument.tunings.find(t => t.name === value);
    if(tuning) {
      this.fretboard.tuning = tuning;
    } else {
      throw(`Fretboard tuning with name ${value} not found in the current instrument's tunings array: ${this.fretboard.instrument.tunings}`);
    }
  }

  checkCurrentTuning(): void {
      const currentTuningFound: Tuning | undefined = this.fretboard.instrument.tunings.find(t => t === this.fretboard.tuning);
      if (!currentTuningFound) {
        this.fretboard.tuning = this.fretboard.instrument.tunings[0];
        this.fretboard.numberOfStrings = this.fretboard.defaultNumberOfStrings;
      }
    }
}