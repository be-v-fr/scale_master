import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayService } from '../../../services/display.service';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { cloneDeep } from 'lodash';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { CustomizeService } from '../../../services/customize.service';
import { SearchCurrentDirective } from '../../../directives/search-current.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public display: DisplayService,
    private currScale: CurrentScaleService,
    public custom: CustomizeService
  ) { }


  ngOnInit(): void {
    this.initCategory();
    this.routeSub = this.subRoute();
  }


  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }


  initCategory(): void {
    const categoryClone: ScaleCategory = cloneDeep(this.currScale.scale.category);
    categoryClone.name = 'untitled';
    this.currScale.scale.category = categoryClone;
  }


  subRoute(): Subscription | undefined {
    return this.route.parent?.params.subscribe(params => {
      const step: number = parseInt(params['step'], 10);
      if (step >= 0) {
        this.currentStep = step;
      } else {
        console.error('Could not set scale edit step because value was invalid:', step);
      }
    });
  }
}
