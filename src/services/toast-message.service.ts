import { Injectable } from '@angular/core';

/**
 * Service for handling toast notifications.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  message?: string;
}