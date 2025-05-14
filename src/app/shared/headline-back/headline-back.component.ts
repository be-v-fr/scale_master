import { Component, Input } from '@angular/core';
import { HeadlineBackBtnComponent } from '../headline-back-btn/headline-back-btn.component';

/**
 * Displays a page headline with a back button to navigate to an empty route (main/default route).
 */
@Component({
  selector: 'app-headline-back',
  standalone: true,
  imports: [HeadlineBackBtnComponent],
  templateUrl: './headline-back.component.html',
  styleUrl: './headline-back.component.scss'
})
export class HeadlineBackComponent {
  @Input({ required: true }) title!: string;
}
