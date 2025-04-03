import { Component } from '@angular/core';
import { FretNoteComponent } from './fret-note/fret-note.component';
import { CommonModule } from '@angular/common';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { DisplayService } from '../../services/display.service';

/**
 * Displays the fretboard with the currently selected scale.
 */
@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [CommonModule, FretNoteComponent],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.scss'
})
export class FretboardComponent {


  /**
   * Constructor for injection of services.
   */
  constructor(
    public currFretboard: CurrentFretboardService,
    public display: DisplayService
  ) { }
}
