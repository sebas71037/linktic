import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { TaskCreateComponent } from './task-create/task-create.component';

const routes: Routes = [
  {
    path :  '',
    component : TaskComponent,
    children: [
      {
        path :  'edit',
        component : TaskCreateComponent
      },
      {
        path :  'edit/:taskId',
        component : TaskCreateComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
