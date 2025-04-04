import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayService } from '../../services/display.service';

@Component({
  selector: 'app-menu-edit-fretboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-edit-fretboard.component.html',
  styleUrl: './menu-edit-fretboard.component.scss'
})
export class MenuEditFretboardComponent {
  totalSteps: number = 3;
  currentStep: number = 0;

  constructor(
    public display: DisplayService,
  ) { }
}
