import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private _noteDisplay: 'name' | 'meaning' = 'name';
  lefty: boolean = false;

  constructor() { }

  get noteDisplay(): 'name' | 'meaning' {
    return this._noteDisplay;
  }

  get noteMeaningDisplay(): boolean {
    return this._noteDisplay === 'meaning';
  }

  set noteMeaningDisplay(meaning: boolean) {
    this._noteDisplay = meaning ? 'meaning' : 'name';
  }
}
