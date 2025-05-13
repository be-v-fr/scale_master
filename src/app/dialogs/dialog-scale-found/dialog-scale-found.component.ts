import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { SCALES } from '../../../const/scales';
import { DialogService } from '../../../services/dialog.service';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { cloneDeep } from 'lodash';
import { parseNumberParamIfExists } from '../../../utils/router.utils';

/**
 * Displays a dialog informing the user that the custom scale he configured already exists in the database,
 * offering him different options to proceed.
 */
@Component({
  selector: 'app-dialog-scale-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-scale-found.component.html',
  styleUrl: './dialog-scale-found.component.scss'
})
export class DialogScaleFoundComponent {
  routeSub: Subscription = new Subscription();
  category?: ScaleCategory;
  modeIndex: number = 0;


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public dialog: DialogService,
    private currScale: CurrentScaleService,
  ) { }


  /**
   * Lifecycle hook that initializes the component.
   * Extracts route parameters to determine the scale category and mode index.
   */
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const catIndex: number | undefined = parseNumberParamIfExists(params, 'catIndex');
      const modeIndex: number | undefined = parseNumberParamIfExists(params, 'modeIndex');
      if(typeof(catIndex) === 'number' && this.dialog.checkIndexLeqZeroOnInit(catIndex, 'scale category')) {
        this.category = cloneDeep(SCALES[catIndex]);
      }
      if (typeof(modeIndex) === 'number' && modeIndex > 0) {
        this.modeIndex = modeIndex;
      }
    });
  }


  /**
   * Lifecycle hook that cleans up the subscription when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }


  /**
   * Aborts dialog and loads the full matching scale.
   */
  abortWithMatchingScale(): void {
    if (this.category) {
      this._loadMatchingScaleModes();
      this.dialog.close();
      this.router.navigateByUrl('');
    }
  }


  /**
   * Continues with the matching scale but lets the user work with its modes.
   */
  continueWithMatchingScaleModes(): void {
    this._loadMatchingScaleModes();
    this.dialog.close().then(() => {
      this.currScale.shiftRootAccordingToMode(true); // dialog does not show... is routing the problem? may be use timeout?
      if (this.category && this.category.modes) {
        this.currScale
        this.currScale.scale.mode = this.currScale.scale.primeMode;
      }
    });
  }


  /**
   * Helper method that loads the selected scale category and mode into the current scale.
   */
  private _loadMatchingScaleModes(): void {
    if (this.category && this.category.modes) {
      this.currScale.scale.category = this.category;
      this.currScale.scale.mode = this.category.modes[this.modeIndex];
    }
  }
}