import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableListComponent } from './scrollable-list/scrollable-list.component';
import { Note } from '../../models/note';
import { CurrentScaleService } from '../../services/current-scale.service';
import { ScalesDataService } from '../../services/scales-data.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { TuningsDataService } from '../../services/tunings-data.service';
import { SettingsDisplayComponent } from './settings-display/settings-display.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ScrollableListComponent, SettingsDisplayComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  extendedNaturalNoteNames?: string[];

  constructor(
    public currFretboard: CurrentFretboardService,
    public tuningsData: TuningsDataService,
    public currScale: CurrentScaleService,
    public scalesData: ScalesDataService,
  ) { }

  ngOnInit(): void {
    if (this.scalesData.naturalNotes) {
      this.extendedNaturalNoteNames = [];
      this.scalesData.naturalNotes.forEach(n => {
        const name = n.printNaturalWithFlatAlternative();
        this.extendedNaturalNoteNames?.push(name);
      });
    }
  }

  updateCurrScaleRootNote(noteString: string) {
    noteString = noteString.split('/')[0];
    const note: Note = new Note().textToNote(noteString);
    this.currScale.scale.root = note;
  }

  updateCurrFretboardRootNote(noteString: string) {
    const note: Note = new Note().textToNote(noteString);
    this.currFretboard.fretboard.root = note;
  }
}
