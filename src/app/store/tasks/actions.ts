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

export const getAllActiveTasks = createAction('[Tasks] Get all active tasks');

export const getAllCompletedTasks = createAction(
  '[Tasks] Get all completed tasks'
);

export const getAllActiveTasksSuccess = createAction(
  '[Tasks] Get all active tasks success',
  props<{ tasks: Task[] }>()
);

export const getAllCompletedTasksSuccess = createAction(
  '[Tasks] Get all complited tasks success',
  props<{ tasks: Task[] }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete task',
  props<{ task: Task }>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks] Delete task success',
  props<{ taskId: string; complete: boolean }>()
);

export const completeTask = createAction(
  '[Tasks] Complete task',
  props<{ task: Task }>()
);

export const completeTaskSuccess = createAction(
  '[Tasks] Complete task success',
  props<{ task: Task }>()
);

export const updateTasks = createAction(
  '[Tasks] Update tasks',
  props<{ tasks: string }>()
);

export const editTask = createAction(
  '[Tasks] Update tasks',
  props<{ task: Task }>()
);
