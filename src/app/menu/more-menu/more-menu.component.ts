import { Component } from '@angular/core';
import { CircularButtonComponent } from '../../shared/circular-button/circular-button.component';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../services/dialog.service';
import { RouterLink } from '@angular/router';

/**
 * Displays a `more` button and a corresponding submenu containing the secondary submenus
 * for mobile devices.
 */
@Component({
  selector: 'app-more-menu',
  standalone: true,
  imports: [CommonModule, CircularButtonComponent, RouterLink],
  templateUrl: './more-menu.component.html',
  styleUrl: './more-menu.component.scss'
})
export class MoreMenuComponent {
  isOpen: boolean = false;


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private dialog: DialogService
  ) { }


  /**
   * Closes current dialog (if there is an open one) and opens this menu.
   */
  open(): void {
    this.dialog.close().then(() => this.isOpen = true);
  }
}
