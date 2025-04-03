import { Component, Input, OnInit } from '@angular/core';
import { ToastMessageService } from '../../../services/toast-message.service';

/**
 * Displays a toast message.
 * 
 * Together with the logic from ToastMessageService, the component is structured in such a way
 * that only a single instance is required in the app. For the toast message to reload and for
 * the toast message overlay to disappear, the component instance requires a condition to check
 * if a message is defined.
 * 
 * Example of usage (where "toastMsg" is the ToastMessageService injection):
 * 
 * <app-toast-message *ngIf="toastMsg.message" [message]="toastMsg.message" />
 */
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


  /**
   * Constructor for injection of services.
   */
  constructor(
    private toastMsg: ToastMessageService
  ) { }


  /**
   * Initializes timeout to automatically close the message. Saves timeout ID to check if the
   * timeout still belongs to this respective toast when the timeout is over.
   */
  ngOnInit(): void {
    const timeoutId = setTimeout(() => {
      if(this.timeoutId && timeoutId === this.timeoutId) {
        this.close();
      }
    }, 2200);
    this.timeoutId = timeoutId;
  }


  /**
   * Closes the toast message by setting the message value to undefined.
   * Cleans up the component.
   */
  close(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = undefined;
    this.toastMsg.message = undefined;    
  }
}