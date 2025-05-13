import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideToggleComponent } from '../../shared/slide-toggle/slide-toggle.component';
import { CurrentFretboardService } from '../../../services/current-fretboard.service';
import { getIncrementalArray, SEMITONE_OPTIONS } from '../../../utils/array.utils';
import { ScrollableListComponent } from '../../shared/scrollable-list/scrollable-list.component';
import { CustomizeService } from '../../../services/customize.service';
import { InfoMsgComponent } from '../../shared/info-msg/info-msg.component';
import { RouterLink } from '@angular/router';
import { CONFIG } from '../../../const/config';

/**
 * Displays a menu to define rules regarding the addiction of extra strings
 * regarding a custom tuning.
 */
@Component({
  selector: 'app-dialog-add-strings-rules',
  standalone: true,
  imports: [CommonModule, SlideToggleComponent, ScrollableListComponent, InfoMsgComponent, RouterLink],
  templateUrl: './dialog-add-strings-rules.component.html',
  styleUrl: './dialog-add-strings-rules.component.scss'
})
export class DialogAddStringsRulesComponent implements OnInit {
  getIncrArray: (length: number) => number[] = getIncrementalArray;
  CONFIG = CONFIG;


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public currFretboard: CurrentFretboardService,
    public custom: CustomizeService,
    private cdr: ChangeDetectorRef
  ) { }


  /**
   * Initializes the component by setting the default number of additional strings.
   */
  ngOnInit(): void {
    this.updateStrings(0);
  }


  get maxNumberOfExtraStringsLimit(): number {
    return CONFIG.maxStrings - this.currFretboard.fretboard.tuning.intervals.length;
  }


  get semitones(): number[] {
    return SEMITONE_OPTIONS;
  };


  /**
   * Updates the number of strings on the fretboard based on the number
   * of additional strings selected by the user.
   */
  updateStrings(maxExtraStrings: number) {
    this.currFretboard.fretboard.instrument.maxExtraStrings = maxExtraStrings;
    this.currFretboard.fretboard.numberOfStrings = this.currFretboard.fretboard.tuning.intervals.length + maxExtraStrings;
    this.cdr.detectChanges();
  }
}
