import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective {
  hovering: boolean = false;
  @Output() hoverKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  @HostListener('mouseenter', ['$event'])
  onMouseEnter() {
    this.hovering = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    this.hovering = false;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(this.hovering) {
      this.hoverKeyDown.emit(event);
    }
  }
}
