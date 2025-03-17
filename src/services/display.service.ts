import { Injectable } from '@angular/core';

/**
 * Service for handling display settings.
 */
@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private _noteDisplay: 'name' | 'meaning' = 'name';
  lefty: boolean = false;


  /**
   * Returns current note display setting.
   */
  get noteDisplay(): 'name' | 'meaning' {
    return this._noteDisplay;
  }


  /**
   * Returns true, if the current note display is set to `meaning`.
   */
  get noteMeaningDisplay(): boolean {
    return this._noteDisplay === 'meaning';
  }


  /**
   * Sets the note display property to `meaning` or `name`.
   */
  set noteMeaningDisplay(meaning: boolean) {
    this._noteDisplay = meaning ? 'meaning' : 'name';
  }
}
