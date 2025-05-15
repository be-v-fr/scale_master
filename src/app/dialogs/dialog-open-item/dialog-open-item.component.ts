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
import { ExtendedTuning } from "../../../interfaces/extended-tuning";
import { Fretboard } from "../../../models/fretboard";

/**
 * Displays a dialog for opening items of different types (scale cateogry or tuning) from the storage.
 */
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


  /**
   * Constructor for dependency injection. 
   */
  constructor(
    private route: ActivatedRoute,
    public storage: StorageService,
    private dialog: DialogService,
    private currScale: CurrentScaleService,
    private currFretboard: CurrentFretboardService
  ) { }


  /**
   * Lifecycle hook that initializes the component.
   * Determines the type of data to load (scale or tuning) from route params.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const typeParam = params.get('type');
      this.type = (typeParam === 'tuning') ? 'tuning' : 'scale';
      this.loadData();
    });
  }


  /**
   * Loads either scale or tuning data based on the current type.
   */
  loadData(): void {
    this.type === 'scale' ? this.storage.loadScales() : this.storage.loadTunings();
  }


  get data(): StorageSave<ScaleCategory | ExtendedTuning>[] | undefined {
    return this.type === 'scale' ? this.storage.scalesData : this.storage.tuningsData;
  }


  /**
   * Handles opening of a selected item (scale or tuning) and closes the dialog.
   */
  open(item: ScaleCategory | ExtendedTuning): void {
    this.type === 'scale' ? this.openScale(item as ScaleCategory) : this.openTuning(item as ExtendedTuning);
    this.dialog.close();
  }


  /**
   * Opens a saved scale by setting it as the current custom scale.
   */
  openScale(scale: ScaleCategory): void {
    this.currScale.isCustom = true;
    this.currScale.scale = new Scale(this.currScale.scale.root, scale, scale.modes?.[0]);
  }


  /**
   * Opens a saved tuning by setting it as the current custom tuning for the fretboard.
   */
  openTuning(tuning: ExtendedTuning): void {
    this.currFretboard.isCustom = true;
    this.currFretboard.fretboard = new Fretboard(this.currFretboard.fretboard.instrument, tuning, this.currFretboard.fretboard.rootPitchIndex, tuning.intervals.length);
    this.currFretboard.fretboard.instrument.maxExtraStrings = tuning.maxExtraStrings;
  }


  /**
   * Deletes the given saved item (scale or tuning) from storage.
   */
  deleteSave(save: StorageSave<any>): void {
    this.type === 'scale' ? this.storage.deleteScale(save) : this.storage.deleteTuning(save);
  }


  /**
   * Updates the name of a saved item and persists the change in storage.
   */
  updateName(index: number, name: string): void {
    if (this.data) {
      this.data[index].data.name = name;
      this.type === 'scale' ? this.storage.saveScales() : this.storage.saveTunings();
    }
  }
}
