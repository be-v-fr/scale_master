import { Injectable } from '@angular/core';
import { Scale } from '../models/scale';
import { Note } from '../models/note';
import { SCALES } from '../const/scales';
import { ScaleMode } from '../interfaces/scale-mode';
import { ScaleCategory } from '../interfaces/scale-category';

@Injectable({
  providedIn: 'root'
})
export class CurrentScaleService {
  private _defaultScale = new Scale(new Note(0), SCALES[0], { name: 'minor', interval: 9 });
  private _categoryModes?: ScaleMode[];
  public scale: Scale = this._defaultScale; // sicherstellen, dass bei Änderung von "category" die Modes neu geladen werden

  constructor() {
    this.loadCategoryModes();
  }

  get categoryModeNames(): string[] {
    const modeNames: string[] = [];
    this._categoryModes?.forEach(m => modeNames.push(m.name));
    return modeNames;
  }

  get categoryName(): string {
    return this.scale.category.name;
  }

  set categoryName(value: string) {
    const category: ScaleCategory | undefined = SCALES.find(s => s.name === value);
    if(category) {
      this.scale.category = category;
    } else {
      throw(`Scale category with name ${value} not found.`);
    }
  }

  get modeName(): string {
    return this.scale.mode.name;
  }

  set modeName(value: string) {
    const mode: ScaleMode | undefined = this._categoryModes?.find(s => s.name === value);
    if(mode) {
      this.scale.mode = mode;
    } else {
      throw(`Scale mode with name ${value} not found in the current categories' modes array: ${this._categoryModes}`);
    }
  }

  public loadCategoryModes(): void {
    this._categoryModes = [];
    this.scale.category.modes.forEach(m => this._categoryModes?.push(m));
    this.checkCurrentMode();
  }

  checkCurrentMode(): void {
    if (this._categoryModes) {
      const currentModeFound: ScaleMode | undefined = this.scale.category.modes.find(m => m === this.scale.mode);
      if (!currentModeFound) {
        this.scale.mode = this._categoryModes[0];
      }
    }
  }
}
