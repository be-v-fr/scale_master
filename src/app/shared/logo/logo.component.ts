import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Displays the Scalion logo with a number of optional settings.
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() animate = false;
  @Input() dark = false;
  @Input() short = false;
}
