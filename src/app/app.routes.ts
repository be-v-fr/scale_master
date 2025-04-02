import { Routes } from '@angular/router';
import { AppContentComponent } from './app-content/app-content.component';
import { DialogExportComponent } from './dialogs/dialog-export/dialog-export.component';

export const routes: Routes = [
    {
        path: '',
        component: AppContentComponent,
        children: [
            {
                path: 'dialog',
                children: [
                    {
                        path: 'export/:fileType',
                        component: DialogExportComponent,
                    }
                ],
            }
        ]
    }
];