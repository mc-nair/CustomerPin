import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    CustomerCreateComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
    SharedModule,
    
  ]
})
export class CustomersModule { }
