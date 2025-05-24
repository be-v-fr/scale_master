import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IntroLogoComponent } from './intro-logo/intro-logo.component';
import { FooterComponent } from './footer/footer.component';

/**
 * This is the native Angular app component displaying any app content.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, IntroLogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Scalion';
  awaitingIntro: boolean = true;


  /**
   * On app initialization, sets timer for intro control.
   */
  ngOnInit(): void {
    setTimeout(() => this.awaitingIntro = false, 3000);
  }
}
