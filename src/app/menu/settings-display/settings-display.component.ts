import { Component } from '@angular/core';
import { SlideToggleComponent } from '../../shared/slide-toggle/slide-toggle.component';
import { DisplayService } from '../../../services/display.service';

@Component({
  selector: 'app-settings-display',
  standalone: true,
  imports: [SlideToggleComponent],
  templateUrl: './settings-display.component.html',
  styleUrl: './settings-display.component.scss'
})
export class SettingsDisplayComponent {
  constructor(
    public display: DisplayService,
  ) { }
}
