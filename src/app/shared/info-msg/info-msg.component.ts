import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-msg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-msg.component.html',
  styleUrl: './info-msg.component.scss'
})
export class InfoMsgComponent {
  @Input({ required: true, alias: 'msg'}) message!: string;
  @Input() mode: 'info' | 'warning' = 'info';
}
