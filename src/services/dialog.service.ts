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


  async forceOpen(relRouteSegments: string[]): Promise<boolean> {
    await this.close();
    return this.router.navigate([{ outlets: { 'dialog': ['d', ...relRouteSegments] } }])
  }


  checkIndexLeqZeroOnInit(index: number | undefined, name: string): boolean {
    if(typeof(index) === 'number' && index >= 0) return true;
    console.error(`Dialog initialization failed because ${name} index was missing or invalid.`);
    return false;
  }
}
