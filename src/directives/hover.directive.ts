import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Detects hover interactions on an element and emits events based on mouse and keyboard actions.
 */
@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective {
  hovering: boolean = false;
  @Output() hoverKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();


  /**
   * Sets the 'hovering' state to true when the mouse enters the element.
   */
  @HostListener('mouseenter', ['$event'])
  onMouseEnter() {
    this.hovering = true;
  }


  /**
   * Sets the 'hovering' state to false when the mouse leaves the element.
   */
  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    this.hovering = false;
  }


  /**
   * Emits the 'hoverKeyDown' event when a key is pressed while the element is being hovered.
   */
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(this.hovering) {
      this.hoverKeyDown.emit(event);
    }
  }
}
