import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-scrollable-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrollable-list.component.html',
  styleUrl: './scrollable-list.component.scss',
  animations: [
    trigger('shift', [
      state('outside', style({
        'opacity': '0.3',
        'font-size': '18px',
        'height': '22px'
      })),
      state('outer', style({
        'opacity': '0.5',
        'font-size': '20px',
        'height': '24px'
      })),
      state('inner', style({
        'opacity': '0.8',
        'font-size': '22px',
        'height': '26px'
      })),
      state('focus', style({
        'opacity': '1',
        'font-size': '26px',
        'height': '30px'
      })),
      state('away', style({
        'opacity': '0.3',
        'font-size': '18px',
        'height': '24px'
      })),
      transition('* => *', [animate('500ms ease-in')])
    ])
  ]
})

export class ScrollableListComponent {
  @Input() content: any[] = [0, 1, 2, 3, 4, 5, 6];
  // FALL BERÜCKSICHTIGEN, DASS LISTE KÜRZER ALS 5 ELEMENTE IST !!
  positions: string[];
  focus: number;
  translateY: '0' | number = '0';
  transition: 'none' | '500ms ease-out' = 'none';

  constructor() {
    this.positions = this.getPositions();
    this.focus = 0;
  }

  getPositions() {
    return ['outside', 'outer', 'inner', 'focus', 'inner', 'outer', 'outside'];
  }

  getTranslateY(): string {
    return `translateY(${this.translateY}px)`;
  }

  toggleTranslateY(steps?: number) {
    if (!steps) {
      this.transition = 'none';
      this.translateY = '0';
    } else {
      this.transition = '500ms ease-out';
      this.translateY = -22 * steps;
    }
  }

  printContent(position: number) {
    const length = this.content.length;
    let index = position - 3 + this.focus;
    index = (index + length) % length;
    return this.content[index];
  }

  scrollIntoFocus(position: number) {
    let steps = position - 3;
    if (steps != 0) {
      for (let i = 0; i < 7; i++) {
        if (!(i == 0 && steps > 0) && !(i == 6 && steps < 0)) {
          if ((i == 1 && steps == 2) || (i == 5 && steps == -2)) {
            this.positions[i] = 'away';
          } else {
            this.positions[i] = this.getPositions()[(i - steps + 6) % 6];
          }
        }
      }
      this.toggleTranslateY();
      setTimeout(() => this.setNewFocus(steps), 500);
    }
  }

  setNewFocus(steps: number) {
    const length = this.content.length;
    this.focus += steps;
    this.focus = (this.focus + length) % length;
    for (let i = 0; i < 7; i++) {
      this.positions[i] = this.getPositions()[i];
    }
    this.toggleTranslateY();
  }
}
