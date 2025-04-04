import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FretboardComponent } from '../fretboard/fretboard.component';
import { MenuComponent } from '../menu/menu.component';
import { DisplayService } from '../../services/display.service';
import { Router } from '@angular/router';
import { DialogOverlayComponent } from "../dialog-overlay/dialog-overlay.component";
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';
import { ToastMessageService } from '../../services/toast-message.service';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';

/**
 * Displays the app's main content, i.e. the fretboard and menu components.
 */
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FretboardComponent, MenuComponent, DialogOverlayComponent, ToastMessageComponent, MenuEditComponent],
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
