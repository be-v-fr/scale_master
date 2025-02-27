import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ElementRef, HostListener } from '@angular/core';
import { ScrollableListItemComponent } from './scrollable-list-item/scrollable-list-item.component';
import { ScrollableListArrowComponent } from './scrollable-list-arrow/scrollable-list-arrow.component';

@Component({
  selector: 'app-scrollable-list',
  standalone: true,
  imports: [CommonModule, ScrollableListItemComponent, ScrollableListArrowComponent],
  templateUrl: './scrollable-list.component.html',
  styleUrl: './scrollable-list.component.scss'
})

export class ScrollableListComponent implements OnInit {
  @Input({ required: true }) content!: any[];
  private _positions: ('over' | 'top' | 'up' | 'center' | 'down' | 'bottom' | 'under')[] = ['over', 'over', 'over', 'top', 'up', 'center', 'down', 'bottom', 'under', 'under', 'under'];
  get positions() {
    return this._positions;
  }
  scrollSteps: number = 0;
  focus: number = 0;
  @Input() current: any;
  @Output() currentChange: EventEmitter<any> = new EventEmitter<any>();
  private lastWheelEventTime = 0;
  private throttleTime = 100;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    if (this.current) {
      const currentIndex = this.content.indexOf(this.current);
      if (currentIndex >= 0) {
        this.focus = currentIndex;
      } else {
        throw (`Currently selected value "${this.current}" does not exist in list content.`);
      }
    }
  }

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
        this.scrollBySteps(steps, 270);
      }
    }
  }

  scrollBySteps(steps: number, focusTimeoutLength: number) {
    this.scrollSteps = steps;
    setTimeout(() => this.setNewFocus(steps), focusTimeoutLength);
  }

  setNewFocus(steps: number) {
    this.scrollSteps = 0;
    const length = this.content.length;
    this.focus += steps;
    this.focus = (this.focus + length) % length;
    this.currentChange.emit(this.content[this.focus]);
  }

  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      const now = Date.now();
      if (now >= this.lastWheelEventTime + this.throttleTime) {
        const steps = event.deltaY > 0 ? 1 : -1;
        this.scrollBySteps(steps, this.throttleTime / 4);
        this.lastWheelEventTime = now;
      }
    }
  }
}
