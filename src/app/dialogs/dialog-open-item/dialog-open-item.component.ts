import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { LoaderComponent } from "../../shared/loader/loader.component";
import { OpenItemComponent } from "../../shared/open-item/open-item.component";
import { OrderingBarComponent } from "../../shared/ordering-bar/ordering-bar.component";
import { Ordering } from "../../../interfaces/ordering";
import { ActivatedRoute } from "@angular/router";
import { StorageService } from "../../../services/storage.service";
import { DialogService } from "../../../services/dialog.service";
import { CurrentScaleService } from "../../../services/current-scale.service";
import { CurrentFretboardService } from "../../../services/current-fretboard.service";
import { StorageSave } from "../../../interfaces/storage-save";
import { Scale } from "../../../models/scale";
import { ScaleCategory } from "../../../interfaces/scale-category";
import { Tuning } from "../../../interfaces/tuning";

@Component({
  selector: 'app-dialog-open-item',
  standalone: true,
  imports: [CommonModule, LoaderComponent, OpenItemComponent, OrderingBarComponent],
  templateUrl: './dialog-open-item.component.html',
  styleUrl: './dialog-open-item.component.scss'
})
export class DialogOpenItemComponent implements OnInit {
  type: 'scale' | 'tuning' = 'scale';
  private _ordering: Ordering = { order: 'desc', orderingBy: 'createdAt' };

  get ordering(): Ordering {
    if (this.data) {
      this.storage.order(this.data, this._ordering);
    }
    return this._ordering;
  }

  set ordering(value: Ordering) {
    this._ordering = value;
  }

  constructor(
    private route: ActivatedRoute,
    public storage: StorageService,
    private dialog: DialogService,
    private currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const typeParam = params.get('type');
      this.type = (typeParam === 'tuning') ? 'tuning' : 'scale';
      this.loadData();
    });
  }

  loadData(): void {
    this.type === 'scale' ? this.storage.loadScales() : this.storage.loadTunings();
  }

  get data(): StorageSave<ScaleCategory | Tuning>[] | undefined {
    return this.type === 'scale' ? this.storage.scalesData : this.storage.tuningsData;
  }

  open(item: any): void {
    if (this.type === 'scale') {
      this.currScale.isCustom = true;
      this.currScale.scale = new Scale(this.currScale.scale.root, item, item.modes?.[0]);
    } else {
      this.currFretboard.isCustom = true;
      this.currFretboard.fretboard.tuning = item;
    }
    this.dialog.close();
  }

  deleteSave(save: StorageSave<any>): void {
    this.type === 'scale' ? this.storage.deleteScale(save) : this.storage.deleteTuning(save);
  }

  updateName(index: number, name: string): void {
    if (this.data) {
      this.data[index].data.name = name;
      this.type === 'scale' ? this.storage.saveScales() : this.storage.saveTunings();
    }
  }
}
