import { Component, Input, OnInit } from '@angular/core';
import { ToastMessageService } from '../../../services/toast-message.service';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent implements OnInit {
  @Input({ alias: 'message', required: true }) msg!: string;
  timeoutId?: ReturnType<typeof setTimeout>;

  constructor(
    private toastMsg: ToastMessageService
  ) { }


  ngOnInit(): void {
    const timeoutId = setTimeout(() => {
      if(this.timeoutId && timeoutId === this.timeoutId) {
        this.close();
      }
    }, 2200);
    this.timeoutId = timeoutId;
  }


  close(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = undefined;
    this.toastMsg.message = undefined;    
  }
}