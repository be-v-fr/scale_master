import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FretboardComponent } from '../fretboard/fretboard.component';
import { DisplayService } from '../../services/display.service';
import { Router, RouterOutlet } from '@angular/router';
import { ToastMessageComponent } from '../shared/toast-message/toast-message.component';
import { ToastMessageService } from '../../services/toast-message.service';
import { LogoComponent } from '../shared/logo/logo.component';
import { FooterComponent } from '../footer/footer.component';
import { ExpandBtnComponent } from '../shared/expand-btn/expand-btn.component';
import { HoverService } from '../../services/hover.service';

/**
 * Displays the app's main content, i.e. the fretboard and menu components.
 */
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FretboardComponent, ToastMessageComponent, RouterOutlet, LogoComponent, FooterComponent, ExpandBtnComponent],
  templateUrl: './app-content.component.html',
  styleUrl: './app-content.component.scss'
})
export class AppContentComponent {


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public router: Router,
    public display: DisplayService,
    public toastMsg: ToastMessageService,
    public hover: HoverService,
  ) { }
}
