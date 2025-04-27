import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableListComponent } from '../shared/scrollable-list/scrollable-list.component';
import { Note } from '../../models/note';
import { CurrentScaleService } from '../../services/current-scale.service';
import { ScalesDataService } from '../../services/scales-data.service';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { TuningsDataService } from '../../services/tunings-data.service';
import { SettingsDisplayComponent } from './settings-display/settings-display.component';
import { DisplayService } from '../../services/display.service';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { ExportComponent } from './export/export.component';
import { RouterLink } from '@angular/router';
import { CustomizeService } from '../../services/customize.service';

/**
 * Displays the menu offering any app controls.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ScrollableListComponent, SettingsDisplayComponent, ExportComponent, CircularButtonComponent, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  /**
   * Constructor for injection of services.
   */
  constructor(
    public currFretboard: CurrentFretboardService,
    public tuningsData: TuningsDataService,
    public currScale: CurrentScaleService,
    public scalesData: ScalesDataService,
    public display: DisplayService,
    public custom: CustomizeService
  ) { }
}
