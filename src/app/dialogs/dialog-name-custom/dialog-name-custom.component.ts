import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { DialogService } from '../../../services/dialog.service';
import { FormsModule } from '@angular/forms';
import { CurrentFretboardService } from '../../../services/current-fretboard.service';
import { CustomizeService } from '../../../services/customize.service';
import { AutofocusDirective } from '../../../directives/autofocus.directive';

/**
 * Displays a dialog for naming a custom scale or tuning.
 */
@Component({
  selector: 'app-dialog-name-custom',
  standalone: true,
  imports: [CommonModule, FormsModule, AutofocusDirective],
  templateUrl: './dialog-name-custom.component.html',
  styleUrl: './dialog-name-custom.component.scss'
})
export class DialogNameCustomComponent {


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public currScale: CurrentScaleService,
    public currFretboard: CurrentFretboardService,
    public custom: CustomizeService,
    public dialog: DialogService
  ) { }
}
