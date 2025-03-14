import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scrollable-list-submenu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scrollable-list-submenu.component.html',
  styleUrl: './scrollable-list-submenu.component.scss'
})
export class ScrollableListSubmenuComponent {
  @Input() title?: string;
  @Input() allowSearch: boolean = true;
  @Input() searchFilter?: string;
  @Output() searchFilterChange: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();
  @Output() refocus: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  emitSearch(): void {
    this.searchFilterChange.emit(this.searchFilter);
  }

  initSearch(): void {
    this.searchFilter = '';
    setTimeout(() => this.focusSearch(), 80);
  }

  clearSearch(): void {
    this.searchFilter = undefined;
    this.emitSearch();
  }

  focusSearch(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
}
