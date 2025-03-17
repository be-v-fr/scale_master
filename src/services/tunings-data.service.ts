import { Injectable } from '@angular/core';
import { INSTRUMENTS } from '../const/instruments';

/**
 * Service for handling general tunings data.
 */
@Injectable({
  providedIn: 'root'
})
export class TuningsDataService {


  /**
   * Returns an array containing all instrument names.
   */
  get instrumentNames(): string[] | undefined {
    return INSTRUMENTS.map(i => i.name);
  }
}
