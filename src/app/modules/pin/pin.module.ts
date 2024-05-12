import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinCreateComponent } from './pin-create/pin-create.component';
import { PinRoutingModule } from './pin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../shared/shared.module';
import { FileUploadModule } from "ng2-file-upload";
import { PinListComponent } from './pin-list/pin-list.component'; 


@NgModule({
  declarations: [
    PinCreateComponent,
    PinListComponent
  ],
  imports: [
    CommonModule,
    PinRoutingModule,
    ReactiveFormsModule,
    NgxSelectModule,
    SharedModule,
    FileUploadModule

  ]
})
export class PinModule { }
