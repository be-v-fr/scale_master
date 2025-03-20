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
  @Input() searchFilter?: string;
  @Output() searchFilterChange: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();
  @Output() refocus: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('innerWrapper') innerWrapper!: ElementRef<HTMLDivElement>;
  useIconPlaceholder: boolean = true;
  submenuWidth?: number;
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
      this.initWidth();
      this.checkWidth();
    }, 200);
  }


  /**
   * Reads the submenu width from the DOM tree, saves it and emits
   * the corresponding background width.
   */
  initWidth(): void {
    this.cdr.detectChanges();
    this.submenuWidth = this.innerWrapper.nativeElement.offsetWidth;
    this.bgWidth.emit(this.submenuWidth + 16);
  }


  /**
   * Checks the width of the inner and outer wrapper elements.
   * Sets style control properties accordingly. 
   */
  checkWidth(): void {
    const outerWrapper: HTMLElement | null = this.innerWrapper.nativeElement.parentElement;
    if(this.submenuWidth && outerWrapper) {
      if(this.submenuWidth > outerWrapper.offsetWidth) {
        this.useIconPlaceholder = false;
        this.cdr.detectChanges();
      }
    } else {
      console.error('Outer wrapper was not found.');
    }
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
