import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayService } from '../../services/display.service';

@Component({
  selector: 'app-menu-edit-scale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-edit-scale.component.html',
  styleUrl: './menu-edit-scale.component.scss'
})
export class MenuEditScaleComponent {
  totalSteps: number = 3;
  currentStep: number = 0;

  constructor(
    public display: DisplayService,
  ) { }
}
