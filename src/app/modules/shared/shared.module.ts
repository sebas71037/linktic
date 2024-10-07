import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPersonComponent } from './select-person/select-person.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    SelectPersonComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
  ],
  exports: [
    SelectPersonComponent
  ]
})
export class SharedModule { }
