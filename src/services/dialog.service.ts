import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Service for handling dialogs, implementing the route structure
 * and the generic dialog overlay component.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private router: Router
  ) { }


  /**
   * Closes current dialog by resetting the dialog router outlet.
   */
  close(): Promise<boolean> {
    return this.router.navigate([{ outlets: { dialog: null } }]);
  }


  /**
   * Forces opening a dialog by closing the current one first, if there is any.
   */
  async forceOpen(relRouteSegments: string[]): Promise<boolean> {
    await this.close();
    return this.router.navigate([{ outlets: { 'dialog': ['d', ...relRouteSegments] } }])
  }


  /**
   * Checks if an index number related to a name string is a number greater or equal to zero.
   * (Used for reading route parameters on dialog initialization.)
   */
  checkIndexGeqZeroOnInit(index: number | undefined, name: string): boolean {
    if(typeof(index) === 'number' && index >= 0) return true;
    console.error(`Dialog initialization failed because ${name} index was missing or invalid.`);
    return false;
  }
}
