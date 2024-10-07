import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { TaskService } from '../../services/task/task.service';
import {
  createTask, createTaskSuccess, deleteTask, loadTasksSuccess, selectTask, updateTask
} from './task.actions';

@Injectable()
export class TaskEffects {
  
  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  loadTasks$ = createEffect(() =>
    this.taskService.getTasks().pipe(
      map((tasks) => loadTasksSuccess({ tasks }))
    )
  );

  loadNewTask$ = createEffect(() =>
    this.taskService.newTask().pipe(
      concatMap(task => {
        return of(
          createTaskSuccess({ task }),
          selectTask({ taskId: task?.id })
        );
      })
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTask),
      tap((action) => {
        this.taskService.createTask(action.task);
      })
    ),
    {
      dispatch: false
    }
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      tap((action) => {
        this.taskService.updateTask(action.task);
      })
    ),
    {
      dispatch: false
    }
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      tap((action) => {
        this.taskService.deleteTask(action.task);
      })
    ),
    {
      dispatch: false
    }
  );

}
