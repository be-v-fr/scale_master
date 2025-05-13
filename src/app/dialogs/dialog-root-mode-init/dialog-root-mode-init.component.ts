import { Component } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';
import { InfoMsgComponent } from '../../shared/info-msg/info-msg.component';

/**
 * Displays a non-interactive dialog informing the user that the scale
 * he selected for customization was initialized using its root mode.
 */
@Component({
  selector: 'app-dialog-root-mode-init',
  standalone: true,
  imports: [InfoMsgComponent],
  templateUrl: './dialog-root-mode-init.component.html',
  styleUrl: './dialog-root-mode-init.component.scss'
})
export class DialogRootModeInitComponent {


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public dialog: DialogService
  ) { }
}
