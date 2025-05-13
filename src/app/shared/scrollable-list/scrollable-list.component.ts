import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ElementRef, HostListener, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { ScrollableListItemComponent } from './scrollable-list-item/scrollable-list-item.component';
import { ScrollableListArrowComponent } from './scrollable-list-arrow/scrollable-list-arrow.component';
import { isEqual } from 'lodash';
import { HoverDirective } from '../../../directives/hover.directive';
import { modWithSubZero } from '../../../utils/mod.utils';
import { ScrollableListSubmenuComponent } from './scrollable-list-submenu/scrollable-list-submenu.component';
import { DisplayService } from '../../../services/display.service';
import { ArrowPointerComponent } from '../arrow-pointer/arrow-pointer.component';

/**
 * Displays a scrollable list for any content array that consists of strings or numbers.
 * Includes a submenu with further options.
 */
@Component({
  selector: 'app-scrollable-list',
  standalone: true,
  imports: [CommonModule, ScrollableListItemComponent, ScrollableListArrowComponent, HoverDirective, ScrollableListSubmenuComponent, ArrowPointerComponent],
  templateUrl: './scrollable-list.component.html',
  styleUrl: './scrollable-list.component.scss'
})
export class ScrollableListComponent implements OnInit {
  private _content: (string | number)[] = [];
  @Input({ required: true }) set content(value: (string | number)[]) {
    if (!isEqual(this._content, value)) {
      this._content = value;
      this.focus = this.defaultIndex;
      this.applySearchFilter();
    }
  };
  filteredContent: (string | number)[] = [];

  @Input() title?: string;

  get positions(): ('over' | 'top' | 'up' | 'center' | 'down' | 'bottom' | 'under')[] {
    switch (this.filteredContent.length) {
      case 1: return ['center'];
      case 2: return ['up', 'center', 'down'];
      case 3: return ['top', 'up', 'center', 'down', 'bottom'];
      default: return ['over', 'over', 'over', 'top', 'up', 'center', 'down', 'bottom', 'under', 'under', 'under'];
    }
  }

  scrollSteps: number = 0;
  focus: number = 0;
  @Input() defaultIndex: number = 0;

  @Input() set autofocus(value: number) {
    this.focus = value;
  }

  private _current?: string | number;
  get current(): string | number | undefined {
    return this._current;
  }
  @Input() set current(value: string | number) {
    this._current = value;
    this.focus = this.filteredContent.indexOf(value);
  }

  @Output() currentChange: EventEmitter<any> = new EventEmitter<any>();
  private lastWheelEventTime = 0;
  private throttleTime = 100;
  private currentTimeout: ReturnType<typeof setTimeout> | null = null;
  @ViewChildren(ScrollableListItemComponent) items!: QueryList<ScrollableListItemComponent>;
  searchFilter?: string;
  @Input() allowSearch: boolean = true;
  @Input() allowReset: boolean = true;
  @Input() preventCollapse: boolean = false;
  submenuBgWidth?: number;
  private touchStartY: number | null = null;
  private cumulatedDeltaY: number = 0;

  private _disabled: boolean = false;
  get disabled(): boolean {
    return this._disabled;
  }
  @Input() set disabled(value: boolean) {
    this._disabled = value;
  }


  /**
   * Constructor for injection of the component HTML element reference.
   */
  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    public display: DisplayService,
  ) { }


  /**
   * Sets filtered content according to current search filter.
   * If no filter is active, returns the complete content.
   */
  applySearchFilter(): (void) {
    this.filteredContent = this._content.filter(item => {
      if (this.searchFilter) {
        return item.toString().toLowerCase().includes(this.searchFilter.toLowerCase());
      }
      return true;
    });
    if (this.searchFilter) {
      this.filteredContent.sort((a, b) => {
        const strA = String(a);
        const strB = String(b);
        return strA.localeCompare(strB);
      });
    }
    this.cdr.detectChanges();
  }


  /**
   * Upon component initialization, checks if a current value is transferred as an input property.
   * If a current value is transferred, checks if it is present in the content array and sets the
   * list focus accordingly.
   */
  ngOnInit(): void {
    if (this.current === undefined) return
    const currentIndex = this._content.indexOf(this.current);
    if (currentIndex >= 0) {
      this.focus = currentIndex;
    } else {
      console.error(`Currently selected value "${this.current}" does not exist in list "${this.title}":`, this.content);
    }
  }


  /**
   * Initializes submenu background element using the width from the submenu component. 
   */
  initSubmenuBg(bgWidth: number): void {
    this.submenuBgWidth = bgWidth;
    this.cdr.detectChanges();
  }


  /**
   * Transforms the index of an item in the positions array to the index
   * of the same item in the content array.
   * @param positionIndex - Item index in the list positions array (not to be confused with the list content array).
   */
  getContentIndexFromPositionIndex(positionIndex: number): number {
    const length = this.filteredContent.length;
    if (length > 3) {
      const contentIndex = positionIndex - Math.floor(this.positions.length / 2) + this.focus;
      return modWithSubZero(contentIndex, length);
    } else {
      const contentIndex = positionIndex - Math.floor(this.positions.length / 2) + this.focus;
      return contentIndex >= 0 && contentIndex < length ? contentIndex : -1;
    }
  }


  /**
   * Retrieves a content item using a position index.
   * @param positionIndex - Item index in the list positions array.
   */
  getContentItem(positionIndex: number): string | number {
    const contentIndex: number | null = this.getContentIndexFromPositionIndex(positionIndex);
    return contentIndex >= 0 ? this.filteredContent[contentIndex] : '';
  }


  /**
   * Handles list item click events depending on the item position.
   * @param positionIndex - Item index in the list positions array.
   */
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


  /**
   * Handles list item double click events
   */
  handleListItemDoubleClick() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
      this.scrollBySteps(this.scrollSteps, 0);
      this.scrollBySteps(this.scrollSteps, 120);
    }
  }


  /**
   * Scrolls the list by setting the scroll steps number and starting a refocus timeout.
   * @param steps - Number of steps to scroll (can be positive or negative).
   * @param focusTimeoutLength - Length of refocus timeout.
   */
  scrollBySteps(steps: number, focusTimeoutLength: number) {
    this.scrollSteps = steps;
    this.currentTimeout = setTimeout(() => this.refocusBySteps(steps), focusTimeoutLength);
  }


  /**
   * Refocuses the list to a given item marked by its index.
   * @param index - Content index.
   */
  refocusByIndex(index: number) {
    this.focus = index;
    this.currentChange.emit(this.filteredContent[index]);
  }


  /**
   * Refocuses the list using a given number of steps to go
   * starting from the current/previous value.
   * @param steps - Scrolling steps.
   */
  refocusBySteps(steps: number) {
    this.scrollSteps = 0;
    this.currentTimeout = null;
    const length = this.filteredContent.length;
    this.focus += steps;
    this.refocusByIndex((this.focus + length) % length);
  }


  /**
   * Handles mouse wheel events by scrolling the list accordingly.
   */
  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    if (this.elementRef.nativeElement.contains(event.target)) { // bed. zum stoppen
      this.handleScroll(event.deltaY);
    }
  }


  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }


  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.touchStartY === null) return;
    const currentY = event.touches[0].clientY;
    const deltaY = this.touchStartY - currentY;
    const isScrolling: boolean = this.handleScroll(deltaY);
    if (isScrolling) {
      this.touchStartY = currentY; // Update for continuous scroll
    }
  }


  @HostListener('touchend')
  onTouchEnd() {
    this.touchStartY = null;
  }


  handleScroll(deltaY: number): boolean {
    const now = Date.now();
    if (now >= this.lastWheelEventTime + this.throttleTime && !this.isAboutToCrossContentEnd(deltaY)) {
      this.cumulatedDeltaY += deltaY;
      if (Math.abs(this.cumulatedDeltaY) > 4) {
        const steps = deltaY > 0 ? 1 : -1;
        this.scrollBySteps(steps, this.throttleTime / 4);
        this.lastWheelEventTime = now;
        this.cumulatedDeltaY = 0;
        return true;
      }
    }
    return false;
  }


  isAboutToCrossContentEnd(deltaY: number): boolean {
    return (deltaY < 0 && this.focusIsStart) || (deltaY > 0 && this.focusIsEnd);
  }


  get focusIsStart(): boolean {
    return this.focus === 0 && this.filteredContent.length <= 3;
  }


  get focusIsEnd(): boolean {
    return this.focus === this.filteredContent.length - 1 && this.filteredContent.length <= 3;
  }


  /**
   * Handles clicks on the arrow-shapred buttons above and below the list itself.
   * @param steps - Number of steps to scroll (can be positive or negative).
   * @param focusTimeoutLength - Length of refocus timeout. 
   */
  onListArrowClick(steps: number, timeoutLength: number): void {
    if (!this.disabled && this.filteredContent.length > 0) {
      this.scrollBySteps(steps, timeoutLength);
    }
  }


  /**
   * Handles key down events that occur while the mouse cursor is hovering over the list.
   */
  onHoverKeyDown(event: KeyboardEvent) {
    const scrollTimeoutLength: number = 240;
    const steps: number = this.getStepsFromKey(event);
    if (steps !== 0 && !this.isAboutToCrossContentEnd(steps)) {
      this.scrollBySteps(steps, scrollTimeoutLength);
    }
  }


  getStepsFromKey(event: KeyboardEvent): number {
    switch (event.key) {
      case 'ArrowDown': return 1;
      case 'ArrowUp': return -1;
    }
    return 0;
  }


  /**
   * Handles search filter changes. Either refocuses the list or does nothing.
   */
  onSearchChange(): void {
    const index = this.searchFilter ? 0 : this.focus;
    this.applySearchFilter();
    this.refocusByIndex(index);
  }
}