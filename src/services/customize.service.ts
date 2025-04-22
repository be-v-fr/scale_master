import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentScaleService } from './current-scale.service';
import { CurrentFretboardService } from './current-fretboard.service';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  private _scaleSteps: number = 3;
  private _fretboardSteps: number = 5;
  private _currentStringSelection: number = 0;
  get currentStringSelection(): number | undefined {
    return (this.mode === 'fretboard' && this.currentStep === 2) ? this._currentStringSelection : undefined;
  }
  set currentStringSelection(value: number) {
    this._currentStringSelection = value;
  }
  allowAddingStrings: boolean = false;
  maxNumberOfExtraStrings: number = 0;

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
    if (this.isActive) {
      const urlSegments: string[] = this.router.url.split('/');
      const editIndex: number = urlSegments.findIndex(s => s === 'edit');
      const step: number = parseInt(urlSegments[editIndex + 1], 10);
      if (step >= 0 && step < maxStep) {
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

  get maxFretboardIntervals(): number[] | undefined {
    if (this.mode === 'fretboard' && this.currentStep === 3 && this.allowAddingStrings) {
      this.currFretboard.fretboard.numberOfStrings = this.currFretboard.fretboard.defaultNumberOfStrings + this.maxNumberOfExtraStrings;
      return this.currFretboard.fretboard.intervals;
    } else {
      this.currFretboard.fretboard.numberOfStrings = this.currFretboard.fretboard.defaultNumberOfStrings;
    }
    return undefined;
  }

  get previousStringCorrectionInterface(): number {
    return this.currFretboard.fretboard.tuning.extraStrings.previousStringCorrection || 0;
  }

  set previousStringCorrectionInterface(value: number) {
    this.currFretboard.fretboard.tuning.extraStrings.previousStringCorrection = value;
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
