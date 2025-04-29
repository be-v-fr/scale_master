import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { INSTRUMENTS } from '../../../const/instruments';
import { DialogService } from '../../../services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { parseNumberParamIfExists } from '../../../utils/router.utils';
import { Instrument } from '../../../interfaces/instrument';
import { CurrentFretboardService } from '../../../services/current-fretboard.service';
import { Fretboard } from '../../../models/fretboard';

@Component({
  selector: 'app-dialog-tuning-found',
  standalone: true,
  imports: [],
  templateUrl: './dialog-tuning-found.component.html',
  styleUrl: './dialog-tuning-found.component.scss'
})
export class DialogTuningFoundComponent {
  routeSub: Subscription = new Subscription();
  instrument?: Instrument;
  tuningIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public dialog: DialogService,
    private currFretboard: CurrentFretboardService,
  ) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const instrIndex: number | undefined = parseNumberParamIfExists(params, 'instrIndex');
      const tuningIndex: number | undefined = parseNumberParamIfExists(params, 'tuningIndex');
      if (typeof (instrIndex) === 'number' && this.dialog.checkIndexLeqZeroOnInit(instrIndex, 'instrument')) {
        this.instrument = cloneDeep(INSTRUMENTS[instrIndex]);
      }
      if (typeof (tuningIndex) === 'number' && this.dialog.checkIndexLeqZeroOnInit(tuningIndex, 'tuning')) {
        this.tuningIndex = tuningIndex;
      }
    });
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }


  abortWithMatchingFretboard(): void {
    if (this.instrument) {
      this._loadFretboard();
      this.dialog.close();
      this.router.navigateByUrl('');
    }
  }


  private _loadFretboard(): void {
    if (this.instrument) {
      this.currFretboard.fretboard = new Fretboard(
        this.instrument,
        this.instrument.tunings[this.tuningIndex],
        this.currFretboard.fretboard.root
      );
    }
  }
}
