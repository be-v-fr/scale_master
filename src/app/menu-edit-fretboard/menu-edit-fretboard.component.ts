import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { DisplayService } from '../../services/display.service';
import { CustomizeService } from '../../services/customize.service';
import { PaginationDotsComponent } from '../shared/pagination-dots/pagination-dots.component';

@Component({
  selector: 'app-menu-edit-fretboard',
  standalone: true,
  imports: [CommonModule, CircularButtonComponent, PaginationDotsComponent],
  templateUrl: './menu-edit-fretboard.component.html',
  styleUrl: './menu-edit-fretboard.component.scss'
})
export class MenuEditFretboardComponent {
  totalSteps: number = 3;
  currentStep: number = 0;

  constructor(
    public custom: CustomizeService,
    public display: DisplayService,
  ) { }
}
