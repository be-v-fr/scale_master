import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { capitalizeFirstLetter } from '../../../utils/string.utils';

/**
 * Displays a submenu from the menu bar as a dialog.
 */
@Component({
  selector: 'app-dialog-submenu',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dialog-submenu.component.html',
  styleUrl: './dialog-submenu.component.scss'
})
export class DialogSubmenuComponent {


  /**
   * Constructor for dependency injection.
   */
  constructor(
    private router: Router
  ) { }


  get title(): string {
    const urlSegments: string[] = this.router.url.split('/');
    const dialogIndex: number = urlSegments.findIndex(s => s.includes('dialog:d'));
    if(dialogIndex >= 0) {
      const titleIndex: number = dialogIndex + 2;
      const title: string = urlSegments[titleIndex].split(')')[0].split('(')[0].split(';')[0]
      return capitalizeFirstLetter(title);
    }
    return '';
  }
}
