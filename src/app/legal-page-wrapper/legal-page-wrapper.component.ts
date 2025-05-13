import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Displays a wrapper for legal pages which are embedded via router outlet.
 */
@Component({
  selector: 'app-legal-page-wrapper',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './legal-page-wrapper.component.html',
  styleUrl: './legal-page-wrapper.component.scss'
})
export class LegalPageWrapperComponent {

}
