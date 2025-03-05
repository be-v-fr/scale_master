import { Component } from '@angular/core';
import { Note } from '../../models/note';
import { FretNoteComponent } from './fret-note/fret-note.component';
import { CommonModule } from '@angular/common';
import { CurrentScaleService } from '../../services/current-scale.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';

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
  ) { }

  getNoteFromFret(instrumentString: number, fret: number): string | undefined {
    const absoluteIndex: number = this.getFretNoteIndex(instrumentString, fret);
    const note: Note | undefined = this.currScale.scale.notes.find(n => n.index === absoluteIndex);
    if (note) {
      return note.print();
    } else {
      return undefined;
    }
  }

  getFretNoteIndex(instrumentString: number, fret: number): number {
    const instrumentStringNote: Note = this.currFretboard.fretboard.notes[instrumentString];
    return instrumentStringNote.getIntervalIndex(fret);
  }

  isRoot(instrumentString: number, fret: number): boolean {
    return this.currScale.scale.root.index == this.getFretNoteIndex(instrumentString, fret);
  }
}
