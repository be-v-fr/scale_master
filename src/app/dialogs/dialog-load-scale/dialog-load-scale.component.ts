import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { OpenItemComponent } from '../../shared/open-item/open-item.component';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-dialog-load-scale',
  standalone: true,
  imports: [LoaderComponent, OpenItemComponent],
  templateUrl: './dialog-load-scale.component.html',
  styleUrl: './dialog-load-scale.component.scss'
})
export class DialogLoadScaleComponent implements OnInit {


  constructor(
    public storage: StorageService,
    private currScale: CurrentScaleService,
    private dialog: DialogService
  ) { }


  ngOnInit(): void {
    this.storage.loadScales();
  }


  open(scale: ScaleCategory): void {
    this.currScale.scale.category = scale;
    this.currScale.isCustom = true;
    this.dialog.close();
  }


  delete(scale: ScaleCategory): void {
    this.storage.deleteScale(scale);
  }
}
