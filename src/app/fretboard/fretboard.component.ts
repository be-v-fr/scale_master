import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FretNoteComponent } from './fret-note/fret-note.component';
import { CommonModule } from '@angular/common';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { DisplayService } from '../../services/display.service';
import { CurrentScaleService } from '../../services/current-scale.service';
import { Router } from '@angular/router';
import { CustomizeService } from '../../services/customize.service';
import { getModTwelveIndex } from '../../utils/mod.utils';
import { EditFretboardOverlayComponent } from '../edit-fretboard-overlay/edit-fretboard-overlay.component';

/**
 * Displays the fretboard with the currently selected scale.
 */
@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [CommonModule, FretNoteComponent, EditFretboardOverlayComponent],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.scss'
})
export class FretboardComponent {
  @ViewChildren('stringNoteContainer') stringNoteRefs!: QueryList<ElementRef<HTMLElement>>;
  get selectedStringNote(): HTMLElement | undefined {
    if (typeof (this.custom.currentStringSelection) === 'number') {
      return this.stringNoteRefs.toArray()[this.custom.currentStringSelection].nativeElement;
    }
    return undefined;
  }


  /**
   * Constructor for injection of services.
   */
  constructor(
    public router: Router,
    private currScale: CurrentScaleService,
    public currFretboard: CurrentFretboardService,
    public display: DisplayService,
    public custom: CustomizeService
  ) { }

  get frets(): number[] {
    return Array.from({ length: 12 });
  }

  onFretClick(instrumentStringIndex: number, fret: number) {
    if (this.custom.mode === 'scale' && typeof (this.custom.currentStep) === 'number') {
      this.onScaleEditFretClick(this.custom.currentStep, instrumentStringIndex, fret);
    }
  }

  onScaleEditFretClick(step: number, instrumentStringIndex: number, fret: number) {
    const pitch: number = this.currFretboard.getFretNoteIndex(instrumentStringIndex, fret);
    let interval: number = pitch - this.currScale.scale.root.index;
    interval = getModTwelveIndex(interval);
    switch (step) {
      case 0: this.currScale.scale.toggleInterval(interval); break;
      case 1: this.handleModeToggling(interval);
    }
  }

  handleModeToggling(interval: number): void {
    this.currScale.scale.toggleMode(interval);
    if (this.currScale.scale.modeExists(interval)) {
      this.router.navigate([{ outlets: { 'dialog': ['d', 'modes', 'name', interval] } }])
    }
  }

  onStringNoteClick(interval: number, stringIndex: number): void {
    if (this.custom.mode === 'fretboard' && typeof (this.custom.currentStep) === 'number') {
      this.onFretboardEditStringClick(this.custom.currentStep, interval, stringIndex);
    }
  }

  onFretboardEditStringClick(step: number, interval: number, stringIndex: number) {
    switch (step) {
      case 0: break;
      case 1: this.currFretboard.fretboard.setIntervalAsRoot(interval); break;
      case 2: this.custom.currentStringSelection = (stringIndex ?? 0);
    }
  }
}
