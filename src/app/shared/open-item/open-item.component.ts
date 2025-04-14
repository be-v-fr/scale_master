import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-open-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './open-item.component.html',
  styleUrl: './open-item.component.scss'
})
export class OpenItemComponent {
  editing: boolean = false;
  @Input({ required: true }) name!: string;
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() open: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;


  constructor(
    private cdr: ChangeDetectorRef
  ) { }


  onItemClick() {
    if(!this.editing) {
      this.open.emit();
    }
  }


  edit() {
    this.editing = true;
    this.cdr.detectChanges();
    this.nameInput.nativeElement.focus();
  }


  @HostListener('document:mousedown', ['$event'])
  stopEditing() {
    if (this.editing) {
      this.editing = false;
      this.nameChange.emit(this.name);
    }
  }
}
