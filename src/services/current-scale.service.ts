import { Injectable } from '@angular/core';
import { Scale } from '../models/scale';
import { Note } from '../models/note';
import { SCALES } from '../const/scales';
import { ScaleMode } from '../interfaces/scale-mode';
import { ScaleCategory } from '../interfaces/scale-category';
import { ScalesDataService } from './scales-data.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentScaleService {
  private _defaultScale = new Scale(new Note(0), SCALES[0], { name: 'minor', interval: 9 });
  public scale: Scale = this._defaultScale; // sicherstellen, dass bei Änderung von "category" die Modes neu geladen werden

  constructor(
    private scalesData: ScalesDataService
  ) {
    this.checkCurrentMode();
  }

  get categoryModeNames(): string[] {
    const modeNames: string[] = [];
    this.scale.category.modes?.forEach(m => modeNames.push(m.name));
    return modeNames;
  }

  get categoryName(): string {
    return this.scale.category.name;
  }

  set categoryName(value: string) {
    const category: ScaleCategory | undefined = SCALES.find(s => s.name === value);
    if (category) {
      this.scale.category = category;
    } else {
      throw (`Scale category with name ${value} not found.`);
    }
  }

  get modeName(): string | undefined {
    return this.scale.mode?.name;
  }

  set modeName(value: string) {
    const mode: ScaleMode | undefined = this.scale.category.modes?.find(s => s.name === value);
    if (mode) {
      this.scale.mode = mode;
    } else {
      throw (`Scale mode with name ${value} not found in the current category's modes array: ${this.scale.category.modes}`);
    }
  }

  get matchedNoteNames(): string[] | undefined {
    if (this.scalesData.naturalNotes) {
      const noteNames: string[] = new Array<string>(12);
      this.scalesData.naturalNotes.forEach((note: Note, i: number) => {
        if (this.scalesData.naturalNotes) {
          const scaleNote: Note | undefined = this.scale.notes.find(n => n.index === note.index);
          noteNames[i] = scaleNote ? scaleNote.print() : this.scalesData.naturalNotes[i].print();
        }
      });
      return noteNames;
    }
    return undefined;
  }

  checkCurrentMode(): void {
    if (this.scale.category.modes) {
      const currentModeFound: ScaleMode | undefined = this.scale.category.modes.find(m => m === this.scale.mode);
      if (!currentModeFound) {
        this.scale.mode = this.scale.category.modes[0];
      }
    }
  }
}
