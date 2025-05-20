import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ElementRef, QueryList, ViewChildren, ChangeDetectorRef, OnDestroy } from '@angular/core';
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
export class ScrollableListComponent implements OnInit, OnDestroy {
  private _content: (string | number)[] = [];
  get content(): (string | number)[] {
    return this._content;
  }
  @Input({ required: true }) set content(value: (string | number)[]) {
    if (!isEqual(this._content, value)) {
      this._content = value;
      this.focus = this.defaultIndex;
      this.applySearchFilter();
      this.calculatingItemScaling = true;
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

  calculatingItemScaling: boolean = true;
  itemScalingMap = new Map<string | number, { scaleDown: number | undefined, textEllipsis: boolean }>();

  private readonly passiveListenerConfigs: {
    type: keyof HTMLElementEventMap;
    handler: EventListenerOrEventListenerObject;
  }[] = [
      { type: 'wheel', handler: (e: Event) => this.onMouseWheel(e as WheelEvent) },
      { type: 'touchstart', handler: (e: Event) => this.onTouchStart(e as TouchEvent) },
      { type: 'touchmove', handler: (e: Event) => this.onTouchMove(e as TouchEvent) },
      { type: 'touchend', handler: () => this.onTouchEnd() }
    ];
  private removePassiveListeners: (() => void)[] = [];


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    public display: DisplayService,
  ) { }


  /**
   * Filters content based on the current search input.
   * Sorts filtered content alphabetically if a filter is applied.
   */
  applySearchFilter(): void {
    this.filteredContent = this._content.filter(item => {
      if (this.searchFilter) {
        return item.toString().toLowerCase().includes(this.searchFilter.toLowerCase());
      }
      return true;
    });
    if (this.searchFilter) {
      this.filteredContent.sort((a, b) => String(a).localeCompare(String(b)));
    }
    this.cdr.detectChanges();
  }


  /**
   * Component lifecycle hook. Sets focus if `current` input is present.
   */
  ngOnInit(): void {
    if (this.current === undefined) return;
    const currentIndex = this._content.indexOf(this.current);
    if (currentIndex >= 0) {
      this.focus = currentIndex;
    } else {
      console.error(`Currently selected value "${this.current}" does not exist in list "${this.title}":`, this.content);
    }
    this.initPassiveListeners();
  }


  /**
   * Lifecycle hook that is called upon component destruction.
   * Removes passive event listeners by calling the corresponding methods defined before.
   */
  ngOnDestroy(): void {
    this.removePassiveListeners.forEach(rm => rm());
  }


  /**
   * Initializes passive event listeners using the given configuration.
   * Note: "HostListener" cannot be used here since it doesn't feature the "passive" key.
   */
  initPassiveListeners(): void {
    const nativeEl = this.elementRef.nativeElement;
    for (const { type, handler } of this.passiveListenerConfigs) {
      nativeEl.addEventListener(type, handler, { passive: true });
      this.removePassiveListeners.push(() => nativeEl.removeEventListener(type, handler));
    }
  }


  /**
   * Initializes background width for submenu visual element.
   * @param bgWidth Width in pixels
   */
  initSubmenuBg(bgWidth: number): void {
    this.submenuBgWidth = bgWidth;
    this.cdr.detectChanges();
  }


  /**
   * Converts visual position index to real content index.
   * @param positionIndex Index in `positions` array
   */
  getContentIndexFromPositionIndex(positionIndex: number): number {
    const length = this.filteredContent.length;
    const contentIndex = positionIndex - Math.floor(this.positions.length / 2) + this.focus;
    return length > 3 ?
      modWithSubZero(contentIndex, length) :
      (contentIndex >= 0 && contentIndex < length ? contentIndex : -1);
  }


  /**
   * Returns the content item at the given position index.
   * @param positionIndex Position index to resolve
   */
  getContentItem(positionIndex: number): string | number {
    const contentIndex = this.getContentIndexFromPositionIndex(positionIndex);
    return contentIndex >= 0 ? this.filteredContent[contentIndex] : '';
  }


  /**
   * Handles click events on list items.
   * Determines whether to scroll or trigger selection.
   * @param positionIndex Clicked item index
   */
  onListItemClick(positionIndex: number) {
    if (this.currentTimeout && this.scrollSteps !== 0) {
      this.handleListItemDoubleClick();
    } else if (!['over', 'under'].includes(this.positions[positionIndex])) {
      const steps = positionIndex - Math.floor(this.positions.length / 2);
      if (steps !== 0) {
        const timeoutLength = Math.abs(steps) === 1 ? 210 : 270;
        this.scrollBySteps(steps, timeoutLength);
      }
    }
  }


  /**
   * Triggers a double scroll animation if item is clicked twice quickly.
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
   * Initiates scrolling by given number of steps with delay.
   * @param steps Scroll steps (positive/negative)
   * @param focusTimeoutLength Timeout in ms before scroll is applied
   */
  scrollBySteps(steps: number, focusTimeoutLength: number) {
    this.scrollSteps = steps;
    this.currentTimeout = setTimeout(() => this.refocusBySteps(steps), focusTimeoutLength);
  }


  /**
   * Sets focus by absolute content index and emits change event.
   * @param index Content index to focus
   */
  refocusByIndex(index: number) {
    this.focus = index;
    this.currentChange.emit(this.filteredContent[index]);
  }


  /**
   * Sets focus by relative scroll steps and emits change.
   * @param steps Scroll direction and count
   */
  refocusBySteps(steps: number) {
    this.scrollSteps = 0;
    this.currentTimeout = null;
    const length = this.filteredContent.length;
    this.focus += steps;
    this.refocusByIndex((this.focus + length) % length);
  }


  /**
   * Mouse wheel event listener for scrolling.
   */
  onMouseWheel(event: WheelEvent) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      this.handleScroll(event.deltaY);
    }
  }


  /**
   * Records Y position when touch starts.
   */
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }


  /**
   * Scrolls the list based on touch move gesture.
   */
  onTouchMove(event: TouchEvent) {
    if (this.touchStartY === null) return;
    const currentY = event.touches[0].clientY;
    const deltaY = this.touchStartY - currentY;
    const isScrolling = this.handleScroll(deltaY);
    if (isScrolling) {
      this.touchStartY = currentY;
    }
  }


  /**
   * Clears touch position at the end of a gesture.
   */
  onTouchEnd() {
    this.touchStartY = null;
  }


  /**
   * Core scroll handler for mouse/touch input.
   * @param deltaY Scroll distance (positive or negative)
   */
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


  /**
   * Checks whether the next scroll step would exceed bounds.
   * @param deltaY Scroll direction
   */
  isAboutToCrossContentEnd(deltaY: number): boolean {
    return (deltaY < 0 && this.focusIsStart) || (deltaY > 0 && this.focusIsEnd);
  }


  /** True if focus is at first item and content is small */
  get focusIsStart(): boolean {
    return this.focus === 0 && this.filteredContent.length <= 3;
  }


  /** True if focus is at last item and content is small */
  get focusIsEnd(): boolean {
    return this.focus === this.filteredContent.length - 1 && this.filteredContent.length <= 3;
  }


  /**
   * Handles arrow control click for manual scrolling.
   * @param steps Scroll direction
   * @param timeoutLength Delay before focus change
   */
  onListArrowClick(steps: number, timeoutLength: number): void {
    if (!this.disabled && this.filteredContent.length > 0) {
      this.scrollBySteps(steps, timeoutLength);
    }
  }


  /**
   * Handles keydown events while hovering over the list.
   * Enables keyboard navigation.
   */
  onHoverKeyDown(event: KeyboardEvent) {
    const scrollTimeoutLength: number = 240;
    const steps: number = this.getStepsFromKey(event);
    if (steps !== 0 && !this.isAboutToCrossContentEnd(steps)) {
      this.scrollBySteps(steps, scrollTimeoutLength);
    }
  }


  /**
   * Converts arrow key event to scroll step.
   * @param event Keyboard event
   */
  getStepsFromKey(event: KeyboardEvent): number {
    switch (event.key) {
      case 'ArrowDown': return 1;
      case 'ArrowUp': return -1;
    }
    return 0;
  }


  /**
   * Handles changes in search input.
   * Applies new filter and resets focus.
   */
  onSearchChange(): void {
    const index = this.searchFilter ? 0 : this.focus;
    this.applySearchFilter();
    this.refocusByIndex(index);
  }


  /**
   * Adds list item scaling information to current list scaling map.
   * Controls "calculatingItemScaling" flag through checking whether the current item
   * is the last content item.
   */
  addToScalingMap(item: { content: string | number, scaleDown?: number, textEllipsis: boolean }, lastItem: boolean): void {
    this.itemScalingMap.set(item.content, { scaleDown: item.scaleDown || undefined, textEllipsis: item.textEllipsis });
    if (lastItem) {
      this.calculatingItemScaling = false;
      this.cdr.detectChanges();
    }
  }
}