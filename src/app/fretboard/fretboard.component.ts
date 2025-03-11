import { Component } from '@angular/core';
import { Note } from '../../models/note';
import { FretNoteComponent } from './fret-note/fret-note.component';
import { CommonModule } from '@angular/common';
import { CurrentScaleService } from '../../services/current-scale.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { DisplayService } from '../../services/display.service';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [CommonModule, FretNoteComponent],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.scss'
})
export class FretboardComponent {
  constructor(
    private currScale: CurrentScaleService,
    public currFretboard: CurrentFretboardService,
    public display: DisplayService
  ) { }

  getNoteFromFret(instrumentString: number, fret: number): Note | undefined {
    const absoluteIndex: number = this.getFretNoteIndex(instrumentString, fret);
    return this.currScale.scale.notes.find(n => n.index === absoluteIndex);
  }

  getFretNoteIndex(instrumentString: number, fret: number): number {
    const instrumentStringNote: Note = this.currFretboard.notes[instrumentString];
    return instrumentStringNote.getIntervalIndex(fret);
  }

  isRoot(instrumentString: number, fret: number): boolean {
    return this.currScale.scale.root.index == this.getFretNoteIndex(instrumentString, fret);
  }
}
