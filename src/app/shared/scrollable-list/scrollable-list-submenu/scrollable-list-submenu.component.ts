import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Displays a submenu for a scrollable list. Includes list title,
 * search function and reset option.
 */
@Component({
  selector: 'app-scrollable-list-submenu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scrollable-list-submenu.component.html',
  styleUrl: './scrollable-list-submenu.component.scss'
})
export class ScrollableListSubmenuComponent implements AfterViewInit {
  @Input() title?: string;
  @Input() allowSearch: boolean = true;
  @Input() allowReset: boolean = true;
  @Input() searchFilter?: string;
  @Output() searchFilterChange: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();
  @Output() refocus: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('innerWrapper') innerWrapper!: ElementRef<HTMLDivElement>;
  @Output() bgWidth: EventEmitter<number> = new EventEmitter<number>();


  /**
   * Constructor for injections.
   */
  constructor(
    private cdr: ChangeDetectorRef
  ) { }


  /**
   * After component view initialization, executes custom initialization.
   */
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.detectChanges();
      this.initWidth();
    }, 160);
  }


  /**
   * Reads the submenu width from the DOM tree and emits the corresponding background width.
   */
  initWidth(): void {
    setTimeout(() => {
      const submenuWidth = this.innerWrapper.nativeElement.offsetWidth;
      this.bgWidth.emit(submenuWidth + 16);
    }, 40);
  }


  /**
   * Emits search filter change event.
   */
  emitSearch(): void {
    this.searchFilterChange.emit(this.searchFilter);
  }


  /**
   * Initializes search, including autofocus.
   */
  initSearch(): void {
    this.searchFilter = '';
    this.emitSearch();
    setTimeout(() => this.focusSearch(), 80);
  }


  /**
   * Clears search filter.
   */
  clearSearch(): void {
    this.searchFilter = undefined;
    this.emitSearch();
  }


  /**
   * Focuses search HTML input element, if it exists in the DOM tree.
   */
  focusSearch(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
}
