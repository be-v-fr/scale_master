import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  public currentStep: number = 0;
  private _scaleSteps: number = 3;
  private _fretboardSteps: number = 2;

  constructor(
    private router: Router
  ) { }

  get totalSteps(): number {
    switch(this.router.url.split('/').pop()) {
      case 'scale': return this._scaleSteps;
      case 'fretboard': return this._fretboardSteps;
    }
    return 0;
  }
}
