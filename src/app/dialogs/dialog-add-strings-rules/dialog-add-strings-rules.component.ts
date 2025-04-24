import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideToggleComponent } from '../../shared/slide-toggle/slide-toggle.component';
import { CurrentFretboardService } from '../../../services/current-fretboard.service';
import { getIncrementalArray, SEMITONE_OPTIONS } from '../../../utils/array.utils';
import { ScrollableListComponent } from '../../shared/scrollable-list/scrollable-list.component';
import { CustomizeService } from '../../../services/customize.service';

@Component({
  selector: 'app-dialog-add-strings-rules',
  standalone: true,
  imports: [CommonModule, SlideToggleComponent, ScrollableListComponent],
  templateUrl: './dialog-add-strings-rules.component.html',
  styleUrl: './dialog-add-strings-rules.component.scss'
})
export class DialogAddStringsRulesComponent implements OnInit {
  getIncrArray: (length: number) => number[] = getIncrementalArray;


  constructor(
    public currFretboard: CurrentFretboardService,
    public custom: CustomizeService
  ) { }


  ngOnInit(): void {
    this.updateStrings(0);
  }


  get maxNumberOfExtraStringsLimit(): number {
    return 8 - this.currFretboard.fretboard.tuning.intervals.length;
  }


  get semitones(): number[] {
    return SEMITONE_OPTIONS;
  };


  updateStrings(maxExtraStrings: number) {
    this.currFretboard.fretboard.instrument.maxExtraStrings = maxExtraStrings;
    this.currFretboard.fretboard.numberOfStrings = this.currFretboard.fretboard.tuning.intervals.length + maxExtraStrings;
  }
}
