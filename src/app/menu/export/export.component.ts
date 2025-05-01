import { Component } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss'
})
export class ExportComponent {


  constructor(
    public dialog: DialogService
  ) { }
}
