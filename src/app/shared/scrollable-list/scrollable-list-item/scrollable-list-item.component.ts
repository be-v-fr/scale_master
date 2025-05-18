import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DisplayService } from '../../../../services/display.service';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Displays an item in a scrollable list with responsive scaling or ellipsis if overflow occurs.
 */
@Component({
  selector: 'app-scrollable-list-item',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
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
    this.applyMapScaling();
  };

  @Input() default?: string | number;
  @ViewChild('contentElement') contentRef!: ElementRef<HTMLSpanElement>;
  scaleDown?: number;
  get scaleDownLimit(): number {
    return 0.75;
  }
  textEllipsis: boolean = false;

  private _initScalingFlag: boolean = true;
  @Input() set initScalingFlag(value: boolean) {
    this._initScalingFlag = value;
    this.initScaling();
  }
  @Output() scalingInitComplete: EventEmitter<{ content: string | number, scaleDown?: number, textEllipsis: boolean }> = new EventEmitter();
  @Input() itemScalingMap?: Map<string | number, { scaleDown: number | undefined, textEllipsis: boolean }>;

  /**
   * Constructor for dependency injection.
   */
  constructor(
    public display: DisplayService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }


  get tooltipContent(): string {
    return this.textEllipsis ? this.content.toString() : '';
  }


  /**
   * Initial measurement after view is initialized.
   */
  ngAfterViewInit(): void {
    this.initScaling();
  }


  /**
   * Initializes scaling details that cannot be handled using SCSS alone.
   * The initial calculation, controlled by "_initScalingFlag" is only done a single time in this component's lifecycle.
   * The calculation result is emitted to the parent component to be stored in a map containing scaling information for all list items.
   * To handle changing content after custom scrolling events, that "itemScalingMap" is fed back into this component.
   * In case the list content of the parent component changes, this component is destroyed in the parent,
   * meaning that the complete initial calculation will be done again when the list content changes. 
   */
  initScaling(): void {
    if (this._initScalingFlag) {
      this.calcScaling();
      this.scalingInitComplete.emit({ content: this.content, scaleDown: this.scaleDown, textEllipsis: this.textEllipsis });
      this._initScalingFlag = false;
    } else if(this.itemScalingMap) {
      this.applyMapScaling();
    }
  }


  /**
   * Applies parent list scaling map to this component's scaling properties.
   */
  applyMapScaling(): void {
    if(this.itemScalingMap) {
      const scaling: { scaleDown: number | undefined, textEllipsis: boolean } | undefined = this.itemScalingMap.get(this._content);
      if (scaling) {
        this.scaleDown = scaling.scaleDown;
        this.textEllipsis = scaling.textEllipsis;
      }
    }
    this.cdr.detectChanges();
  }


  /**
   * Updates text size or triggers ellipsis if overflow is detected.
   */
  calcScaling(): void {
    if (this.contentRef && this.contentRef.nativeElement) {
      const visibleWidth: number = this.el.nativeElement.offsetWidth / 2;
      const contentWidth: number = this.contentRef.nativeElement.offsetWidth;
      const widthRatio: number = contentWidth / visibleWidth;
      if (widthRatio > 1) this.setScaleDown(widthRatio);
      // widthRatio > 1 ? this.setScaleDown(widthRatio) : this.resetScaleDown();
      // this.cdr.detectChanges();
    }
  }


  /**
   * Adjusts the scale down or switches to ellipsis if ratio exceeds limits.
   */
  setScaleDown(widthRatio: number): void {
    if (widthRatio > 1 / this.scaleDownLimit) {
      this.textEllipsis = true;
      this.scaleDown = this.scaleDownLimit;
    } else {
      this.textEllipsis = false;
      this.scaleDown = 1 / widthRatio;
    }
  }
}