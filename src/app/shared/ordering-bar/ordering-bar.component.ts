import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ordering } from '../../../interfaces/ordering';

/**
 * Displays buttons to control ordering (by name or creation date).
 */
@Component({
  selector: 'app-ordering-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordering-bar.component.html',
  styleUrl: './ordering-bar.component.scss'
})
export class OrderingBarComponent {
  @Input() ordering: Ordering = { order: 'desc', orderingBy: 'createdAt' };
  @Output() orderingChange: EventEmitter<Ordering> = new EventEmitter();


  /**
   * Handles clicks on the ordering buttons.
   * If the current button is active, toggles the order direction.
   * Otherwise, switches the ordering criteria.
   */
  onOrderingBtnClick(btn: 'name' | 'createdAt'): void {
    if (btn === this.ordering.orderingBy) {
      this.toggleOrder();
    } else {
      this.ordering.orderingBy = btn;
      this.ordering.order = 'desc';
    }
    this.orderingChange.emit(this.ordering);
  }



  /**
   * Toggles between ascending and descending order.
   */
  toggleOrder(): void {
    this.ordering.order = (this.ordering.order === 'desc' ? 'asc' : 'desc');
  }
}
