import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoverService {
  private _menuWrapperHovered = new BehaviorSubject<boolean>(false);
  menuWrapperHovered$ = this._menuWrapperHovered.asObservable();

  setMenuWrapperHovered(state: boolean) {
    this._menuWrapperHovered.next(state);
  }
}
