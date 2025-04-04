import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-dots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-dots.component.html',
  styleUrl: './pagination-dots.component.scss'
})
export class PaginationDotsComponent {
  @Input() total: number = 0;
  @Input() activeIndex: number = 0;
  @Output() dotClick: EventEmitter<number> = new EventEmitter<number>();

  get dots(): number[] {
    return Array.from({ length: this.total });
  }

  onDotClick(index: number) {
    this.dotClick.emit(index);
  }
}
