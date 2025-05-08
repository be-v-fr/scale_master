import { Component } from '@angular/core';
import { DisplayService } from '../../../services/display.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-expand-btn',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './expand-btn.component.html',
  styleUrl: './expand-btn.component.scss'
})
export class ExpandBtnComponent {
  tooltipLabel: 'Expand' | 'Collapse' = 'Expand';


  constructor(
    public display: DisplayService
  ) { }


  toggle() {
    this.display.menuCollapsed = !this.display.menuCollapsed;
    setTimeout(() => {
      this.tooltipLabel = this.display.menuCollapsed ? 'Expand' : 'Collapse';
    }, 200);
  }
}
