import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayService } from '../../../services/display.service';
import { CircularButtonComponent } from '../../shared/circular-button/circular-button.component';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { CurrentFretboardService } from '../../../services/current-fretboard.service';
import { RouterLink } from '@angular/router';
import { CustomizeService } from '../../../services/customize.service';
import { capitalizeFirstLetter } from '../../../utils/string.utils';

@Component({
  selector: 'app-main-headline-bar',
  standalone: true,
  imports: [CommonModule, CircularButtonComponent, RouterLink],
  templateUrl: './main-headline-bar.component.html',
  styleUrl: './main-headline-bar.component.scss'
})
export class MainHeadlineBarComponent {
  @Input({ required: true }) mode!: 'scale' | 'fretboard';
  capitalize = capitalizeFirstLetter;


  constructor(
    public currScale: CurrentScaleService,
    public currFretboard: CurrentFretboardService,
    public custom: CustomizeService,
    public display: DisplayService
  ) { }
}
