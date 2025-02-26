import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScrollableListItemComponent } from './scrollable-list-item/scrollable-list-item.component';
import { ScrollableListArrowComponent } from './scrollable-list-arrow/scrollable-list-arrow.component';

@Component({
  selector: 'app-scrollable-list',
  standalone: true,
  imports: [CommonModule, ScrollableListItemComponent, ScrollableListArrowComponent],
  templateUrl: './scrollable-list.component.html',
  styleUrl: './scrollable-list.component.scss'
})

export class ScrollableListComponent {
  @Input({ required: true }) content!: any[];
  _positions: ('over' | 'top' | 'up' | 'center' | 'down' | 'bottom' | 'under')[] = ['over', 'over', 'over', 'top', 'up', 'center', 'down', 'bottom', 'under', 'under', 'under'];
  get positions() {
    return this._positions;
  }
  scrollSteps: number = 0;
  focus: number = 0;
  @Output() current: EventEmitter<any> = new EventEmitter<any>();

  printContent(positionIndex: number) {
    const length = this.content.length;
    let index = positionIndex - Math.floor(this.positions.length / 2) + this.focus;
    index = (index + length) % length;
    return this.content[index];
  }

  handleClick(positionIndex: number) {
    if (!['over', 'under'].includes(this.positions[positionIndex])) {
      const steps = positionIndex - Math.floor(this.positions.length / 2);
      if (steps !== 0) {
        this.scrollBySteps(steps);
      }
    }
  }

  scrollBySteps(steps: number) {
    this.scrollSteps = steps;
    setTimeout(() => this.setNewFocus(steps), 300);
  }

  setNewFocus(steps: number) {
    this.scrollSteps = 0;
    const length = this.content.length;
    this.focus += steps;
    this.focus = (this.focus + length) % length;
    this.current.emit(this.content[this.focus]);
  }
}
