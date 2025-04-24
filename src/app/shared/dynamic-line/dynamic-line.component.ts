import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-line',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-line.component.html',
  styleUrl: './dynamic-line.component.scss'
})
export class DynamicLineComponent implements AfterViewInit {
  private _offset: number = 6;

  private _leftEl!: HTMLElement;
  @Input({ required: true }) set leftEl(el: HTMLElement) {
    this._leftEl = el;
  }
  get lineLeft(): { x: number; y: number } {
    const rectLeft: DOMRect = this._leftEl.getBoundingClientRect();
    const center = this.getCenter(rectLeft);
    const x = rectLeft.right + this._offset;
    return {
      x: x,
      y: center.y + this.gradient * (x - center.x),
    };
  }

  private _rightEl!: HTMLElement;
  @Input({ required: true }) set rightEl(el: HTMLElement) {
    this._rightEl = el;
  }
  get lineRight(): { x: number; y: number } {
    const rectRight: DOMRect = this._rightEl.getBoundingClientRect();
    const center = this.getCenter(rectRight);
    const x = rectRight.left - this._offset;
    return {
      x: x,
      y: center.y - this.gradient * (center.x - x),
    };
  }

  get gradient(): number {
    const leftCenter = this.getCenter(this._leftEl.getBoundingClientRect());
    const rightCenter = this.getCenter(this._rightEl.getBoundingClientRect());
    const dx = leftCenter.x - rightCenter.x;
    const dy = leftCenter.y - rightCenter.y;
    if(dx === 0) return 0;
    return dy / dx;
  }


  constructor(
    private cdr: ChangeDetectorRef
  ) { }


  ngAfterViewInit() {
    window.addEventListener('resize', () => this.cdr.detectChanges());
  }


  getCenter(rect: DOMRect) {
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }
}
