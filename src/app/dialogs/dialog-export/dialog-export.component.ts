import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExportToDirective } from '../../../directives/export-to.directive';
import { FretboardComponent } from '../../fretboard/fretboard.component';
import { FretboardAsTextComponent } from '../../fretboard-as-text/fretboard-as-text.component';
import { CurrentScaleService } from '../../../services/current-scale.service';
import { ExportOptionsComponent } from './export-options/export-options.component';
import { ToastMessageService } from '../../../services/toast-message.service';
import { capitalizeFirstLetter } from '../../../utils/string.utils';

@Component({
  selector: 'app-dialog-export',
  standalone: true,
  imports: [CommonModule, ExportToDirective, FretboardComponent, FretboardAsTextComponent, ExportOptionsComponent],
  templateUrl: './dialog-export.component.html',
  styleUrl: './dialog-export.component.scss'
})
export class DialogExportComponent implements OnInit, OnDestroy {
  fileType?: 'img' | 'txt';
  routeSub: Subscription = new Subscription();
  private _downloadUrl?: string;
  private _data?: any;

  constructor(
    private route: ActivatedRoute,
    private currScale: CurrentScaleService,
    private cdr: ChangeDetectorRef,
    public toastMsg: ToastMessageService
  ) { }


  get downloadUrl(): string | undefined {
    return this._downloadUrl;
  }
  set downloadUrl(value: string) {
    this._downloadUrl = value;
    this.cdr.detectChanges();
  }


  get data(): any {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
    this.cdr.detectChanges();
  }


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


  get fileName(): string {
    return this.currScale.scale.name.replaceAll(' ', '_');
  }


  get copyMsg(): string | undefined {
    const type: string | undefined = this.fileTypeToString;
    if(!type) return;
    return `${capitalizeFirstLetter(type)} copied to clipboard`;
  }
}
