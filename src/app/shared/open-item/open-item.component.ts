import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-open-item',
  standalone: true,
  imports: [],
  templateUrl: './open-item.component.html',
  styleUrl: './open-item.component.scss'
})
export class OpenItemComponent {
  @Input({ required: true }) name!: string;
  @Output() open: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
}
