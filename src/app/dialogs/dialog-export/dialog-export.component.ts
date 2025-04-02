import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExportToDirective } from '../../../directives/export-to.directive';
import { FretboardComponent } from '../../fretboard/fretboard.component';

@Component({
  selector: 'app-dialog-export',
  standalone: true,
  imports: [CommonModule, ExportToDirective, FretboardComponent],
  templateUrl: './dialog-export.component.html',
  styleUrl: './dialog-export.component.scss'
})
export class DialogExportComponent implements OnInit, OnDestroy {
  fileType?: 'img' | 'txt';
  routeSub: Subscription = new Subscription();
  downloadUrl?: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const fileType = params['fileType'];
      if(fileType) {
        this.fileType = fileType;
      } else {
        console.error('Export dialog initialization failed because no file type was specified in the router params.');
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  get fileTypeToString(): string | undefined {
    switch(this.fileType) {
      case 'img': return 'image';
      case 'txt': return 'text';
    }
    return undefined;
  }
}
