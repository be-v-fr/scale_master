import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FretboardComponent } from '../fretboard/fretboard.component';
import { MenuComponent } from '../menu/menu.component';
import { DisplayService } from '../../services/display.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';

/**
 * Displays the app's main content, i.e. the fretboard and menu components.
 */
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FretboardComponent, MenuComponent, RouterOutlet, RouterLink, CircularButtonComponent],
  templateUrl: './app-content.component.html',
  styleUrl: './app-content.component.scss'
})
export class AppContentComponent {


  /**
   * Constructor for injection of services.
   */
  constructor(
    public router: Router,
    public display: DisplayService
  ) { }
}
