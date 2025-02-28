import { Injectable } from '@angular/core';
import { TUNINGS } from '../const/tunings';

@Injectable({
  providedIn: 'root'
})
export class TuningsDataService {
  private _instruments?: string [];
  get instruments(): string[] | undefined {
    return this._instruments;
  }

  constructor() {
    this._loadInstruments();
  }

  private _loadInstruments(): void {
    this._instruments = [];
    for(const instrument in TUNINGS) {
      if(TUNINGS.hasOwnProperty(instrument)) {
        this._instruments.push(instrument); 
      }
    }
  }
}
