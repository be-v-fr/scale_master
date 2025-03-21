import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-button',
  standalone: true,
  imports: [],
  templateUrl: './circular-button.component.html',
  styleUrl: './circular-button.component.scss'
})
export class CircularButtonComponent {
  @Input({ required: true }) icon!: string;
}
