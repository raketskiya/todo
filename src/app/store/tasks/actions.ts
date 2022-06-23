import { createAction, props } from '@ngrx/store';
import { Task } from '../../shared/interfaces/task';

export const addtask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);
