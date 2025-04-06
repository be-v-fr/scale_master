import { Component } from '@angular/core';
import { CustomizeService } from '../../../services/customize.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ScaleCategory } from '../../../interfaces/scale-category';
import { SCALES } from '../../../const/scales';

@Component({
  selector: 'app-dialog-modes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-modes.component.html',
  styleUrl: './dialog-modes.component.scss'
})
export class DialogModesComponent {
  routeSub: Subscription = new Subscription();
  category?: ScaleCategory;

  constructor(
    private route: ActivatedRoute,
    public custom: CustomizeService
  ) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const catIndex: number = params['catIndex'] as number;
      if(catIndex && catIndex >= 0) {
        this.category = SCALES[catIndex];
      } else {
        console.error('Modes dialog initialization failed because scale category index was missing or invalid.');
      }
    });
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
