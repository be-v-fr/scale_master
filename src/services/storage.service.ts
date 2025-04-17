import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { ScaleCategory } from '../interfaces/scale-category';
import { StorageSave } from '../interfaces/storage-save';
import { Ordering } from '../interfaces/ordering';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  scalesData?: StorageSave[];
  private _keys = {
    scales: 'scales',
  }


  async get(key: string): Promise<string | null> {
    const { value }: GetResult = await Preferences.get({ key: key });
    return value;
  }


  async set(key: string, value: string): Promise<void> {
    return await Preferences.set({ key: key, value: value });
  }


  async loadScales(): Promise<void> {
    const value: string | null = await this.get(this._keys.scales);
    if (value) {
      try {
        this.scalesData = JSON.parse(value);
      } catch (err) {
        console.error('Could not parse storage value in ScaleCategory[] format:', value);
      }
    }
  }


  async saveScales(): Promise<void> {
    const scalesString: string = JSON.stringify(this.scalesData);
    await this.set(this._keys.scales, scalesString);
  }


  async saveScale(scale: ScaleCategory): Promise<void> {
    await this.loadScales();
    if (!this.scalesData) {
      this.scalesData = [];
    }
    this.scalesData.push({ data: scale, timestamp: Date.now() });
    await this.saveScales();
  }


  async deleteScale(scaleSave: StorageSave): Promise<void> {
    this.scalesData = this.scalesData?.filter(sd => sd !== scaleSave);
    await this.saveScales();
  }


  orderScales(ordering: Ordering): void {
    switch (ordering.orderingBy) {
      case 'name': this.scalesData?.sort((a, b) => this._compareValues(a.data.name, b.data.name, ordering.order)); break;
      case 'createdAt': this.scalesData?.sort((a, b) => this._compareValues(a.timestamp, b.timestamp, ordering.order));
    }
  }


  private _compareValues<T>(a: T, b: T, order: 'asc' | 'desc'): number {
    if (a < b) return order === 'asc' ? -1 : 1;
    if (a > b) return order === 'asc' ? 1 : -1;
    return 0;
  }
}
