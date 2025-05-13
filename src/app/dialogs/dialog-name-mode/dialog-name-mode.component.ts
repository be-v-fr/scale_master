import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { ScaleMode } from '../../../interfaces/scale-mode';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { parseNumberParamIfExists } from '../../../utils/router.utils';
import { DialogService } from '../../../services/dialog.service';
import { InfoMsgComponent } from '../../shared/info-msg/info-msg.component';
import { AutofocusDirective } from '../../../directives/autofocus.directive';

/**
 * Displays a dialog for naming a custom scale category's mode.
 */
@Component({
  selector: 'app-dialog-name-mode',
  standalone: true,
  imports: [CommonModule, FormsModule, InfoMsgComponent, AutofocusDirective],
  templateUrl: './dialog-name-mode.component.html',
  styleUrl: './dialog-name-mode.component.scss'
})
export class DialogNameModeComponent implements OnInit, OnDestroy {
  modeInterval?: number;
  modeName?: string;
  routeSub: Subscription = new Subscription();
  forceRoot?: boolean;


  /**
   * Constructor for dependency injection. 
   */
  constructor(
    private route: ActivatedRoute,
    private currScale: CurrentScaleService,
    public dialog: DialogService,
    private router: Router
  ) { }


  /**
   * Lifecycle hook that runs after component initialization.
   * Parses route parameters to determine the mode interval and whether root mode should be forced.
   * Initializes the mode name if a valid interval is provided.
   */
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const interval: number | undefined = parseNumberParamIfExists(params, 'interval');
      this.forceRoot = (params['forceRoot'] === 'true');
      if (typeof(interval) === 'number') {
        this.modeInterval = interval;
        this.initModeName(interval);
      } else {
        console.error('Initialization failed because the mode interval was missing or invalid.');
      }
    });
  }


  /**
   * Lifecycle hook that runs on component destruction.
   * Unsubscribes from route params to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }


  /**
   * Initializes the editable name of the mode by cloning the original mode based on the interval.
   * If the mode can't be found, logs an error.
   */
  initModeName(interval: number): void {
    const modeOriginal: ScaleMode | undefined = this.currScale.scale.getMode(interval);
    if (modeOriginal) {
      const modeClone: ScaleMode = cloneDeep(modeOriginal);
      this.modeName = modeClone.name;
    } else {
      console.error('Initialization failed because the mode could not be found in the scale category.');
    }
  }


  /**
   * Applies the updated mode name and closes the dialog.
   * If the 'forceRoot' flag is set, redirects to the route to name the root mode after closing.
   */
  submit(): void {
    if(!this.modeName || !(typeof(this.modeInterval) === 'number')) return;
    const modeOriginal: ScaleMode | undefined = this.currScale.scale.getMode(this.modeInterval);
    if (modeOriginal) {
      modeOriginal.name = this.modeName;
    }
    this.dialog.close().then(() => {
      if(this.forceRoot) {
        this.router.navigate([{ outlets: { 'dialog': ['d', 'name'] } }]);
      }
    });
  }
}
