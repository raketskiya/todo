import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app-state';
import { tasksReducer } from './tasks/reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
  tasks: tasksReducer,
};
