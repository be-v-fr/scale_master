import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { ScaleMode } from '../../../interfaces/scale-mode';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-name-mode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-name-mode.component.html',
  styleUrl: './dialog-name-mode.component.scss'
})
export class DialogNameModeComponent implements OnInit, OnDestroy {
  modeName?: string;
  routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private currScale: CurrentScaleService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const interval: number = parseInt(params['interval']);
      if (interval >= 0) {
        this.initModeName(interval);
      } else {
        console.error('Modes naming dialog initialization failed because the mode interval was missing or invalid.');
      }
    });
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  initModeName(interval: number): void {
    const modeOriginal: ScaleMode | undefined = this.currScale.scale.getMode(interval);
    if (modeOriginal) {
      const modeClone: ScaleMode = cloneDeep(modeOriginal);
      this.modeName = modeClone.name;
    } else {
      console.error('Modes naming dialog initialization failed because the mode could not be found in the scale category.');
    }
  }
}
