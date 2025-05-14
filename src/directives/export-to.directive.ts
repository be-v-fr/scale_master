import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import domtoimage from 'dom-to-image-more';

/**
 * Exports data to various file formats (image or text).
 * Obtains the data either through input or through the element the directive
 * is attributed to directly (called a view-based export here).
 */
@Directive({
  selector: '[appExportTo]',
  standalone: true
})
export class ExportToDirective implements AfterViewInit {
  @Input({ alias: 'appExportTo', required: true }) fileType!: 'img' | 'txt';
  private _viewBasedExportTypes: Array<'img' | 'txt'> = ['img'];
  @Input() set export(data: any) {
    if (data && !this._viewBasedExportTypes.includes(this.fileType)) {
      this.exportByInput(data);
    }
  }
  @Output() urlReady: EventEmitter<string> = new EventEmitter<string>();


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private el: ElementRef
  ) { }


  /**
   * Triggers export for view-based types after the view is initialized.
   */
  ngAfterViewInit(): void {
    switch (this.fileType) {
      case 'img': this.exportToImg();
    }
  }


  /**
   * Handles export logic for input-based types.
   */
  exportByInput(data: any): void {
    switch (this.fileType) {
      case 'txt': this.exportToTxt(data);
    }
  }


  /**
   * Converts a DOM element to a PNG image and emits the resulting data URL.
   */
  exportToImg(): void {
    const exportMe: HTMLElement = this.el.nativeElement;
    domtoimage.toPng(exportMe)
      .then((dataUrl: string) => this.urlReady.emit(dataUrl))
      .catch((error: Error) => console.error("Export failed:", error));
  }


  /**
   * Converts provided text data into a Blob and emits a downloadable data URL.
   */
  exportToTxt(data: any): void {
    const blob: Blob = new Blob([data], { type: 'text/plain' });
    const dataUrl: string = URL.createObjectURL(blob);
    this.urlReady.emit(dataUrl);
  }
}