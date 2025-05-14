import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { dateToString } from '../../../utils/string.utils';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Displays a custom content item loaded from the storage for opening selection.
 * Through user interaction, the item can be opened, name-edited or deleted.
 */
@Component({
  selector: 'app-open-item',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTooltipModule],
  templateUrl: './open-item.component.html',
  styleUrl: './open-item.component.scss'
})
export class OpenItemComponent {
  editing: boolean = false;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) timestamp!: number;
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() open: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private cdr: ChangeDetectorRef
  ) { }


  get date(): string {
    const date: Date = new Date(this.timestamp);
    return dateToString(date);
  }


  /**
   * Emits the open event unless the item is currently being edited.
   */
  onItemClick() {
    if(!this.editing) {
      this.open.emit();
    }
  }


  /**
   * Enables editing mode and focuses the input.
   */
  edit() {
    this.editing = true;
    this.cdr.detectChanges();
    this.nameInput.nativeElement.focus();
  }


  /**
   * Ends editing mode and emits the name change.
   */
  onInputBlur() {
    if (this.editing) {
      this.nameChange.emit(this.name);
      this.editing = false;
    }
  }
}
