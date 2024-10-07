import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DirectiveModule } from 'src/app/directive/directive.module';
import { EFeatureKey } from 'src/app/enum/feature-key.enum';
import { CustomFormsModule } from 'src/app/modules/custom-forms/custom-forms.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PersonEffects } from 'src/app/store/person/person.effect';
import { personReducer } from 'src/app/store/person/person.reducer';
import { TaskEffects } from 'src/app/store/task/task.effect';
import { taskReducer } from 'src/app/store/task/task.reducer';
import { CardTaskComponent } from './card-task/card-task.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    /* Redux */
    StoreModule.forFeature(EFeatureKey.PERSON, personReducer),
    StoreModule.forFeature(EFeatureKey.TASK, taskReducer),
    EffectsModule.forFeature([TaskEffects, PersonEffects]),
    /* Modules */
    CustomFormsModule,
    SharedModule,
    DirectiveModule,
    NgbDatepickerModule,
    NgbOffcanvasModule,
    NgbDropdownModule,
    /* Standalone component */
    CardTaskComponent
  ]
})
export class TaskModule { }
