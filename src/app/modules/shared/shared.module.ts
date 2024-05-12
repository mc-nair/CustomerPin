import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationErrorsComponent } from './form-validation-errors/form-validation-errors.component';
import { ControltouchedPipe } from './pipe/controltouched.pipe';


@NgModule({
  declarations: [
    FormValidationErrorsComponent,
    ControltouchedPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [ 
    FormValidationErrorsComponent
  ]
})
export class SharedModule { }
