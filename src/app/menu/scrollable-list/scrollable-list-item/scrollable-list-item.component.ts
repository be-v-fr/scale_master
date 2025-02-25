import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrollable-list-item',
  standalone: true,
  imports: [],
  templateUrl: './scrollable-list-item.component.html',
  styleUrl: './scrollable-list-item.component.scss'
})
export class ScrollableListItemComponent {
  @Input({ required: true }) content!: string;
}
