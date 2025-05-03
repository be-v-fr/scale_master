import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-link',
  standalone: true,
  imports: [],
  templateUrl: './email-link.component.html',
  styleUrl: './email-link.component.scss'
})
export class EmailLinkComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) provider!: string;
}
