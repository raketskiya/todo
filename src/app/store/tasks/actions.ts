import { createAction, props } from '@ngrx/store';
import { Task } from '../../shared/interfaces/task';

export const addActiveTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const addActiveTaskSuccess = createAction(
  '[Tasks] Add Task Success',
  props<{ task: Task }>()
);

export const getAllTasks = createAction('[Tasks] Get all tasks');

export const getAllTasksSuccess = createAction(
  '[Tasks] Get all tasks success',
  props<{ tasks: Task[] }>()
);

export const updateTasks = createAction(
  '[Tasks] Update tasks',
  props<{ tasks: Object }>()
);

export const editTask = createAction(
  '[Tasks] Edit tasks',
  props<{ task: Task }>()
);
