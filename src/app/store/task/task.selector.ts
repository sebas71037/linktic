import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';
import { EFeatureKey } from 'src/app/enum/feature-key.enum';

export const selectTaskState = createFeatureSelector<TaskState>(EFeatureKey.TASK);

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const loadingTasks = createSelector(
    selectTaskState,
    (state: TaskState) => state.loading
);

export const selectCompletedTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => task.status)
);

export const selectPendingTasks = createSelector(
  selectAllTasks,
  tasks => tasks.filter(task => !task.status)
);

export const selectedTask = createSelector(
  selectTaskState,
  (state: TaskState) => state.editingTask
);
