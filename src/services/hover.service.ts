import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service for handling global hovering information.
 * 
 * Required to handle hovering beyond encapsulated views, e.g. across router outlets.
 */
@Injectable({
  providedIn: 'root'
})
export class HoverService {
  private _menuWrapperHovered = new BehaviorSubject<boolean>(false);
  menuWrapperHovered$ = this._menuWrapperHovered.asObservable();


  /**
   * Sets hovering behavior subject to a new state.
   */
  setMenuWrapperHovered(state: boolean) {
    this._menuWrapperHovered.next(state);
  }
}
