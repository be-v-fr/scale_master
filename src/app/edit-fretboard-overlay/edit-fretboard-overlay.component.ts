import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeService } from '../../services/customize.service';
import { ScrollableListComponent } from '../menu/scrollable-list/scrollable-list.component';
import { DisplayService } from '../../services/display.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';

@Component({
  selector: 'app-edit-fretboard-overlay',
  standalone: true,
  imports: [CommonModule, ScrollableListComponent],
  templateUrl: './edit-fretboard-overlay.component.html',
  styleUrl: './edit-fretboard-overlay.component.scss'
})
export class EditFretboardOverlayComponent {


  constructor(
    public custom: CustomizeService,
    public display: DisplayService,
    public currFretboard: CurrentFretboardService
  ) { }
}
