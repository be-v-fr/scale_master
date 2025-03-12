import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ElementRef, HostListener, AfterViewInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { ScrollableListItemComponent } from './scrollable-list-item/scrollable-list-item.component';
import { ScrollableListArrowComponent } from './scrollable-list-arrow/scrollable-list-arrow.component';
import { isEqual } from 'lodash';
import { HoverDirective } from '../../../directives/hover.directive';
import { modWithSubZero } from '../../../utils/mod.utils';

@Component({
  selector: 'app-scrollable-list',
  standalone: true,
  imports: [CommonModule, ScrollableListItemComponent, ScrollableListArrowComponent, HoverDirective],
  templateUrl: './scrollable-list.component.html',
  styleUrl: './scrollable-list.component.scss'
})
export class ScrollableListComponent implements OnInit, AfterViewInit {
  private _content: (string | number)[] = [];
  get content(): (string | number)[] {
    return this._content;
  }
  @Input({ required: true }) set content(value: (string | number)[]) {
    if (!isEqual(this._content, value)) {
      this._content = value;
      this.focus = this.defaultIndex;
    }
  };

  @Input() title?: string;

  private _positions: ('over' | 'top' | 'up' | 'center' | 'down' | 'bottom' | 'under')[] = [
    'over', 'over', 'over', 'top', 'up', 'center', 'down', 'bottom', 'under', 'under', 'under'
  ];
  get positions() {
    return this._positions;
  }

  scrollSteps: number = 0;
  focus: number = 0;
  @Input() defaultIndex: number = 0;

  @Input() set autofocus(value: number) {
    this.focus = value;
  }

  @Input() current?: any;
  @Output() currentChange: EventEmitter<any> = new EventEmitter<any>();
  private lastWheelEventTime = 0;
  private throttleTime = 100;
  private currentTimeout: ReturnType<typeof setTimeout> | null = null;
  @ViewChildren(ScrollableListItemComponent) items!: QueryList<ScrollableListItemComponent>;
  containerWidth: number = 100;

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    if (this.current) {
      const currentIndex = this._content.indexOf(this.current);
      if (currentIndex >= 0) {
        this.focus = currentIndex;
      } else {
        throw (`Currently selected value "${this.current}" does not exist in list content.`);
      }
    }
  }

  ngAfterViewInit(): void {
    const maxWidth = Math.max(...this.items.map(i => i.contentRef.nativeElement.offsetWidth));
    this.containerWidth = maxWidth / 0.84;
    this.cdr.detectChanges();
  }

  getContentIndexFromPositionIndex(positionIndex: number): number {
    const length = this.content.length;
    const contentIndex = positionIndex - Math.floor(this.positions.length / 2) + this.focus;
    return modWithSubZero(contentIndex, length);
  }

  getContentItem(positionIndex: number): any {
    const contentIndex = this.getContentIndexFromPositionIndex(positionIndex);
    return this._content[contentIndex];
  }

  isDefault(positionIndex: number): boolean {
    if (this.defaultIndex) {
      return this.getContentItem(positionIndex) === this._content[this.defaultIndex];
    }
    return false;
  }

  onListItemClick(positionIndex: number) {
    if (this.currentTimeout && this.scrollSteps !== 0) {
      this.handleListItemDoubleClick();
    } else if (!['over', 'under'].includes(this.positions[positionIndex])) {
      const steps = positionIndex - Math.floor(this.positions.length / 2);
      if (steps !== 0) {
        const timeoutLength = Math.abs(steps) == 1 ? 210 : 270;
        this.scrollBySteps(steps, timeoutLength);
      }
    }
  }

  handleListItemDoubleClick() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
      this.scrollBySteps(this.scrollSteps, 0);
      this.scrollBySteps(this.scrollSteps, 120);
    }
  }

  scrollBySteps(steps: number, focusTimeoutLength: number) {
    this.scrollSteps = steps;
    this.currentTimeout = setTimeout(() => this.setNewFocus(steps), focusTimeoutLength);
  }

  setNewFocus(steps: number) {
    this.scrollSteps = 0;
    this.currentTimeout = null;
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

  onListArrowClick(steps: number, timeoutLength: number): void {
    if (this.content.length > 0) {
      this.scrollBySteps(steps, timeoutLength);
    }
  }

  onHoverKeyDown(event: KeyboardEvent) {
    const scrollTimeoutLength: number = 240;
    switch (event.key) {
      case 'ArrowDown': this.scrollBySteps(1, scrollTimeoutLength); break;
      case 'ArrowUp': this.scrollBySteps(-1, scrollTimeoutLength);
    }
  }
}