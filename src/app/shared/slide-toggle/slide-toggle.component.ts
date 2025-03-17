import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Displays a slide toggle button.
 */
@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss'
})
export class SlideToggleComponent {
  @Input() mode: 'check' | 'select' = 'check';
  @Input() toggleOn: boolean = false;
  @Output() toggleOnChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  /**
   * Toggles button.
   */
  toggle(): void {
    this.toggleOn = !this.toggleOn;
    this.toggleOnChange.emit(this.toggleOn);
  }
}
