import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayService } from '../../services/display.service';
import { CurrentScaleService } from '../../services/current-scale.service';
import { cloneDeep } from 'lodash';
import { ScaleCategory } from '../../interfaces/scale-category';

@Component({
  selector: 'app-menu-edit-scale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-edit-scale.component.html',
  styleUrl: './menu-edit-scale.component.scss'
})
export class MenuEditScaleComponent implements OnInit {
  totalSteps: number = 3;
  currentStep: number = 0;

  constructor(
    public display: DisplayService,
    private currScale: CurrentScaleService
  ) { }

  ngOnInit(): void {
    const categoryClone: ScaleCategory = cloneDeep(this.currScale.scale.category);
    categoryClone.name = 'untitled';
    this.currScale.scale.category = categoryClone;
  }
}
