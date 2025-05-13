import { Component } from '@angular/core';
import { SlideToggleComponent } from '../../shared/slide-toggle/slide-toggle.component';
import { DisplayService } from '../../../services/display.service';

/**
 * Displays a menu for settings regarding the display of the current scale
 * on the fretboard and the fretboard itself. 
 */
@Component({
  selector: 'app-settings-display',
  standalone: true,
  imports: [SlideToggleComponent],
  templateUrl: './settings-display.component.html',
  styleUrl: './settings-display.component.scss'
})
export class SettingsDisplayComponent {


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public display: DisplayService,
  ) { }
}
