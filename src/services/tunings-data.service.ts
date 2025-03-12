import { Injectable } from '@angular/core';
import { INSTRUMENTS } from '../const/instruments';
import { Instrument } from '../interfaces/instrument';

@Injectable({
  providedIn: 'root'
})
export class TuningsDataService {
  get instrumentNames(): string[] | undefined {
    return INSTRUMENTS.map(i => i.name);
  }
}
