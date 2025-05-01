import { Component } from '@angular/core';
import { HeadlineBackComponent } from '../../shared/headline-back/headline-back.component';
import { InfoMsgComponent } from '../../shared/info-msg/info-msg.component';
import { LEGAL } from '../../../../secrets';
import { Address } from '../../../interfaces/address';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [HeadlineBackComponent, InfoMsgComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  get address(): Address {
    return LEGAL.address;
  }
}
