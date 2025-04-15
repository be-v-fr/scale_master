import { Component } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';
import { InfoMsgComponent } from '../../shared/info-msg/info-msg.component';

@Component({
  selector: 'app-dialog-root-mode-init',
  standalone: true,
  imports: [InfoMsgComponent],
  templateUrl: './dialog-root-mode-init.component.html',
  styleUrl: './dialog-root-mode-init.component.scss'
})
export class DialogRootModeInitComponent {


  constructor(
    public dialog: DialogService
  ) { }
}
