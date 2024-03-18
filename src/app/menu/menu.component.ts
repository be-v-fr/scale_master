import { Component } from '@angular/core';
import { ScrollableListComponent } from './scrollable-list/scrollable-list.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ScrollableListComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
