import { Injectable } from '@angular/core';
import { SCALES } from '../const/scales';
import { ScaleCategory } from '../interfaces/scale-category';

@Injectable({
  providedIn: 'root'
})
export class ScalesDataService {
  get categoryNames(): string[] {
    const categoryNames: string[] = [];
    SCALES.forEach(s => categoryNames.push(s.name));
    return categoryNames;

  }
}
