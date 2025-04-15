import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FretboardComponent } from '../fretboard/fretboard.component';
import { DisplayService } from '../../services/display.service';
import { Router, RouterOutlet } from '@angular/router';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';
import { ToastMessageService } from '../../services/toast-message.service';
import { EditFretboardOverlayComponent } from '../edit-fretboard-overlay/edit-fretboard-overlay.component';
import { CustomizeService } from '../../services/customize.service';

/**
 * Displays the app's main content, i.e. the fretboard and menu components.
 */
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FretboardComponent, ToastMessageComponent, RouterOutlet],
  templateUrl: './app-content.component.html',
  styleUrl: './app-content.component.scss'
})
export class AppContentComponent {


  /**
   * Constructor for injection of services.
   */
  constructor(
    public router: Router,
    public display: DisplayService,
    public toastMsg: ToastMessageService
  ) { }
}
