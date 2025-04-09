import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Note } from '../../../models/note';
import { DisplayService } from '../../../services/display.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { Router } from '@angular/router';
import { ScaleMode } from '../../../interfaces/scale-mode';

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
    private router: Router,
    public display: DisplayService,
    public currScale: CurrentScaleService
  ) { }


  get interval(): number | undefined {
    return this.note?.getIntervalFromIndex(this.currScale.scale.root.index);
  }


  get tooltipContent(): string {
    if(typeof(this.interval) === 'number' && this.currScale.scale.category.modes && this.router.url.includes('edit/1/scale') && this.currScale.scale.category.intervals.includes(this.interval)) {
      const mode: ScaleMode | undefined = this.currScale.scale.getMode(this.interval);
      if(mode) return mode.name;
    }
    return '';
  }
}
