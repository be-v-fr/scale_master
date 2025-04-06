import { Routes } from '@angular/router';
import { AppContentComponent } from './app-content/app-content.component';
import { DialogExportComponent } from './dialogs/dialog-export/dialog-export.component';
import { MenuEditScaleComponent } from './menu-edit/menu-edit-scale/menu-edit-scale.component';
import { MenuEditFretboardComponent } from './menu-edit/menu-edit-fretboard/menu-edit-fretboard.component';
import { DialogModesComponent } from './dialogs/dialog-modes/dialog-modes.component';
import { DialogOverlayComponent } from './dialog-overlay/dialog-overlay.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        component: AppContentComponent,
        children: [
            {
                path: '',
                component: MenuComponent,
            },

            {
                path: 'edit/:step',
                component: MenuEditComponent,
                children: [
                    {
                        path: 'scale',
                        component: MenuEditScaleComponent,
                    },

                    {
                        path: 'fretboard',
                        component: MenuEditFretboardComponent,
                    }
                ],
            }
        ]
    },

    {
        path: 'd',
        outlet: 'dialog',
        component: DialogOverlayComponent,
        children: [
            {
                path: 'export/:fileType',
                component: DialogExportComponent,
            },
            {
                path: 'modes/:catIndex/:modeIndex',
                component: DialogModesComponent,
            }
        ],
    },
];