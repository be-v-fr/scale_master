import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DisplayService } from '../../services/display.service';
import { PaginationDotsComponent } from '../shared/pagination-dots/pagination-dots.component';
import { CircularButtonComponent } from '../shared/circular-button/circular-button.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CircularButtonComponent, PaginationDotsComponent, RouterLink],
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.scss'
})
export class MenuEditComponent {
  routeSub: Subscription = new Subscription();
  totalSteps: number = 3;
  currentStep: number = 0;

  constructor(
    public router: Router,
    public display: DisplayService,
  ) { }

  get routeEnd(): string {
    const urlSegments: Array<string> = this.router.url.split('/');
    return urlSegments[urlSegments.length - 1];
  }
}
