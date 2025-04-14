import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentScaleService } from '../services/current-scale.service';
import { CurrentFretboardService } from '../services/current-fretboard.service';
import { ScaleCategory } from '../interfaces/scale-category';
import { SCALES } from '../const/scales';
import { equalItems } from '../utils/array.utils';
import { Scale } from '../models/scale';
import { ScaleMode } from '../interfaces/scale-mode';
import { getModTwelveIndex } from '../utils/mod.utils';

@Directive({
  selector: '[appSearchCurrent]',
  standalone: true
})
export class SearchCurrentDirective implements OnInit {
  @Input({ alias: 'appSearchCurrent', required: true }) mode!: 'scale' | 'fretboard';
  @Output() indexFound: EventEmitter<{ primary: number, secondary: number }> = new EventEmitter();

  constructor(
    private currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService
  ) { }

  ngOnInit(): void {
    switch (this.mode) {
      case 'scale': this.searchScaleCategory(); break;
      case 'fretboard': this.searchFretboard();
    }
  }

  searchScaleCategory(): void {
    let catIndex: number = -1;
    let modeIndex: number = -1;
    SCALES.forEach((s: ScaleCategory, sIndex: number) => {
      if (equalItems(s.intervals, this.currScale.scale.category.intervals)) {
        catIndex = sIndex;
        modeIndex = 0;
      } else {
        s.modes?.forEach((m: ScaleMode, mIndex: number) => {
          if (mIndex >= 1) {
            const modeIntervals: number[] = s.intervals.map(i => i = getModTwelveIndex(i - m.interval));
            if (equalItems(modeIntervals, this.currScale.scale.category.intervals)) {
              catIndex = sIndex;
              modeIndex = mIndex;
            }
          }
        }
        );
      }
    });
    if (catIndex >= 0 && modeIndex >= 0) {
      this.indexFound.emit({ primary: catIndex, secondary: modeIndex });
    }
  }

  searchFretboard(): void {

  }
}
