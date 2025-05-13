import { Component } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';

/**
 * Displays the export submenu.
 */
@Component({
  selector: 'app-export',
  standalone: true,
  imports: [],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss'
})
export class ExportComponent {


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public dialog: DialogService
  ) { }
}
