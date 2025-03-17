import { Component } from '@angular/core';
import { Note } from '../../models/note';
import { FretNoteComponent } from './fret-note/fret-note.component';
import { CommonModule } from '@angular/common';
import { CurrentScaleService } from '../../services/current-scale.service';
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
    private currScale: CurrentScaleService,
    public currFretboard: CurrentFretboardService,
    public display: DisplayService
  ) { }


  /**
   * Retrieves the note of the current scale corresponding to a given position on the fretboard. 
   * @param instrumentString - Index number of the string (counting from high to low).
   * @param fret - Fret number (0 to 11).
   */
  getNoteFromFret(instrumentString: number, fret: number): Note | undefined {
    const absoluteIndex: number = this.getFretNoteIndex(instrumentString, fret);
    return this.currScale.scale.notes.find(n => n.index === absoluteIndex);
  }


  /**
   * Retrieves the note index/pitch corresponding to a given position on the fretboard. 
   * @param instrumentString - Index number of the string (counting from high to low).
   * @param fret - Fret number (0 to 11).
   */
  getFretNoteIndex(instrumentString: number, fret: number): number {
    const instrumentStringNote: Note = this.currFretboard.notes[instrumentString];
    return instrumentStringNote.getIntervalIndex(fret);
  }


  /**
   * Checks if a given position on the fretboard corresponds to the current scale's root note.
   * @param instrumentString - Index number of the string (counting from high to low).
   * @param fret - Fret number (0 to 11).
   */
  isRoot(instrumentString: number, fret: number): boolean {
    return this.currScale.scale.root.index == this.getFretNoteIndex(instrumentString, fret);
  }
}
