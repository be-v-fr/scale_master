import { Component } from '@angular/core';
import { FretboardComponent } from '../fretboard/fretboard.component';
import { MenuComponent } from '../menu/menu.component';

/**
 * Displays the app's main content, i.e. the fretboard and menu components.
 */
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FretboardComponent, MenuComponent],
  templateUrl: './app-content.component.html',
  styleUrl: './app-content.component.scss'
})
export class AppContentComponent {

}
