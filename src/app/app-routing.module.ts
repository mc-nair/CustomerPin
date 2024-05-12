import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pin', pathMatch: 'full'},
  { path: 'customer', loadChildren: () => import(`./modules/customers/customers.module`).then(m => m.CustomersModule) },
  { path: 'pin', loadChildren: () => import(`./modules/pin/pin.module`).then(m => m.PinModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
