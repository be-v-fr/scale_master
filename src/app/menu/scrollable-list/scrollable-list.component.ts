import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrollable-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrollable-list.component.html',
  styleUrl: './scrollable-list.component.scss'
})
export class ScrollableListComponent {
  @Input() content: any[] = [0,1,2,3,4,5,6];
  // FALL BERÜCKSICHTIGEN, DASS LISTE KÜRZER ALS 5 ELEMENTE IST !!
  focus: number = 0;

  printContent(position: number) {
    const length = this.content.length;
    let index = position - 3 + this.focus;
    index = (index + length) % length;
    return this.content[index];
  }

  scrollIntoFocus(position: number) {
    let steps = position - 3;
    if(steps == 2) {
      this.scrollOneStep('down');
      steps--;
    }
    if(steps == 1) {
      this.scrollOneStep('down');
    }
    if(steps == -2) {
      this.scrollOneStep('up');
      steps++;      
    }
    if(steps == -1) {
      this.scrollOneStep('up');     
    }
  }

  scrollOneStep(dir: 'down' | 'up') {
    const length = this.content.length;
    if(dir == 'down') {
      this.focus++;
    } else {
      this.focus--;
    }
    this.focus = (this.focus + length) % length;
  }
}
