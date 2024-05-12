import { PinListComponent } from './pin-list/pin-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinCreateComponent } from './pin-create/pin-create.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: PinListComponent },
    { path: 'create', component: PinCreateComponent },
    { path: '**', redirectTo: '/error/notfound' }
];

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PinRoutingModule {}