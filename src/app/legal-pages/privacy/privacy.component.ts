import { Component } from '@angular/core';
import { HeadlineBackComponent } from '../../shared/headline-back/headline-back.component';
import { Address } from '../../../interfaces/address';
import { LEGAL } from '../../../../secrets';
import { EmailLinkComponent } from '../../shared/email-link/email-link.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [HeadlineBackComponent, EmailLinkComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  get address(): Address {
    return LEGAL.address;
  }
}
