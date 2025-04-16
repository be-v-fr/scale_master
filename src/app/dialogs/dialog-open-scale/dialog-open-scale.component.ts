import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../services/storage.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { OpenItemComponent } from '../../shared/open-item/open-item.component';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { DialogService } from '../../../services/dialog.service';
import { Scale } from '../../../models/scale';

@Component({
  selector: 'app-dialog-open-scale',
  standalone: true,
  imports: [CommonModule, LoaderComponent, OpenItemComponent],
  templateUrl: './dialog-open-scale.component.html',
  styleUrl: './dialog-open-scale.component.scss'
})
export class DialogOpenScaleComponent implements OnInit {


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


  delete(scale: ScaleCategory): void {
    this.storage.deleteScale(scale);
  }

  
  updateName(arrIndex: number, name: string) {
    if(this.storage.scales) {
      this.storage.scales[arrIndex].name = name;
      this.storage.saveScales();
    }
  }
}
