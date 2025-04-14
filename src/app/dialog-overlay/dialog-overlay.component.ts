import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog-overlay',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CircularButtonComponent],
  templateUrl: './dialog-overlay.component.html',
  styleUrl: './dialog-overlay.component.scss'
})
export class DialogOverlayComponent {

  constructor(
    public dialog: DialogService
  ) { }


  onOverlayMouseDown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;
    if (target === currentTarget) {
      this.dialog.close();
    }
  }
}