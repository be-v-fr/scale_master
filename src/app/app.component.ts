import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IntroLogoComponent } from './intro-logo/intro-logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, IntroLogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ScaleMaster';
  awaitingIntro: boolean = true;


  ngOnInit(): void {
    setTimeout(() => this.awaitingIntro = false, 3000);
  }
}
