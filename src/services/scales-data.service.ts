import { Injectable } from '@angular/core';
import { SCALES } from '../const/scales';

@Injectable({
  providedIn: 'root'
})
export class ScalesDataService {
  private _categories?: string [];
  get categories(): string[] | undefined {
    return this._categories;
  }

  constructor() {
    this._loadCategories();
  }

  private _loadCategories(): void {
    this._categories = [];
    for(const category in SCALES) {
      if(SCALES.hasOwnProperty(category)) {
        this._categories.push(category); 
      }
    }
  }
}
