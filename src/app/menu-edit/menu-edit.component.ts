import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../services/display.service';
import { PaginationDotsComponent } from '../shared/pagination-dots/pagination-dots.component';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { Scale } from '../../models/scale';
import { CurrentScaleService } from '../../services/current-scale.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { Fretboard } from '../../models/fretboard';
import { CustomizeService } from '../../services/customize.service';
import { ScalesDataService } from '../../services/scales-data.service';
import { StorageService } from '../../services/storage.service';
import { ScrollableListComponent } from '../shared/scrollable-list/scrollable-list.component';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CircularButtonComponent, PaginationDotsComponent, RouterLink, ScrollableListComponent],
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.scss'
})
export class MenuEditComponent implements OnInit {
  routeSub: Subscription = new Subscription();
  currentStep: number = 0;
  previousScale: Scale = cloneDeep(this.currScale.scale);
  previousFretboard: Fretboard = cloneDeep(this.currFretboard.fretboard);


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public display: DisplayService,
    public scalesData: ScalesDataService,
    public currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService,
    public custom: CustomizeService,
    private storage: StorageService
  ) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const step: number = parseInt(params['step'], 10);
      if (step >= 0) {
        this.currentStep = step;
      } else {
        console.error('Could not set scale edit step because value was invalid:', step);
      }
    });
  }


  navigateStepByRouter(stepToNav: number): void {
    const mainUrl = this.router.url.split(';')[0];
    const urlSegments: (string | number)[] = mainUrl.split('/');
    const editIndex: number = urlSegments.findIndex(s => s === 'edit');
    if(editIndex >= 0) {
      urlSegments[editIndex + 1] = stepToNav;
      this.router.navigate(urlSegments);
    }
  }


  undoAll(): void {
    this.currScale.scale = this.previousScale;
    this.currFretboard.fretboard = this.previousFretboard;
  }


  async complete(): Promise<void> {
    switch(this.custom.mode) {
      case 'scale': await this.completeScale(); break;
      case 'fretboard': break; // add later
    }
    this.router.navigateByUrl('');
  }


  async completeScale(): Promise<void> {
    await this.storage.saveScale(this.currScale.scale.category);
    this.currScale.isCustom = true;
  }
}
