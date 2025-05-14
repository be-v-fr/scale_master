import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * Copies data from a file URL to the client's clipboard.
 */
@Directive({
  selector: '[appCopyToClipboard]',
  standalone: true
})
export class CopyToClipboardDirective {
  @Input('appCopyToClipboard') fileUrl?: string;
  @Output() copied: EventEmitter<void> = new EventEmitter();


  /**
   * Executes copy to clipboard.
   */
  @HostListener('click')
  async copyFileContent(): Promise<void> {
    if (!this.fileUrl) return;
    try {
      const response = await fetch(this.fileUrl);
      const blob = await response.blob();
      const data = [new ClipboardItem({ [blob.type]: blob })];
      await navigator.clipboard.write(data);
      this.copied.emit();
    } catch (error) {
      console.error("Error when trying to copy:", error);
    }
  }
}