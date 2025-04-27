import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizeService } from '../../../services/customize.service';
import { CurrentScaleService } from '../../../services/current-scale.service';

@Component({
  selector: 'app-inline-name-link',
  standalone: true,
  imports: [],
  templateUrl: './inline-name-link.component.html',
  styleUrl: './inline-name-link.component.scss'
})
export class InlineNameLinkComponent {
  private _name!: string;
  get name(): string {
    return this._name;
  }
  @Input({ required: true}) set name(value: string) {
    this._name = value;
  };


  constructor(
    public router: Router
  ) { }
}
