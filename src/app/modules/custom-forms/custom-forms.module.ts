import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageValidatorComponent } from './message-validator/message-validator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageValidatorComponent],
  exports: [MessageValidatorComponent]
})
export class CustomFormsModule { }



