import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { DialogService } from '../../services/dialog.service';

/**
 * Displays a dialog overlay and layout, embedding dialogs via router outlet.
 */
@Component({
  selector: 'app-dialog-overlay',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CircularButtonComponent],
  templateUrl: './dialog-overlay.component.html',
  styleUrl: './dialog-overlay.component.scss'
})
export class DialogOverlayComponent {


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public dialog: DialogService
  ) { }


  /**
   * Checks mousedown events for whether there was another element targeted.
   * Closes current dialog in case there was not.
   */
  onOverlayMouseDown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;
    if (target === currentTarget) {
      this.dialog.close();
    }
  }
}