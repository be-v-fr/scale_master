import { Component, Input } from '@angular/core';

/**
 * Displays a button shaped as an arrow.
 */
@Component({
  selector: 'app-scrollable-list-arrow',
  standalone: true,
  imports: [],
  templateUrl: './scrollable-list-arrow.component.html',
  styleUrl: './scrollable-list-arrow.component.scss'
})
export class ScrollableListArrowComponent {
  @Input() orientation: 'up' | 'down' = 'up';
}
