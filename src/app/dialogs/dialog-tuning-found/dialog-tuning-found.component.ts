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

/**
 * Displays a dialog informing the user that the custom tuning he configured already exists in the database,
 * offering him to abort customization and load that tuning instead.
 */
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


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public dialog: DialogService,
    private currFretboard: CurrentFretboardService,
  ) { }


  /**
   * Lifecycle hook that initializes the component.
   * Parses route parameters and loads the instrument and tuning index.
   */
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


  /**
   * Lifecycle hook that unsubscribes from the route parameters when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }


  /**
   * Aborts dialog and loads the selected fretboard tuning,
   * then navigates to the root page.
   */
  abortWithMatchingFretboard(): void {
    if (this.instrument) {
      this._loadFretboard();
      this.dialog.close();
      this.router.navigateByUrl('');
    }
  }


  /**
   * Loads the selected instrument and tuning into the current fretboard.
   */
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
