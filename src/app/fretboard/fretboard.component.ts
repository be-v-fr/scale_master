import { Component } from '@angular/core';
import { Fretboard } from '../../models/fretboard';
import { Note } from '../../models/note';
import { FretNoteComponent } from './fret-note/fret-note.component';
import { CommonModule } from '@angular/common';
import { CurrentScaleService } from '../../services/current-scale.service';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [CommonModule, FretNoteComponent],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.scss'
})
export class FretboardComponent {
  fretboard: Fretboard = new Fretboard('guitar', 'standard', new Note(7));

  constructor(
    private currScale: CurrentScaleService,
  ) { }

  getNoteFromFret(string: number, fret: number): string | undefined {
    const fretNote: Note = new Note(this.getFretNoteIndex(string, fret));
    const scaleNoteNames: string[] = this.currScale.scale.getNoteNames();
    if (scaleNoteNames.includes(fretNote.name)) {
      return fretNote.print();
    } else {
      return undefined;
    }
  }

  getFretNoteIndex(string: number, fret: number): number {
    const stringNote: Note = this.fretboard.notes[string];
    return stringNote.getIntervalIndex(fret);
  }

  isRoot(string: number, fret: number): boolean {
    return this.currScale.scale.root.index == this.getFretNoteIndex(string, fret);
  }
}
