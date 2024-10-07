import { createAction, props } from '@ngrx/store';
import { ITask } from 'src/app/interfaces/task.interface';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: ITask[] }>()
);

export const selectTask = createAction(
  '[Task] Select Task',
  props<{ taskId: number | undefined }>()
);

/* Create */
export const createTask = createAction(
  '[Task] Create Task',
  props<{ task: ITask }>()
);

 export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: ITask }>()
);

/* Update */
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: ITask }>()
);

/* Delete */
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ task: ITask }>()
);
