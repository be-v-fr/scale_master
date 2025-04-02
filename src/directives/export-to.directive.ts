import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import domtoimage from 'dom-to-image';

@Directive({
  selector: '[appExportTo]',
  standalone: true
})
export class ExportToDirective implements AfterViewInit {
  @Input({ alias: 'exportType', required: true}) fileType!: 'img' | 'txt';
  @Output() urlReady: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit(): void {
    switch(this.fileType) {
      case 'img': this.exportToImg(); break;
      case 'txt': this.exportToTxt();
    }
  }

  exportToImg(): void {
    const exportMe: HTMLElement = this.el.nativeElement;
    console.log(exportMe);
    domtoimage.toPng(exportMe)
    .then((dataUrl: string) => this.urlReady.emit(dataUrl))
    .catch((error: Error) => console.error("Export failed:", error));
  }

  exportToTxt(): void {

  }
}