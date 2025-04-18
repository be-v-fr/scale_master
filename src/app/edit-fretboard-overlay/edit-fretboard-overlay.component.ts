import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeService } from '../../services/customize.service';
import { ScrollableListComponent } from '../menu/scrollable-list/scrollable-list.component';
import { DisplayService } from '../../services/display.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { ScalesDataService } from '../../services/scales-data.service';
import { Note } from '../../models/note';
import { DynamicLineComponent } from '../shared/dynamic-line/dynamic-line.component';

@Component({
  selector: 'app-edit-fretboard-overlay',
  standalone: true,
  imports: [CommonModule, ScrollableListComponent, DynamicLineComponent],
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


  constructor(
    public custom: CustomizeService,
    public display: DisplayService,
    public currFretboard: CurrentFretboardService,
    public scalesData: ScalesDataService,
    private cdr: ChangeDetectorRef
  ) { }


  onCurrentStringSelectionChange(noteString: string) {
    if (typeof (this.custom.currentStringSelection) === 'number') {
      const intervalIndex: number = this.currFretboard.fretboard.tuning.intervals.length - this.custom.currentStringSelection - 1;
      const isRootString: boolean = (this.currFretboard.fretboard.tuning.intervals.findIndex(i => i === 0) === intervalIndex);
      const updatedNote: Note = Note.textToNote(noteString);
      const updatedInterval: number = updatedNote.getIntervalFromIndex(this.currFretboard.fretboard.root.index);
      if (isRootString) {
        this._changeRootString(updatedInterval);
      } else {
        this.currFretboard.fretboard.tuning.intervals[intervalIndex] = updatedInterval;
      }
    }
  }


  private _changeRootString(diff: number): void {
    this.currFretboard.fretboard.root.index += diff;
    this.currFretboard.fretboard.root.normalize();
    this.currFretboard.fretboard.tuning.intervals = this.currFretboard.fretboard.tuning.intervals.map(i => i === 0 ? i : i - diff);
    this.currFretboard.fretboard.replaceSurplus0IntervalsW12s();
  }
}
