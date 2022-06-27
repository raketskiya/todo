import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app-state';
import { tasksReducer } from './tasks/reducer';
import { authReducer } from './auth/reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
  tasks: tasksReducer,
  auth: authReducer,
};
