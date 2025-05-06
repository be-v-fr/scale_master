import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { parseNumberParamIfExists } from '../../../utils/router.utils';
import { cloneDeep } from 'lodash';
import { INSTRUMENTS } from '../../../const/instruments';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentFretboardService } from '../../../services/current-fretboard.service';
import { CustomizeService } from '../../../services/customize.service';
import { Tuning } from '../../../interfaces/tuning';
import { SearchCurrentDirective } from '../../../directives/search-current.directive';
import { InlineNameLinkComponent } from '../../shared/inline-name-link/inline-name-link.component';

@Component({
  selector: 'app-menu-edit-fretboard',
  standalone: true,
  imports: [CommonModule, SearchCurrentDirective, InlineNameLinkComponent],
  templateUrl: './menu-edit-fretboard.component.html',
  styleUrl: './menu-edit-fretboard.component.scss'
})
export class MenuEditFretboardComponent {
  routeSub?: Subscription = new Subscription();
  currentStep: number = 0;
  instrIndex?: number;
  tuningIndex?: number;
  initComplete: boolean = false;


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public currFretboard: CurrentFretboardService,
    public custom: CustomizeService
  ) { }


  ngOnInit(): void {
    this.instrIndex = parseNumberParamIfExists(this.route.snapshot.params, 'instrIndex');
    this.tuningIndex = parseNumberParamIfExists(this.route.snapshot.params, 'tuningIndex');
    this.routeSub = this.subRoute();
  }


  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }


  initFretboard(): void {
    (typeof this.instrIndex === 'number') ? this.initExistingFretboard() : this.initNewFretboard();
    this.currFretboard.fretboard.allowAnyExtraStrings();
  }


  initNewFretboard(): void {
    const clonedTuning: Tuning = cloneDeep(this.currFretboard.fretboard.tuning);
    clonedTuning.name = 'untitled';
    clonedTuning.intervals = [0];
    this.currFretboard.fretboard.tuning = clonedTuning;
    this.currFretboard.fretboard.numberOfStrings = 1;
  }


  initExistingFretboard(): void {
    if (typeof (this.instrIndex) === 'number') {
      const tuningIndex: number = this.tuningIndex ?? 0;
      this.currFretboard.fretboard.instrument = cloneDeep(this.instrIndex >= 0 ? INSTRUMENTS[this.instrIndex] : this.currFretboard.fretboard.instrument);
      this.currFretboard.fretboard.tuning = this.currFretboard.fretboard.instrument.tunings[tuningIndex];
    }
  }


  subRoute(): Subscription | undefined {
    return this.route.parent?.params.subscribe(params => {
      this.currentStep = parseNumberParamIfExists(params, 'step') || 0;
      if (!this.initComplete) {
        this.initFretboard();
        this.initComplete = true;
      }
      switch (this.currentStep) {
        case 0: this.currFretboard.fretboard.allowAnyExtraStrings(); break;
        case 1: this.currFretboard.fretboard.tuning.intervals = this.currFretboard.fretboard.intervals.reverse(); break;
        case 4: this.router.navigate([{ outlets: { 'dialog': ['d', 'name'] } }]);
      }
      if (this.currentStep !== 3) {
        this.currFretboard.fretboard.numberOfStrings = this.currFretboard.fretboard.tuning.intervals.length;
      }
    });
  }
}
