import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DisplayService } from '../../../../services/display.service';

/**
 * Displays an item contained in a scrollable list.
 */
@Component({
  selector: 'app-scrollable-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrollable-list-item.component.html',
  styleUrl: './scrollable-list-item.component.scss'
})
export class ScrollableListItemComponent implements AfterViewInit {
  private _content!: string | number;
  get content(): string | number {
    return this._content;
  }
  @Input({ required: true }) set content(value: string | number) {
    this._content = value;
    this.cdr.detectChanges();
    this.updateSize();
  };

  @Input() default?: string | number;
  @ViewChild('contentElement') contentRef!: ElementRef<HTMLSpanElement>
  scaleDown?: number;
  get scaleDownLimit(): number {
    return 0.75;
  }
  textEllipsis: boolean = false;


  constructor(
    public display: DisplayService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }


  ngAfterViewInit(): void {
    this.updateSize();
  }


  updateSize(): void {
    const visibleWidth: number = this.el.nativeElement.offsetWidth / 2;
    const contentWidth: number = this.contentRef.nativeElement.offsetWidth;
    const widthRatio: number = contentWidth / visibleWidth;
    if (widthRatio > 1) {
      if (widthRatio > 1 / this.scaleDownLimit) {
        this.textEllipsis = true;
        this.scaleDown = this.scaleDownLimit;
      } else {
        this.scaleDown = 1 / widthRatio;
      }
      this.cdr.detectChanges();
    }
  }
}