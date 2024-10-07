import { createReducer, on } from '@ngrx/store';
import { ITask } from 'src/app/interfaces/task.interface';
import { createTask, createTaskSuccess, loadTasksSuccess, selectTask, updateTask } from './task.actions';

export interface TaskState {
  /* List */
  tasks: ITask[];
  loading: boolean;

  /* Saving */
  task?: ITask;
  editingTask?: ITask;
  loader: boolean;

  /* Errors */
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  task: undefined,
  editingTask: undefined,
  loading: true,
  loader: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    tasks
  })),
  on(selectTask, (state, { taskId }) => ({
    ...state,
    editingTask: state.tasks.find(t => t.id == taskId)
  })),
  /* Create */
  on(createTask, (state, { task }) => ({
    ...state,
    loader: true,
    task
  })),
  on(createTaskSuccess, (state, { task }) => ({
    ...state,
    editingTask: state.editingTask ?? task,
    loader: false,
    error: null
  })),
  /* Update */
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t =>
      t.id === task.id
        ? { ...t, ...task }
        : t
    )
  })),
);
