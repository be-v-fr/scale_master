import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../services/storage.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { OpenItemComponent } from '../../shared/open-item/open-item.component';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { DialogService } from '../../../services/dialog.service';
import { Scale } from '../../../models/scale';
import { OrderingBarComponent } from '../../shared/ordering-bar/ordering-bar.component';
import { Ordering } from '../../../interfaces/ordering';
import { StorageSave } from '../../../interfaces/storage-save';

@Component({
  selector: 'app-dialog-open-scale',
  standalone: true,
  imports: [CommonModule, LoaderComponent, OpenItemComponent, OrderingBarComponent],
  templateUrl: './dialog-open-scale.component.html',
  styleUrl: './dialog-open-scale.component.scss'
})
export class DialogOpenScaleComponent implements OnInit {
  private _ordering: Ordering = { order: 'desc', orderingBy: 'createdAt' };
  get ordering(): Ordering {
    this.storage.orderScales(this._ordering);
    return this._ordering;
  }
  set ordering(value: Ordering) {
    this._ordering = value;
  }


  constructor(
    public storage: StorageService,
    private currScale: CurrentScaleService,
    private dialog: DialogService
  ) { }


  ngOnInit(): void {
    this.storage.loadScales();
  }


  open(scale: ScaleCategory): void {
    this.currScale.isCustom = true;
    this.currScale.scale = new Scale(this.currScale.scale.root, scale, scale.modes ? scale.modes[0] : undefined);
    this.dialog.close();
  }


  deleteSave(save: StorageSave): void {
    this.storage.deleteScale(save);
  }

  
  updateName(arrIndex: number, name: string) {
    if(this.storage.scalesData) {
      this.storage.scalesData[arrIndex].data.name = name;
      this.storage.saveScales();
    }
  }
}
