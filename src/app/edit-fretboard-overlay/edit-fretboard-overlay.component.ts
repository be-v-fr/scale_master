import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeService } from '../../services/customize.service';
import { DisplayService } from '../../services/display.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { ScalesDataService } from '../../services/scales-data.service';
import { Note } from '../../models/note';
import { DynamicLineComponent } from '../shared/dynamic-line/dynamic-line.component';
import { DialogAddStringsRulesComponent } from '../dialogs/dialog-add-strings-rules/dialog-add-strings-rules.component';
import { ScrollableListComponent } from '../shared/scrollable-list/scrollable-list.component';
import { getModTwelveIndex } from '../../utils/mod.utils';

@Component({
  selector: 'app-edit-fretboard-overlay',
  standalone: true,
  imports: [CommonModule, ScrollableListComponent, DynamicLineComponent, DialogAddStringsRulesComponent],
  templateUrl: './edit-fretboard-overlay.component.html',
  styleUrl: './edit-fretboard-overlay.component.scss'
})
export class EditFretboardOverlayComponent {
  private _selectedStringNote?: HTMLElement;
  listDefaultIndex: number = 0;
  @Input() set selectedStringNote(el: HTMLElement | undefined) {
    this._selectedStringNote = el;
    this.listDefaultIndex = el ? Note.textToNote(el?.innerHTML).index : 0;
    this.cdr.detectChanges();
  }
  get selectedStringNote(): HTMLElement | undefined {
    return this._selectedStringNote;
  }
  @ViewChild('listContainer') listContainerRef!: ElementRef<HTMLElement>;


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public custom: CustomizeService,
    public display: DisplayService,
    public currFretboard: CurrentFretboardService,
    public scalesData: ScalesDataService,
    private cdr: ChangeDetectorRef
  ) { }



  /**
   * Updates the tuning of the currently selected string based on user input.
   * If the selected string is the root string, the root note is adjusted.
   */
  onCurrentStringSelectionChange(noteString: string) {
    if (typeof (this.custom.currentStringSelection) === 'number') {
      const intervalIndex: number = this.currFretboard.fretboard.tuning.intervals.length - this.custom.currentStringSelection - 1;
      const isRootString: boolean = (this.currFretboard.fretboard.tuning.intervals.findIndex(i => i === 0) === intervalIndex);
      const updatedNote: Note = Note.textToNote(noteString);
      const updatedInterval: number = updatedNote.getIntervalFromIndex(this.currFretboard.fretboard.rootPitchIndex);
      if (isRootString) {
        this._changeRootString(updatedInterval);
      } else {
        this.currFretboard.fretboard.tuning.intervals[intervalIndex] = updatedInterval;
      }
    }
  }


  /**
   * Adjusts the root note and updates all tuning intervals accordingly.
   */
  private _changeRootString(diff: number): void {
    this.currFretboard.fretboard.rootPitchIndex += diff;
    this.currFretboard.fretboard.rootPitchIndex = getModTwelveIndex(this.currFretboard.fretboard.rootPitchIndex);
    this.currFretboard.fretboard.tuning.intervals = this.currFretboard.fretboard.tuning.intervals.map(i => i === 0 ? i : i - diff);
    this.currFretboard.fretboard.replaceSurplus0IntervalsW12s();
    this.currFretboard.fretboard.tuning.defaultRoot.index = this.currFretboard.fretboard.rootPitchIndex;
  }
}
