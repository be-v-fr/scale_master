import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private router: Router
  ) { }

  close(): Promise<boolean> {
    return this.router.navigate([{ outlets: { dialog: null } }]);
  }
}
