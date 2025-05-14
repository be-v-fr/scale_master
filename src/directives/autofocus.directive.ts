import { Directive, ElementRef } from '@angular/core';

/**
 * Autofocuses element.
 */
@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective {


  /**
   * Constructor for dependency injection.
   */
  constructor(private el: ElementRef) {}


  /**
   * Focuses element after a short delay.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 40);
  }
}
