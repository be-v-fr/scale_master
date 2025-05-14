import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Displays a back button to navigate to an empty route (main/default route).
 * To be used in a page headline.
 */
@Component({
  selector: 'app-headline-back-btn',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './headline-back-btn.component.html',
  styleUrl: './headline-back-btn.component.scss'
})
export class HeadlineBackBtnComponent {

}
