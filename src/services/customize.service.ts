import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentScaleService } from './current-scale.service';
import { CurrentFretboardService } from './current-fretboard.service';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  private _scaleSteps: number = 3;
  private _fretboardSteps: number = 2;

  constructor(
    private router: Router,
    private currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService,
  ) { }

  get mode(): 'scale' | 'fretboard' | null {
    const mainSegments: string[] = this.router.url.split('/');
    if (mainSegments.length >= 4) {
      const modeUrlSegment: string = mainSegments[3].split(';')[0].split('(')[0];
      switch (modeUrlSegment) {
        case 'scale':
        case 'fretboard': return modeUrlSegment;
        default: return null;
      }
    }
    return null;
  }

  get isActive(): boolean {
    return this.router.url.includes('edit');
  }

  get currentStep(): number | undefined {
    const maxStep: number = 10;
    if(this.isActive) {
      const urlSegments: string[] = this.router.url.split('/');
      const editIndex: number = urlSegments.findIndex(s => s === 'edit');
      const step: number = parseInt(urlSegments[editIndex + 1], 10);
      if(step >= 0 && step < maxStep) {
        return step;
      } else {
        console.error('Invalid step number:', step + '.', 'Maximum step is set to:', maxStep);
      }
    }
    return undefined;
  }

  get totalSteps(): number {
    switch (this.mode) {
      case 'scale': return this._scaleSteps;
      case 'fretboard': return this._fretboardSteps;
    }
    return 0;
  }

  get editScaleParams(): { catIndex: number, modeIndex?: number } {
    const params: { catIndex: number, modeIndex?: number } = {
      catIndex: this.currScale.scale.catIndex
    }
    if (this.currScale.scale.category.modes) {
      params.modeIndex = this.currScale.scale.modeIndex;
    }
    return params;
  }

  get editFretboardParams(): { instrIndex: number, tuningIndex: number } {
    return {
      instrIndex: this.currFretboard.fretboard.instrIndex,
      tuningIndex: this.currFretboard.fretboard.tuningIndex
    }
  }

  getEditRouteWParams(editMode: 'scale' | 'fretboard', useCurrent: boolean): (string | number | {})[] {
    const route: (string | number | {})[] = ['edit', 0];
    route.push(editMode);
    if (useCurrent) {
      const params: {} = (editMode === 'scale' ? this.editScaleParams : this.editFretboardParams);
      route.push(params);
    }
    return route;
  }
}
