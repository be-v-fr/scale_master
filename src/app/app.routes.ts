import { Routes } from '@angular/router';
import { AppContentComponent } from './app-content/app-content.component';
import { DialogExportComponent } from './dialogs/dialog-export/dialog-export.component';
import { MenuEditScaleComponent } from './menu-edit/menu-edit-scale/menu-edit-scale.component';
import { MenuEditFretboardComponent } from './menu-edit/menu-edit-fretboard/menu-edit-fretboard.component';
import { DialogScaleFoundComponent } from './dialogs/dialog-scale-found/dialog-scale-found.component';
import { DialogOverlayComponent } from './dialog-overlay/dialog-overlay.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { MenuComponent } from './menu/menu.component';
import { DialogNameModeComponent } from './dialogs/dialog-name-mode/dialog-name-mode.component';
import { DialogLoadScaleComponent } from './dialogs/dialog-load-scale/dialog-load-scale.component';
import { DialogLoadFretboardComponent } from './dialogs/dialog-load-fretboard/dialog-load-fretboard.component';
import { DialogRootModeInitComponent } from './dialogs/dialog-root-mode-init/dialog-root-mode-init.component';

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
                path: 'modes',
                children: [
                    {
                        path: 'rootInit',
                        component: DialogRootModeInitComponent,
                    },
                    {
                        path: 'name/:interval',
                        component: DialogNameModeComponent,
                    },
                    {
                        path: ':catIndex/:modeIndex',
                        component: DialogScaleFoundComponent,
                    },
                ]
            },
            {
                path: 'open',
                children: [
                    {
                        path: 'scale',
                        component: DialogLoadScaleComponent
                    },
                    {
                        path: 'fretboard',
                        component: DialogLoadFretboardComponent
                    }
                ]
            }
        ],
    },
];