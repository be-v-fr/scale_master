import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentScaleService } from '../services/current-scale.service';
import { CurrentFretboardService } from '../services/current-fretboard.service';
import { ScaleCategory } from '../interfaces/scale-category';
import { SCALES } from '../const/scales';
import { equalItems } from '../utils/array.utils';
import { ScaleMode } from '../interfaces/scale-mode';
import { getModTwelveIndex } from '../utils/mod.utils';
import { INSTRUMENTS } from '../const/instruments';
import { Instrument } from '../interfaces/instrument';
import { Tuning } from '../interfaces/tuning';

type ScaleResult = { catIndex: number, modeIndex: number };
type TuningResult = { instrIndex: number, tuningIndex: number };


/**
 * Searches for a matching scale category or instrument tuning based on the current scale or fretboard.
 */
@Directive({
  selector: '[appSearchCurrent]',
  standalone: true
})
export class SearchCurrentDirective implements OnInit {
  @Input({ alias: 'appSearchCurrent', required: true }) mode!: 'scale' | 'fretboard';
  @Output() indexFound: EventEmitter<{ primary: number, secondary: number }> = new EventEmitter();


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService
  ) { }


  /**
   * Initializes the directive by searching based on the provided mode.
   */
  ngOnInit(): void {
    switch (this.mode) {
      case 'scale': this.searchScaleCategories(); break;
      case 'fretboard': this.searchFretboard();
    }
  }


  /**
   * Searches for the scale category that matches the current scale's intervals.
   */
  searchScaleCategories(): void {
    let result: ScaleResult = { catIndex: -1, modeIndex: -1 };
    SCALES.forEach((s: ScaleCategory, sIndex: number) => {
      if (result.catIndex === -1) {
        result = this.searchScaleCategory(s, sIndex);
      }
    });
    this.onSearchComplete(result);
  }


  /**
   * Searches through a given scale category.
   */
  searchScaleCategory(s: ScaleCategory, sIndex: number): { catIndex: number, modeIndex: number } {
    if (equalItems(s.intervals, this.currScale.scale.category.intervals)) {
      return { catIndex: sIndex, modeIndex: 0 };
    } else {
      return this.searchScaleCategoryModes(s, sIndex);
    }
  }


  /**
   * Searches through modes within a given scale category.
   */
  searchScaleCategoryModes(s: ScaleCategory, sIndex: number): { catIndex: number, modeIndex: number } {
    let catIndex: number = -1;
    let modeIndex: number = -1;
    s.modes?.forEach((m: ScaleMode, mIndex: number) => {
      if (catIndex === -1 && mIndex >= 1) {
        const modeIntervals: number[] = s.intervals.map(i => getModTwelveIndex(i - m.interval));
        if (equalItems(modeIntervals, this.currScale.scale.category.intervals)) {
          catIndex = sIndex;
          modeIndex = mIndex;
        }
      }
    });
    return { catIndex: catIndex, modeIndex: modeIndex }
  }


  /**
   * Searches for the instrument and its tuning that matches the current fretboard's tuning.
   */
  searchFretboard(): void {
    let result: TuningResult = { instrIndex: -1, tuningIndex: -1 };
    INSTRUMENTS.forEach((i: Instrument, iIndex: number) => {
      if (result.instrIndex === -1) {
        result = this.searchInstrumentTunings(i, iIndex);
      }
    });
    this.onSearchComplete(result);
  }


  /**
   * Searches for the matching tuning of an instrument.
   */
  searchInstrumentTunings(i: Instrument, iIndex: number): { instrIndex: number, tuningIndex: number } {
    let instrIndex: number = -1;
    let tuningIndex: number = -1;
    i.tunings.forEach((t: Tuning, tIndex: number) => {
      if (instrIndex === -1) {
        const searchIntervals: number[] = t.intervals.map(i => getModTwelveIndex(i));
        const currIntervals: number[] = this.currFretboard.fretboard.tuning.intervals.map(i => getModTwelveIndex(i));
        if (equalItems(searchIntervals, currIntervals)) {
          instrIndex = iIndex;
          tuningIndex = tIndex;
        }
      }
    });
    return { instrIndex: instrIndex, tuningIndex: tuningIndex }
  }


  /**
   * Emits the result of the search with the primary and secondary index found.
   */
  onSearchComplete(result: ScaleResult | TuningResult): void {
    const primary: number = 'catIndex' in result ? result.catIndex : result.instrIndex;
    const secondary: number = 'modeIndex' in result ? result.modeIndex : result.tuningIndex;
    if (primary >= 0 && secondary >= 0) {
      this.indexFound.emit({ primary: primary, secondary: secondary });
    }
  }
}
