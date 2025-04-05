import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayService } from '../../../services/display.service';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { cloneDeep } from 'lodash';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { CustomizeService } from '../../../services/customize.service';
import { ScalesDataService } from '../../../services/scales-data.service';

@Component({
  selector: 'app-menu-edit-scale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-edit-scale.component.html',
  styleUrl: './menu-edit-scale.component.scss'
})
export class MenuEditScaleComponent implements OnInit {

  constructor(
    public display: DisplayService,
    private currScale: CurrentScaleService,
    public custom: CustomizeService
  ) { }

  ngOnInit(): void {
    const categoryClone: ScaleCategory = cloneDeep(this.currScale.scale.category);
    categoryClone.name = 'untitled';
    this.currScale.scale.category = categoryClone;
  }

  // root-menu muss im collapsed-Modus angezeigt werden oder seitlich versetzt zu edit scale-Titel etc.
}
