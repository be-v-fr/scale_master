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

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CircularButtonComponent, PaginationDotsComponent, RouterLink],
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.scss'
})
export class MenuEditComponent {
  routeSub: Subscription = new Subscription();
  totalSteps: number = 3;
  currentStep: number = 0;
  previousScale: Scale = cloneDeep(this.currScale.scale);
  previousFretboard: Fretboard = cloneDeep(this.currFretboard.fretboard);

  constructor(
    public router: Router,
    public display: DisplayService,
    private currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService,
  ) { }

  get routeEnd(): string {
    const urlSegments: Array<string> = this.router.url.split('/');
    return urlSegments[urlSegments.length - 1];
  }

  undoAll(): void {
    this.currScale.scale = this.previousScale;
    this.currFretboard.fretboard = this.previousFretboard;
  }
}
