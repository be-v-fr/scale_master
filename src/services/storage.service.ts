import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { ScaleCategory } from '../interfaces/scale-category';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  scales?: ScaleCategory[];
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
        this.scales = JSON.parse(value);
      } catch(err) {
        console.error('Could not parse storage value in ScaleCategory[] format:', value);
      }
    }
  }


  async saveScales(): Promise<void> {
    const scalesString: string = JSON.stringify(this.scales);
    await this.set(this._keys.scales, scalesString);    
  }


  async saveScale(scale: ScaleCategory): Promise<void> {
    await this.loadScales();
    if(!this.scales) {
      this.scales = [];
    }
    this.scales.push(scale);
    await this.saveScales();
  }


  async deleteScale(scale: ScaleCategory): Promise<void> {
    this.scales = this.scales?.filter(s => s !== scale);
    await this.saveScales();
  }
}
