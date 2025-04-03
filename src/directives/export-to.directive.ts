import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import domtoimage from 'dom-to-image';

@Directive({
  selector: '[appExportTo]',
  standalone: true
})
export class ExportToDirective implements AfterViewInit {
  @Input({ alias: 'exportType', required: true }) fileType!: 'img' | 'txt';
  private _selfReliantExportTypes: Array<'img' | 'txt'> = ['img'];
  @Input() set export(data: any) {
    if (data && !this._selfReliantExportTypes.includes(this.fileType)) {
      this.exportByInput(data);
    }
  }
  @Output() urlReady: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private el: ElementRef
  ) { }


  ngAfterViewInit(): void {
    switch (this.fileType) {
      case 'img': this.exportToImg();
    }
  }


  exportByInput(data: any): void {
    switch (this.fileType) {
      case 'txt': this.exportToTxt(data);
    }
  }


  exportToImg(): void {
    const exportMe: HTMLElement = this.el.nativeElement;
    domtoimage.toPng(exportMe)
      .then((dataUrl: string) => this.urlReady.emit(dataUrl))
      .catch((error: Error) => console.error("Export failed:", error));
  }


  exportToTxt(data: any): void {
    const blob: Blob = new Blob([data], { type: 'text/plain' });
    const dataUrl: string = URL.createObjectURL(blob);
    this.urlReady.emit(dataUrl);
  }
}