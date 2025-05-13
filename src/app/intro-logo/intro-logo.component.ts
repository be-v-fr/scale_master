import { Component } from '@angular/core';
import { LogoComponent } from '../shared/logo/logo.component';

/**
 * Displays an intro overlay containing the animated app logo.
 */
@Component({
  selector: 'app-intro-logo',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './intro-logo.component.html',
  styleUrl: './intro-logo.component.scss'
})
export class IntroLogoComponent {

}
