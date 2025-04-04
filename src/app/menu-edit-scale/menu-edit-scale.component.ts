import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { CustomizeService } from '../../services/customize.service';
import { DisplayService } from '../../services/display.service';
import { PaginationDotsComponent } from '../shared/pagination-dots/pagination-dots.component';

@Component({
  selector: 'app-menu-edit-scale',
  standalone: true,
  imports: [CommonModule, CircularButtonComponent, PaginationDotsComponent],
  templateUrl: './menu-edit-scale.component.html',
  styleUrl: './menu-edit-scale.component.scss'
})
export class MenuEditScaleComponent {
  totalSteps: number = 3;
  currentStep: number = 0;

  constructor(
    public custom: CustomizeService,
    public display: DisplayService,
  ) { }
}
