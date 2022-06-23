import { createSelector } from '@ngrx/store';
import { AppState } from '../app-state';
import { TasksState } from './reducers';

export const selectTasks = (state: AppState) => state.tasks;
export const selectActiveTasks = createSelector(
  selectTasks,
  (state: TasksState) => state.activeTasks
);
