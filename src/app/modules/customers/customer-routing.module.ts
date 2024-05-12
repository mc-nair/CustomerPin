import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';


const routes: Routes = [
    { path: 'create', component: CustomerCreateComponent },
    { path: '**', redirectTo: '/error/notfound' }
];

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class CustomerRoutingModule {}
