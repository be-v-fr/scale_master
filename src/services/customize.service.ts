import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScaleCategory } from '../interfaces/scale-category';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  private _scaleSteps: number = 3;
  private _fretboardSteps: number = 2;

  constructor(
    private router: Router
  ) { }

  get mode(): 'scale' | 'fretboard' | null {
    const modeUrlSegment: string = this.router.url.split('/')[3].split('(')[0];
    switch(modeUrlSegment) {
      case 'scale':
      case 'fretboard': return modeUrlSegment;
      default: return null;
    }
  }

  get totalSteps(): number {
    switch (this.mode) {
      case 'scale': return this._scaleSteps;
      case 'fretboard': return this._fretboardSteps;
    }
    return 0;
  }
}
