import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-circular-button',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './circular-button.component.html',
  styleUrl: './circular-button.component.scss'
})
export class CircularButtonComponent {
  @Input({ required: true }) icon!: string;
  @Input() info: string  = '';
}
