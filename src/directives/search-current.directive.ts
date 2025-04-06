import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentScaleService } from '../services/current-scale.service';
import { CurrentFretboardService } from '../services/current-fretboard.service';
import { ScaleCategory } from '../interfaces/scale-category';
import { SCALES } from '../const/scales';
import { equalItems } from '../utils/array.utils';

@Directive({
  selector: '[appSearchCurrent]',
  standalone: true
})
export class SearchCurrentDirective implements OnInit {
  @Input({ alias: 'appSearchCurrent', required: true }) mode!: 'scale' | 'fretboard';
  @Output() indexFound: EventEmitter<number> = new EventEmitter();

  constructor(
    private currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService
  ) { }

  ngOnInit(): void {
    switch(this.mode) {
      case 'scale': this.searchScaleCategory(); break;
      case 'fretboard': this.searchFretboard();
    }
  }

  searchScaleCategory(): void {
    const index: number = SCALES.findIndex(s => equalItems<number>(s.intervals, this.currScale.scale.category.intervals));
    // nicht nur Base-Intervals durchsuchen, sondern auch sämtliche Modes !!
    // Idee: Loop, der Intervalle von SCALES je nach vorhandenen Modi permutativ verschiebt
    // nicht nur Category-Index, sondern auch Mode-Index weitergeben
    if(index >= 0) {
      this.indexFound.emit(index);
    }
  }

  searchFretboard(): void {
    
  }
}
