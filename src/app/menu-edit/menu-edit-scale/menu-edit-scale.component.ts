import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { CustomizeService } from '../../../services/customize.service';
import { SearchCurrentDirective } from '../../../directives/search-current.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { parseNumberParamIfExists } from '../../../utils/router.utils';
import { SCALES } from '../../../const/scales';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-menu-edit-scale',
  standalone: true,
  imports: [CommonModule, SearchCurrentDirective],
  templateUrl: './menu-edit-scale.component.html',
  styleUrl: './menu-edit-scale.component.scss'
})
export class MenuEditScaleComponent implements OnInit, OnDestroy {
  routeSub?: Subscription = new Subscription();
  currentStep: number = 0;
  catIndex?: number;
  modeIndex?: number;
  initComplete: boolean = false;


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public currScale: CurrentScaleService,
    public custom: CustomizeService
  ) { }


  ngOnInit(): void {
    this.catIndex = parseNumberParamIfExists(this.route.snapshot.params, 'catIndex');
    this.modeIndex = parseNumberParamIfExists(this.route.snapshot.params, 'modeIndex');
    this.routeSub = this.subRoute();
  }


  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }


  initScale(): void {
    (typeof (this.catIndex) === 'number') ? this.initExistingScale() : this.initNewScale();
  }


  initNewScale(): void {
    const clonedCat: ScaleCategory = cloneDeep(this.currScale.scale.category);
    clonedCat.name = 'untitled';
    clonedCat.intervals = [0];
    clonedCat.modes = undefined;
    this.currScale.scale.category = clonedCat;
  }


  initExistingScale(): void {
    if (typeof (this.catIndex) === 'number') {
      this.currScale.scale.category = SCALES[this.catIndex];
      if (this.currScale.scale.mode && this.currScale.scale.mode.interval !== 0) {
        this.router.navigate([{ outlets: { 'dialog': ['d', 'modes', 'rootInit'] } }]);
        this.currScale.scale.root.index -= this.currScale.scale.mode.interval;
        this.currScale.scale.root.normalize();
      }
      this.currScale.scale.mode = (this.currScale.scale.category.modes ? this.currScale.scale.category.modes[0] : undefined);
    }
  }


  subRoute(): Subscription | undefined {
    return this.route.parent?.params.subscribe(params => {
      this.currentStep = parseNumberParamIfExists(params, 'step') || 0;
      if (!this.initComplete) {
        setTimeout(() => {
          this.initScale();
          this.initComplete = true;
        }, 80);
      }
      if (this.currentStep === 2) {
        this.forceRootMode();
      }
    });
  }


  forceRootMode(): void {
    if (this.currScale.scale.category.modes && !this.currScale.scale.getMode(0)) {
      this.currScale.scale.addMode(0);
      this.router.navigate([{ outlets: { 'dialog': ['d', 'modes', 'name', 0, { forceRoot: true }] } }]);
    }
  }
}
