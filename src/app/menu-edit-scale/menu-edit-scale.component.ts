import { Component } from '@angular/core';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { CustomizeService } from '../../services/customize.service';
import { DisplayService } from '../../services/display.service';

@Component({
  selector: 'app-menu-edit-scale',
  standalone: true,
  imports: [CircularButtonComponent],
  templateUrl: './menu-edit-scale.component.html',
  styleUrl: './menu-edit-scale.component.scss'
})
export class MenuEditScaleComponent {
  constructor(
    public custom: CustomizeService,
    public display: DisplayService,
  ) { }
}
