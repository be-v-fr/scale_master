import { Component } from '@angular/core';
import { CustomizeService } from '../../../services/customize.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { SCALES } from '../../../const/scales';
import { DialogService } from '../../../services/dialog.service';
import { CurrentScaleService } from '../../../services/current-scale.service';

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

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public custom: CustomizeService,
    public dialog: DialogService,
    private currScale: CurrentScaleService,
  ) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const catIndex: number = params['catIndex'] as number;
      const modeIndex: number = params['modeIndex'] as number;
      if (catIndex && catIndex >= 0) {
        this.category = SCALES[catIndex];
      } else {
        console.error('Modes dialog initialization failed because scale category index was missing or invalid.');
      }
      if (modeIndex > 0) {
        this.modeIndex = modeIndex;
      }
    });
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  abortWithMatchingScale(): void {
    if (this.category) {
      this.currScale.scale.category = this.category;
      this.continueWithMatchingScaleModes();
      this.router.navigateByUrl('');
    }
  }

  continueWithMatchingScaleModes(): void {
    this._loadMatchingScaleModes();
    this.dialog.close();
  }

  private _loadMatchingScaleModes(): void {
    if (this.category && this.category.modes) {
      this.currScale.scale.category.modes = this.category.modes;
      if (this.category.modes[this.modeIndex]) {
        this.currScale.scale.mode = this.category.modes[this.modeIndex];
      }
    }
  }
}