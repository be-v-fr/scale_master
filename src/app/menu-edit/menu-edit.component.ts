import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DisplayService } from '../../services/display.service';
import { PaginationDotsComponent } from '../shared/pagination-dots/pagination-dots.component';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { Scale } from '../../models/scale';
import { CurrentScaleService } from '../../services/current-scale.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { Fretboard } from '../../models/fretboard';
import { CustomizeService } from '../../services/customize.service';
import { ScrollableListComponent } from '../menu/scrollable-list/scrollable-list.component';
import { ScalesDataService } from '../../services/scales-data.service';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CircularButtonComponent, PaginationDotsComponent, RouterLink, ScrollableListComponent],
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.scss'
})
export class MenuEditComponent {
  routeSub: Subscription = new Subscription();
  previousScale: Scale = cloneDeep(this.currScale.scale);
  previousFretboard: Fretboard = cloneDeep(this.currFretboard.fretboard);

  constructor(
    public router: Router,
    public display: DisplayService,
    public scalesData: ScalesDataService,
    public currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService,
    public custom: CustomizeService
  ) { }

  undoAll(): void {
    this.currScale.scale = this.previousScale;
    this.currFretboard.fretboard = this.previousFretboard;
  }
}
