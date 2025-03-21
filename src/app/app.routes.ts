import { Routes } from '@angular/router';
import { AppContentComponent } from './app-content/app-content.component';
import { DialogOpenComponent } from './dialogs/dialog-open/dialog-open.component';
import { DialogSaveComponent } from './dialogs/dialog-save/dialog-save.component';
import { DialogExportComponent } from './dialogs/dialog-export/dialog-export.component';

export const routes: Routes = [
    {
        path: '', component: AppContentComponent,
        children: [
            {
                path: 'dialog',
                children: [
                    { path: 'open', component: DialogOpenComponent },
                    { path: 'save', component: DialogSaveComponent },
                    { path: 'export', component: DialogExportComponent },
                ],
            }
        ]
    }
];