import { Component } from '@angular/core';
import { FretNoteComponent } from './fret-note/fret-note.component';
import { CommonModule } from '@angular/common';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { DisplayService } from '../../services/display.service';
import { CurrentScaleService } from '../../services/current-scale.service';
import { Router } from '@angular/router';
import { Note } from '../../models/note';

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
    private router: Router,
    private currScale: CurrentScaleService,
    public currFretboard: CurrentFretboardService,
    public display: DisplayService
  ) { }

  get frets(): number[] {
    return Array.from({ length: 12 });
  }

  onFretClick(instrumentStringIndex: number, fret: number) {
    if(this.router.url.includes('edit/scale')) {
      const pitch: number = this.currFretboard.getFretNoteIndex(instrumentStringIndex, fret);
      const interval: number = pitch - this.currScale.scale.root.index;
      this.currScale.scale.toggleInterval(interval);
    }
  }
}
