import { Injectable } from '@angular/core';
import { SCALES } from '../const/scales';
import { ScaleCategory } from '../interfaces/scale-category';

@Injectable({
  providedIn: 'root'
})
export class ScalesDataService {
  private _categories?: ScaleCategory[];
  get categoryNames(): string[] {
    const categoryNames: string[] = [];
    this._categories?.forEach(c => categoryNames.push(c.name));
    return categoryNames;

  }

  constructor() {
    this._loadCategories();
  }

  private _loadCategories(): void {
    this._categories = [];
    SCALES.forEach(s => this._categories?.push(s));
  }
}
