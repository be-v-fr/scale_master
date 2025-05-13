import { Component } from '@angular/core';
import { HeadlineBackComponent } from '../../shared/headline-back/headline-back.component';
import { InfoMsgComponent } from '../../shared/info-msg/info-msg.component';
import { LEGAL } from '../../../../secrets';
import { Address } from '../../../interfaces/address';
import { EmailLinkComponent } from '../../shared/email-link/email-link.component';

/**
 * Displays the imprint (in German, but with an English notification).
 */
@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [HeadlineBackComponent, InfoMsgComponent, EmailLinkComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  get address(): Address {
    return LEGAL.address;
  }
}
