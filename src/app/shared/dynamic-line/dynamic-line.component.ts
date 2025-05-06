import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-line.component.html',
  styleUrl: './dynamic-line.component.scss'
})
export class DynamicLineComponent implements AfterViewInit {
  private _offset = 6;
  initComplete: boolean = false;

  private _leftEl!: HTMLElement;
  private _rightEl!: HTMLElement;

  @Input({ required: true }) set leftEl(el: HTMLElement) {
    this._leftEl = el;
    this.updateCoordinates();
  }

  @Input({ required: true }) set rightEl(el: HTMLElement) {
    this._rightEl = el;
    this.updateCoordinates();
  }

  lineLeft!: { x: number; y: number };
  lineRight!: { x: number; y: number };


  constructor(private cdr: ChangeDetectorRef) {}


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateCoordinates();
      this.initComplete = true;
    }, 40);
    window.addEventListener('resize', () => {
      this.updateCoordinates();
      this.cdr.detectChanges();
    });
  }

  
  private updateCoordinates(): void {
    if (!this._leftEl || !this._rightEl) return;
    const rectLeft = this._leftEl.getBoundingClientRect();
    const rectRight = this._rightEl.getBoundingClientRect();
    const centerLeft = this.getCenter(rectLeft);
    const centerRight = this.getCenter(rectRight);
    const dx = centerLeft.x - centerRight.x;
    const dy = centerLeft.y - centerRight.y;
    const gradient = this.calcGradient(dx, dy);
    const x1 = rectLeft.right + this._offset;
    const y1 = this.calcYCoord(x1, gradient, centerLeft);
    const x2 = rectRight.left - this._offset;
    const y2 = this.calcYCoord(x2, gradient, centerRight);
    this.lineLeft = { x: x1, y: y1 };
    this.lineRight = { x: x2, y: y2 };
    this.cdr.detectChanges();
  }


  private getCenter(rect: DOMRect): { x: number; y: number } {
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }


  private calcGradient(dx: number, dy: number): number {
    return dx === 0 ? 0 : dy / dx;
  }


  private calcYCoord(x: number, gradient: number, center: { x: number; y: number }) {
    return center.y + gradient * (x - center.x);
  }
}