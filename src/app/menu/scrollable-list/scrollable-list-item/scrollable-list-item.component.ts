import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

/**
 * Displays an item contained in a scrollable list.
 */
@Component({
  selector: 'app-scrollable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrollable-list-item.component.html',
  styleUrl: './scrollable-list-item.component.scss'
})
export class ScrollableListItemComponent {
  @Input({ required: true }) content!: string | number;
  @Input() default?: string | number;
  @ViewChild('contentElement') contentRef!: ElementRef<HTMLSpanElement>

  // TODO: Check width compared to parent. Reduce font size if too large.
}
