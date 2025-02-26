import { Injectable } from '@angular/core';
import { Scale } from '../models/scale';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class CurrentScaleService {
  private _defaultScale = new Scale(new Note(0), 'diatonic', 'minor');
  public scale: Scale = this._defaultScale;

  constructor() { }
}
