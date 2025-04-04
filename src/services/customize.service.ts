import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  customizing?: 'scale' | 'fretboard';

  constructor() { }
}
