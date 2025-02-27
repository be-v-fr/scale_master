import { Injectable } from '@angular/core';
import { Scale } from '../models/scale';
import { Note } from '../models/note';
import { SCALES } from '../const/scales';

@Injectable({
  providedIn: 'root'
})
export class CurrentScaleService {
  private _defaultScale = new Scale(new Note(0), 'diatonic', 'minor');
  private _categoryModes?: string[];
  get categoryModes(): string[] | undefined {
    return this._categoryModes;
  }
  public scale: Scale = this._defaultScale; // sicherstellen, dass bei Änderung von "category" die Modes neu geladen werden

  constructor() {
    this.loadcategoryModes();
  }

  public loadcategoryModes(): void {
    this._categoryModes = [];
    for(const mode in SCALES[this.scale.category].modes) {
      if(SCALES[this.scale.category].modes.hasOwnProperty(mode)) {
        this._categoryModes.push(mode); 
      }
    }
  }
}
