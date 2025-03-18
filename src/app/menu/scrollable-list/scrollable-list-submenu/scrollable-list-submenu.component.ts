import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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


  /**
   * After component view initialization, executes custom initialization.
   */
  ngAfterViewInit(): void {
    this.checkWidth();
  }


  /**
   * Checks the width of the inner and outer wrapper elements.
   * Sets style control properties accordingly. 
   */
  checkWidth(): void {
    const innerWrapper: HTMLDivElement = this.innerWrapper.nativeElement;
    const outerWrapper: HTMLElement | null = this.innerWrapper.nativeElement.parentElement;
    if(outerWrapper) {
      if(innerWrapper.offsetWidth > outerWrapper.offsetWidth) {
        this.useIconPlaceholder = false;
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
