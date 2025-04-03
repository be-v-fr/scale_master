import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]',
  standalone: true
})
export class CopyToClipboardDirective {
  @Input('appCopyToClipboard') fileUrl?: string;
  @Output() copied: EventEmitter<void> = new EventEmitter();

  @HostListener('click')
  async copyFileContent() {
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