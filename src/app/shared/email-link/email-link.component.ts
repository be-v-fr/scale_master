import { Component, Input } from '@angular/core';

/**
 * Displays an email link that shows an email address consisting of name and provider
 * and uses the native 'mailto' attribute to send an email towards that address.
 */
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
