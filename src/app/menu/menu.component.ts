import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableListComponent } from './scrollable-list/scrollable-list.component';
import { Note } from '../../models/note';
import { CurrentScaleService } from '../../services/current-scale.service';
import { ScalesDataService } from '../../services/scales-data.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { TuningsDataService } from '../../services/tunings-data.service';
import { SettingsDisplayComponent } from './settings-display/settings-display.component';
import { DisplayService } from '../../services/display.service';

/**
 * Displays the menu offering any app controls.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ScrollableListComponent, SettingsDisplayComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  extendedNaturalNoteNames?: string[];


  /**
   * Constructor for injection of services.
   */
  constructor(
    public currFretboard: CurrentFretboardService,
    public tuningsData: TuningsDataService,
    public currScale: CurrentScaleService,
    public scalesData: ScalesDataService,
    public display: DisplayService
  ) { }


  /**
   * Calls initialization methods upon component initialization.
   */
  ngOnInit(): void {
    this._initNoteNames();
  }


  /**
   * Initializes extended natural note names by combining the sharp
   * and flat note name if no plain note name exists for the
   * respecitve note.
   */
  private _initNoteNames(): void {
    if (this.scalesData.naturalNotes) {
      this.extendedNaturalNoteNames = this.scalesData.naturalNotes.map(n => n.printNaturalWithFlatAlternative());
    }
  }


  /**
   * Updates the current scale's root note by transforming
   * the note name and creating a Note instance.
   * @param noteString - note name.
   */
  updateCurrScaleRootNote(noteString: string) {
    noteString = noteString.split('/')[0];
    const note: Note = new Note().textToNote(noteString);
    this.currScale.scale.root = note;
  }

  
  /**
   * Updates the current fretboard's root note by creating
   * a Note instance from the note name5.
   * @param noteString - note name.
   */
  updateCurrFretboardRootNote(noteString: string) {
    const note: Note = new Note().textToNote(noteString);
    this.currFretboard.fretboard.root = note;
  }
}
