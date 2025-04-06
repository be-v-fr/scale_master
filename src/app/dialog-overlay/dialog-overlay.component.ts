import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';

@Component({
  selector: 'app-dialog-overlay',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CircularButtonComponent],
  templateUrl: './dialog-overlay.component.html',
  styleUrl: './dialog-overlay.component.scss'
})
export class DialogOverlayComponent {

  constructor(
    private router: Router
  ) { }

  close() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }
}
