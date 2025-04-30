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
import { DialogRootModeInitComponent } from './dialogs/dialog-root-mode-init/dialog-root-mode-init.component';
import { DialogNameCustomComponent } from './dialogs/dialog-name-custom/dialog-name-custom.component';
import { DialogOpenItemComponent } from './dialogs/dialog-open-item/dialog-open-item.component';
import { DialogTuningFoundComponent } from './dialogs/dialog-tuning-found/dialog-tuning-found.component';
import { ImprintComponent } from './legal-page-wrapper/imprint/imprint.component';
import { PrivacyComponent } from './legal-page-wrapper/privacy/privacy.component';
import { LegalPageWrapperComponent } from './legal-page-wrapper/legal-page-wrapper.component';

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
        path: 'legal',
        component: LegalPageWrapperComponent,
        children: [
            { path: 'imprint', component: ImprintComponent },
            { path: 'privacy', component: PrivacyComponent }
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
                path: 'name',
                component: DialogNameCustomComponent,
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
                path: 'tunings/:instrIndex/:tuningIndex',
                component: DialogTuningFoundComponent
            },
            {
                path: 'open/:type',
                component: DialogOpenItemComponent
            }
        ],
    },
];