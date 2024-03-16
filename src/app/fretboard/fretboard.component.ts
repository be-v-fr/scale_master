import { Component, Input } from '@angular/core';
import { Fretboard } from '../../models/fretboard';
import { Scale } from '../../models/scale';
import { Note } from '../../models/note';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.scss'
})
export class FretboardComponent {
  @Input() fretboard: Fretboard = new Fretboard('guitar', 'standard', new Note(7));
  @Input() scale: Scale = new Scale(new Note(0), 'diatonic', 'minor');
}
