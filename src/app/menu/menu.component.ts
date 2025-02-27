import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableListComponent } from './scrollable-list/scrollable-list.component';
import { Note } from '../../models/note';
import { CurrentScaleService } from '../../services/current-scale.service';
import { ScalesDataService } from '../../services/scales-data.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { TuningsDataService } from '../../services/tunings-data.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ScrollableListComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  naturalRootNotes?: string[];

  constructor(
    public currFretboard: CurrentFretboardService,
    public tuningsData: TuningsDataService,
    public currScale: CurrentScaleService,
    public scalesData: ScalesDataService,
  ) { }

  ngOnInit(): void {
    this.loadNaturalRootNotes();
  }

  loadNaturalRootNotes(): void {
    const numberOfAllNotes: number = 12;
    this.naturalRootNotes = new Array(numberOfAllNotes);
    for(let i = 0; i < numberOfAllNotes; i++) {
      const note: Note = new Note(i, 'natural');
      this.naturalRootNotes[i] = note.print();
    }
  }

  updateCurrScaleRootNote(noteString: string) {
    const note: Note = new Note().textToNote(noteString);
    this.currScale.scale.root = note;
  }

  updateCurrFretboardRootNote(noteString: string) {
    const note: Note = new Note().textToNote(noteString);
    this.currFretboard.fretboard.root = note;
  }
}
