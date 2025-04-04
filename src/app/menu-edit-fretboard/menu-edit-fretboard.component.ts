import { Component } from '@angular/core';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { DisplayService } from '../../services/display.service';
import { CustomizeService } from '../../services/customize.service';

@Component({
  selector: 'app-menu-edit-fretboard',
  standalone: true,
  imports: [CircularButtonComponent],
  templateUrl: './menu-edit-fretboard.component.html',
  styleUrl: './menu-edit-fretboard.component.scss'
})
export class MenuEditFretboardComponent {
  constructor(
    public custom: CustomizeService,
    public display: DisplayService,
  ) { }
}
