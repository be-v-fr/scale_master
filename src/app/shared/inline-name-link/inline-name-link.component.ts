import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Displays a name that is also a link to a dialog to edit that name.
 * (This component does not transfer the name data to the dialog component.
 * It has to be received separately.)
 */
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


  /**
   * Constructor for dependency injection.
   */
  constructor(
    public router: Router
  ) { }
}
