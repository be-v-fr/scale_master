import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { ScaleCategory } from '../interfaces/scale-category';
import { Tuning } from '../interfaces/tuning';
import { StorageSave } from '../interfaces/storage-save';
import { Ordering } from '../interfaces/ordering';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  scalesData?: StorageSave<ScaleCategory>[];
  tuningsData?: StorageSave<Tuning>[];
  private _keys = {
    scales: 'scales',
    tunings: 'tunings'
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
    } else {
      this.scalesData = [];
    }
  }


  async loadTunings(): Promise<void> {
    const value: string | null = await this.get(this._keys.tunings);
    if (value) {
      try {
        this.tuningsData = JSON.parse(value);
      } catch (err) {
        console.error('Could not parse storage value in Tuning[] format:', value);
      }
    } else {
      this.tuningsData = [];
    }
  }


  async saveScales(): Promise<void> {
    const scalesString: string = JSON.stringify(this.scalesData);
    await this.set(this._keys.scales, scalesString);
  }


  async saveTunings(): Promise<void> {
    const tuningsString: string = JSON.stringify(this.tuningsData);
    await this.set(this._keys.tunings, tuningsString);
  }


  async saveScale(scale: ScaleCategory): Promise<void> {
    await this.loadScales();
    if (!this.scalesData) {
      this.scalesData = [];
    }
    this.scalesData.push({ data: scale, timestamp: Date.now() });
    await this.saveScales();
  }


  async saveTuning(tuning: Tuning): Promise<void> {
    await this.loadTunings();
    if (!this.tuningsData) {
      this.tuningsData = [];
    }
    this.tuningsData.push({ data: tuning, timestamp: Date.now() });
    await this.saveTunings();
  }


  async deleteScale(scaleSave: StorageSave<ScaleCategory>): Promise<void> {
    this.scalesData = this.scalesData?.filter(sd => sd !== scaleSave);
    await this.saveScales();
  }


  async deleteTuning(tuningSave: StorageSave<Tuning>): Promise<void> {
    this.tuningsData = this.tuningsData?.filter(td => td !== tuningSave);
    await this.saveTunings();
  }


  order(array: StorageSave<ScaleCategory>[] | StorageSave<Tuning>[], ordering: Ordering): void {
    switch (ordering.orderingBy) {
      case 'name': array.sort((a, b) => this._compareValues(a.data.name, b.data.name, ordering.order)); break;
      case 'createdAt': array.sort((a, b) => this._compareValues(a.timestamp, b.timestamp, ordering.order));
    }
  }


  private _compareValues<T>(a: T, b: T, order: 'asc' | 'desc'): number {
    if (a < b) return order === 'asc' ? -1 : 1;
    if (a > b) return order === 'asc' ? 1 : -1;
    return 0;
  }
}