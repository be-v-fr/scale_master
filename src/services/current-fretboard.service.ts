import { Injectable } from '@angular/core';
import { INSTRUMENTS } from '../const/instruments';
import { Tuning } from '../interfaces/tuning';
import { Instrument } from '../interfaces/instrument';
import { Fretboard } from '../models/fretboard';
import { Note } from '../models/note';
import { CurrentScaleService } from './current-scale.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentFretboardService {
  private _defaultFretboard: Fretboard = new Fretboard(INSTRUMENTS[0], INSTRUMENTS[0].tunings[0], new Note(7));

  public fretboard: Fretboard = this._defaultFretboard;

  constructor(
    private currScale: CurrentScaleService,
  ) {
    this.updateTuningForNewInstrument();
  }

  get notes(): Note[] {
    const notes = Note.matchOverlappingNotes(this.fretboard.naturalNotes, this.currScale.scale.notes);
    return Note.makeConsistentAccidentals(notes, this.currScale.scale.notes);
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
    if (instrument) {
      this.fretboard.instrument = instrument;
      this.updateTuningForNewInstrument();
      this.updateRootToNewTuning();
    } else {
      throw (`Instrument with name ${value} not found.`);
    }
  }

  get tuningName(): string | undefined {
    return this.fretboard.tuning?.name;
  }

  set tuningName(value: string) {
    const diffToDefault: number = this.fretboard.root.index - this.fretboard.tuning.defaultRoot.index;
    const tuning: Tuning | undefined = this.fretboard.instrument.tunings.find(t => t.name === value);
    if (tuning) {
      this.fretboard.tuning = tuning;
      this.updateRootToNewTuning(diffToDefault);
    } else {
      throw (`Fretboard tuning with name ${value} not found in the current instrument's tunings array: ${this.fretboard.instrument.tunings}`);
    }
  }

  get numbersOfStrings(): number[] | undefined {
    const numbersOfStrings: number[] = [];
    if (this.fretboard.instrument.maxExtraStrings > 0) {
      for (let i = 0; i <= this.fretboard.instrument.maxExtraStrings; i++) {
        numbersOfStrings.push(this.fretboard.defaultNumberOfStrings + i);
      }
    }
    return numbersOfStrings;
  }

  updateTuningForNewInstrument(): void {
    const currentTuningFound: Tuning | undefined = this.fretboard.instrument.tunings.find(t => t === this.fretboard.tuning);
    if (!currentTuningFound) {
      this.fretboard.tuning = this.fretboard.instrument.tunings[0];
      this.fretboard.numberOfStrings = this.fretboard.defaultNumberOfStrings;
    }
  }

  updateRootToNewTuning(diffToDefault?: number): void {
    let updatedIndex: number = this.fretboard.tuning.defaultRoot.index;
    if(diffToDefault) {
      updatedIndex += diffToDefault;
    }
    const note: Note | undefined = this.currScale.matchedNotes?.find(n => n.index === updatedIndex);
    this.fretboard.root = note ? note : this.fretboard.tuning.defaultRoot;
  }
}