import { Injectable } from '@angular/core';
import { INSTRUMENTS } from '../const/instruments';
import { Instrument } from '../interfaces/instrument';

@Injectable({
  providedIn: 'root'
})
export class TuningsDataService {
  get instrumentNames(): string[] | undefined {
    const instrumentNames: string[] = [];
    INSTRUMENTS.forEach(i => instrumentNames.push(i.name));
    return instrumentNames;
  }
}
