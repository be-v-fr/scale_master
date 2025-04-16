import { Component } from '@angular/core';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { DialogService } from '../../../services/dialog.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-name-scale',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-name-scale.component.html',
  styleUrl: './dialog-name-scale.component.scss'
})
export class DialogNameScaleComponent {


  constructor(
    public currScale: CurrentScaleService,
    public dialog: DialogService
  ) { }
}
