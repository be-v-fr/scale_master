import { Component, Input } from '@angular/core';
import { Fretboard } from '../../models/fretboard';
import { Scale } from '../../models/scale';
import { Note } from '../../models/note';
import { FretNoteComponent } from './fret-note/fret-note.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [CommonModule, FretNoteComponent],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.scss'
})
export class FretboardComponent {
  @Input() fretboard: Fretboard = new Fretboard('guitar', 'standard', new Note(7));
  @Input() scale: Scale = new Scale(new Note(0), 'diatonic', 'minor');

  getNoteFromFret(string: number, fret: number): string | undefined {
    const fretNote: Note = new Note(this.getFretNoteIndex(string, fret));
    const scaleNoteNames: string[] = this.scale.getNoteNames();
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
    return this.scale.root.index == this.getFretNoteIndex(string, fret);
  }
}
