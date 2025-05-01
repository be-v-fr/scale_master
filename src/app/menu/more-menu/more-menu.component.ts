import { Component } from '@angular/core';
import { CircularButtonComponent } from '../../shared/circular-button/circular-button.component';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../services/dialog.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-more-menu',
  standalone: true,
  imports: [CommonModule, CircularButtonComponent, RouterLink],
  templateUrl: './more-menu.component.html',
  styleUrl: './more-menu.component.scss'
})
export class MoreMenuComponent {
  isOpen: boolean = false;


  constructor(
    private dialog: DialogService
  ) { }


  open(): void {
    this.dialog.close().then(() => this.isOpen = true);
  }
}
