import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Note } from '../../../models/note';
import { DisplayService } from '../../../services/display.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { ScaleMode } from '../../../interfaces/scale-mode';
import { CustomizeService } from '../../../services/customize.service';

/**
 * Displays a note on the fretboard, if a note is transferred via input.
 * Displays an empty element otherwise.
 */
@Component({
  selector: 'app-fret-note',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './fret-note.component.html',
  styleUrl: './fret-note.component.scss'
})
export class FretNoteComponent {
  @Input() note?: Note;
  @Input('root') isRoot: boolean = false;

  
  /**
   * Constructor for injection of services.
   */
  constructor(
    public display: DisplayService,
    public currScale: CurrentScaleService,
    private custom: CustomizeService,
  ) { }


  get interval(): number | undefined {
    return this.note?.getIntervalFromIndex(this.currScale.scale.root.index);
  }


  get tooltipContent(): string {
    if(typeof(this.interval) === 'number' && this.currScale.scale.category.modes && this.custom.mode === 'scale' && this.custom.currentStep && [1, 2].includes(this.custom.currentStep) && this.currScale.scale.category.intervals.includes(this.interval)) {
      const mode: ScaleMode | undefined = this.currScale.scale.getMode(this.interval);
      if(mode) return mode.name;
    }
    return '';
  }
}
