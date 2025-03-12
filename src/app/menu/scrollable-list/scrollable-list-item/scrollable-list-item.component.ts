import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

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
}
